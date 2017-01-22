'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8000;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

http.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(message){
    console.log(`message: ${message}`)
    io.emit('chat message', message);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
});
