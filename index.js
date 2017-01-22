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

  socket.on('disconnect', function(){
  });

  socket.on('create room', function(room){
    //if room exists, try again
    if(io.sockets.adapter.rooms[room]){
      console.log(`room ${room} already exists`)
      socket.emit('room exists')
    }
    else{
      socket.join(room);
      console.log(`room ${room} created and joined`)
    }
  });

  socket.on('join room', function(room){
    socket.join(room);
    console.log(`room ${room} joined`)
  });
});
