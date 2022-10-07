//set up variable for modules
const http = required('http');
fs = require('fs');
url = require('url');

//create server 
    http.createServer((request, response) => {
        let addr = request.url,
        q = new URL(addr,true),
        filePath = '';
//File where new info is appended 
    fs.appendFile('log.txt', 'URL: ', +addr+ '\nTimestamp: ' + newDate() + '\n\n', (err) => {
        if (err) {
        console.log(err);
        } else {
            console.log('Added to log.')
        }
    });
//  
    if (q.pathname.includes('documentation')){
        filePath = (_movie_api + '/documentation.html')
    } else {
        filePath = 'index.html';
    }
//error handling
    fs.readFile(fielPath, (err,data) => {
        if (err){
            throw error;
            }
    
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(data);
        response.end();
        });
}).listen(8080);
console.log('My first Node test server is running on Port 8080.');