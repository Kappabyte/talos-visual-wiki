const { fstat, writeFileSync } = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const run = (text) => {
    if(text == "done") {
        rl.close();
        return;
    }
    let path = undefined;
    if(text == "A") {
        path = "public/data/documents/LandA"
    }
    if(text == "B") {
        path = "public/data/documents/LandB"
    }
    if(text == "C") {
        path = "public/data/documents/LandC"
    }
    if(text == "Tower") {
        path = "public/data/documents/Tower"
    }

    if(path) {
        file(path)
        run("");
        return;
    }

    rl.question("Choose Option: (A, B, C, Tower): ", function (t) {
        run(t);
    });
}

const file = (path) => {
    rl.question("Name (or nothing to go back): ", function (t) {
        if(t == "") {
            run("")
            return;
        }
        write(path, t, []);
        file(path)
        return;
    });
}

const write = (path, n, data) => {
    rl.question("Enter Type (or nothing to exit)", function (type) {
        if(type == "") {
            let str = "";
            let len = 0;
            data.forEach(element => {
                if(element.type.length > len) len = element.type.length;
            });
            data.forEach(element => {
                str += `@(document:original)[${element.type}${" ".repeat(len - element.type.length)} ${element.date}]${element.name}\n`;
            });
            
            writeFileSync(path + "/" + n + ".eml", str);
            file(path)
            return;
        }
        rl.question("Enter Date", function (date) {
            rl.question("Enter Name", function (name) {
                data.push({type: type, date: date, name: name})
                write(path, n, data);
            });
        });
    });
}

run("");