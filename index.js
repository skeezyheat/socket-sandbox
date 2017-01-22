'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8000;

let roomArray = [];

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
    if(io.sockets.adapter.rooms[room.id]){
      console.log(`room ${room.id} already exists`)
      socket.emit('room exists')
    }
    else{
      roomArray.push(room)
      socket.join(room.id);
      console.log(`room ${room.id} created and joined with password ${room.password}`)
    }
  });

  socket.on('join room', function(r){
    roomArray.forEach(function(room){
      if(room.id === r.id ){
        if(room.password === r.password){
          socket.join(r.id);
          console.log(`room ${r.id} joined`)
        }
        else{
          console.log(`tried joining room ${r.id} but the password was incorrect`)
        }
      }
    });

  });
});
