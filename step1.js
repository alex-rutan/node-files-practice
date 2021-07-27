"use strict"

const fsP = require('fs/promises')

async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        console.log(contents);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

let path = process.argv[2];

cat(path);

module.exports = {
    cat
}