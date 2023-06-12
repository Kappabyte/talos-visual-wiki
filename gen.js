const csv = require('csv-parser')
const readline = require('readline');
const fs = require('fs')
const QRCode = require("qrcode");

const rawresults = [];

const characters = {}
const locations = {
    children: {},
    fullName: "",
    qrs: []
}

const qrs = {};

const versionSort = (a, b) => {
    a = a.substring(1)
    b = b.substring(1)

    let [majA, minA, revA] = a.split(".");
    let [majB, minB, revB] = b.split(".");

    let revAnum = revA.replaceAll(/\D/g,'');
    let revBnum = revB.replaceAll(/\D/g,'');

    let revAstr = revA.replaceAll(/[0-9]/g,'').charCodeAt(0);
    let revBstr = revB.replaceAll(/[0-9]/g,'').charCodeAt(0);

    if(revAstr === NaN) revAstr = 0;
    if(revBstr === NaN) revBstr = 0;

    if(parseInt(majA) > parseInt(majB)) return 1;
    if(parseInt(majA) < parseInt(majB)) return -1;
    
    if(parseInt(minA) > parseInt(minB)) return 1;
    if(parseInt(minA) < parseInt(minB)) return -1;

    if(parseInt(revAnum) > parseInt(revBnum)) return 1;
    if(parseInt(revAnum) < parseInt(revBnum)) return -1;

    

    return revAstr.charCodeAt(0) - revBstr.charCodeAt(0);
}

function run(file) {
    fs.createReadStream(`public/data/qr/${file}.csv`)
    .pipe(csv())
    .on('data', (data) => rawresults.push(data))
    .on('end', () => {
        rawresults.forEach(res => {
            if(res.Location.trim() === "") return;
            qrs[res.Number] = {...res};

            qrs[res.Number].Related = qrs[res.Number].Related.split(",");

            const nameRegex = /^(.*) (v[0-9]*\.[0-9]*\.[0-9]*[a-zA-Z]?)$/g;
            const epitaphRegex = /^Epitaph: Child Program (v[0-9]*\.[0-9]*\.[0-9]*[a-zA-Z]?) Codename \((.*)\) terminated here(?:.|\n)*Progeny Programs: (.*)/g;

            let name = res.Author;
            let version = undefined;
            let child;
             
            if(nameRegex.test(res.Author)) {
                nameRegex.lastIndex = 0;
                
                let _;

                [_, name, version] = nameRegex.exec(res.Author);
            } else if(epitaphRegex.test(res.Message)) {
                epitaphRegex.lastIndex = 0;
                
                let _;

                [_, version, name, child] = epitaphRegex.exec(res.Message);

                child = child.replace(/( v[0-9].*)|( \[.*)/g, "")
                
            } else {
                name = "unknown";
            }

            if(!Object.keys(characters).includes(name)) characters[name] = {
                name: name,
                version: {
                    lowest: "unknown",
                    known: [],
                    highest: "unknown"
                },
                qrs: [],
                children: [],
                parents: []
            }
            
            if(version && !characters[name].version.known.includes(version)) {
                characters[name].version.known.push(version)
                characters[name].version.known = characters[name].version.known.sort(versionSort);
                characters[name].version.lowest = characters[name].version.known[0]; 
                characters[name].version.highest = characters[name].version.known[characters[name].version.known.length - 1]; 
            }

            characters[name].qrs.push(res.Number);

            if(child) child.split(", ").forEach(c => {
                if(c && !characters[name].children.includes(c)) {
                    characters[name].children.push(c);
                }
            });

            let currentLocation = locations;
            res.Location.split("/").forEach(part => {
                if(!Object.keys(currentLocation.children).includes(part)) currentLocation.children[part] = {
                    children: {},
                    fullName: currentLocation.fullName + "/" + part,
                    qrs: []
                }
                currentLocation = currentLocation.children[part]
            })
            currentLocation.qrs.push(res.Number)

            try {
                fs.mkdirSync(`public/assets/qr/${file}/`);
            } catch(e) {}
            QRCode.toFile(`public/assets/qr/${file}/${res.Number}.png`, `${res.Message}\n--${res.Author}`)
        })

        Object.keys(characters).forEach(name => {
            if(characters[name].children.includes("All")) characters[name].children = Object.keys(characters).filter(child => {
                if(child == name) return;

                let ret = true;
                Object.keys(characters).forEach(char => {
                    if(characters[char].children.includes(child)) ret = false;
                })

                return ret;
            })
            characters[name].children.filter(child => Object.keys(characters).includes(child)).forEach(child => {
                characters[child].parents.push(name);
            });
        });

        const data = {
            characters: characters,
            qrcodes: qrs,
            locations: locations
        }

        fs.writeFileSync(`public/data/qr/${file}.json`, JSON.stringify(data, null, 4));
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter file to gen (talos, gehenna, demo, unscannable): ", function (file) {
    run(file);
    rl.close();

});
