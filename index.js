const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', ' <i>' + socket.username + '@group-chat dołączył/a do czatu</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '<i>' + socket.username + ' opuścił czat</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message',  socket.username + '@group-chat:~$ ' + message);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});