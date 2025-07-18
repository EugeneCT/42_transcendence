const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('dist'));

let players = [];

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    players.push(socket.id);

    socket.emit('playerNumber', players.length);

    if (players.length === 2) {
        io.emit('startGame');
    }

    socket.on('syncPaddle', (data) => {
        socket.broadcast.emit('syncPaddle', data);
    });

    socket.on('syncBall', (data) => {
        socket.broadcast.emit('syncBall', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        players = players.filter(id => id !== socket.id);
        io.emit('playerDisconnected');
    });
});

// 🚨 Catch Ctrl+C or process exit to clean up
function gracefulShutdown() {
    console.log('\nShutting down server...');
    
    io.emit('serverShutdown');
    
    io.sockets.sockets.forEach((socket) => {
        socket.disconnect(true);
    });

    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
}

// 🛑 Listen for shutdown signals
process.on('SIGINT', gracefulShutdown);   // Ctrl+C
process.on('SIGTERM', gracefulShutdown);  // kill or platform signals

server.listen(3004, () => {
    console.log('Server running at http://localhost:3004');
});
