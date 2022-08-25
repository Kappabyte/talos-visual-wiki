const csv = require('csv-parser')
const readline = require('readline');
const fs = require('fs')
const rawresults = [];

const results = {};

const key = {}

function run(file) {
    fs.createReadStream(`public/data/qr/${file}.csv`)
    .pipe(csv())
    .on('data', (data) => rawresults.push(data))
    .on('end', () => {
        rawresults.forEach(res => {
            if(res.Location.trim() === "") return;
            const characterParts = res.Author.split(" ");
            let character = "";
            for(const part of characterParts) {
                if(part.startsWith("v")) continue;
                character += part + " ";
            }
            character = character.trim();
            if(character == "" && res.Message.startsWith("Epitaph")) {
                character = res.Message.split("Codename (")[1];
                character = character.substring(0, character.indexOf(") terminated"));
            }
            if(!results[character]) {
                results[character] = [];
            }
            
            let data = {...res};
            let index = 0;
            rawresults.forEach((related) => {
                if(res.Location === related.Location) {
                    if(!data.Related) data.Related = [];
                    data.Related.push({...related});
                }
            });
            results[character].push(data);
        })
        const charactersFile = {
            characters: {},
            roots: Object.keys(results)
        }
        fs.writeFileSync(`public/data/qr/${file}.json`, JSON.stringify(results, null, 4));
        fs.writeFileSync(`public/data/characters/${file}.json.new`, JSON.stringify(charactersFile, null, 4));
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