const cat = require("./step1");
const axios = require("axios");

/* 
takes in a URL path, outputs the contents to the console.
 */
async function webCat(url) {
    if(!url.startsWith("http")){
        url = "http://"+url
    }
    try {
        let content = await axios.get(url);
        console.log(content.data);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

/* 
Function to determine if the argument given is a local path or web path
then runs cat function or webCat respectively.
 */
async function catOrWebCat(){
    
    let path = process.argv[2];
    //regex to determine if the argument is website or relative path
    let regex = /^(www|http|https)*.(\w+)/g;
    let matches = path.match(regex);
    let isWebsite = matches.length >= 1;
    
    
    if (isWebsite){
        console.log("running webCat")
        await webCat(path);
    }else{
        console.log("running Cat")
        cat(path);        
    }

    
}

catOrWebCat()