const cat = require("./step1");
const axios = require("axios");

async function webCat(url) {
    let content = await axios.get(url);
    console.log(content);
}

async function catOrWebCat (path)
// let path = process.argv[2];
    if (path )

    cat(path);