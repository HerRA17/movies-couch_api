//set up variable for modules
const http = require('http');
const fs = require('fs');
const url = require('url');

//create server 
    http.createServer((request, response) => {
        const addr = request.url;
        const q = url.parse(addr,true);
        let filePath = '';
//File where new info is appended 
    fs.appendFile('log.txt', `URL: ${addr}\nTimestamp:  ${newDate()}\n\n`, (err) => {
        if (err) {
        console.log(err);
        } else {
            console.log('Added to log.')
        }
    });
//  
    if (q.pathname.includes('documentation')){
        filePath = (`${_dirname}/documentation.html`)
    } else {
        filePath = 'index.html';
    }
//error handling
    fs.readFile(filePath, (err,data) => {
        if (err){
            throw error;
            }    
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
        });
}).listen(8080);
console.log('My first Node test server is running on Port 8080.');