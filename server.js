const http = require('http');

// console.log(http);

const server = http.createServer((request, response)=>{
    response.writeHead(200, {
       "Content-Type": "text/plain",
    });

    response.end('welcome to sqi ecommerce nodejs server')

   
    
})




const Port = process.env.PORT || 8080;

server.listen(Port, ()=>{
    console.log(`Server is runing on port ${Port}`);
    
})
