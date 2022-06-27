const PORT = port = process.env.PORT || 8080
const http = require('http');
const { createServer } = require("http");
const fs = require('fs');
const { Server } = require("socket.io");
const handlersInController = require("./controllers/Handlers.js");



let handlers = new handlersInController();

const server = http.createServer((req, res) => {
    const filesDefences = req.url.match(/\.js$|.css$|.jpg$|.png/);
    if (filesDefences) {
        handlers.readFileToClient(req, res, filesDefences)
    } else {
        let trimPath = req.url.replace(/^\/+|\/+$/g, '')
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notfound;
        chosenHandler(req, res);
    }



}).listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})


let router = {
    'home': handlers.home,
    'notfound': handlers.notfound,
}