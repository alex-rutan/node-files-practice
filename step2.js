"use strict"

const fsP = require('fs/promises')
const axios = require("axios");

/* 
takes in a local path, outputs the contents to the console.
 */
async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        console.log(contents);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


/* 
takes in a URL path, outputs the contents to the console.
 */
async function webCat(url) {
    console.log("WebCat is Running!!!")
    // if(!url.startsWith("http")){
    //     url = "http://"+url
    // }
    let content;
    try {
        content = await axios.get(url);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(content.data);
}

/* 
Function to determine if the argument given is a local path or web path
then runs cat function or webCat respectively.
 */
async function catOrWebCat() {
    
    let path = process.argv[2];
    console.log(path);
    //regex to determine if the argument is website or relative path
    let regex = /^(www|http|https)*.(\w+)/g;
    let matches = path.match(regex);
    let isWebsite = matches instanceof Array;
    
    if (isWebsite){
        console.log("running webCat")
        webCat(path);
    }else{
        console.log("running Cat")
        cat(path);        
    }   
}

catOrWebCat()