const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var numberOfRequests = 0;

app.use(express.static(publicPath));

// New user connected.
io.on('connection', (socket) => {
    
    // Call made to the server.
    var requestMade = () => { 
        io.emit('updateRequestNumber', ++numberOfRequests);
    }

    // First time page load.
    requestMade();

    // Listner to current time request.
    socket.on('getTimeBtn', () => { 
        socket.emit('getTime', new Date().toLocaleString());
        requestMade();
    });

    // Listner to multiply request.
    socket.on('multiplyNumbers', (num1, num2) => {

        if(num1 === null || num2 === null || typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            socket.emit('multiplyResult', 'Something went wrong');
        }
        else {
            socket.emit('multiplyResult', num1 * num2);
        }

        requestMade();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
