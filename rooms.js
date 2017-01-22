var socket = io();

function createRoomCode() {
    var roomID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        roomID += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return roomID;
}

function Room (id, password){
  this.id = id,
  this.password = password;
}

$('#create-room').on('click', function(){
  var id = createRoomCode(),
      password = $('#set-password').val(),
      room = new Room(id, password);

  socket.emit('create room', room);

  socket.on('room exists', function(){
    room.id = createRoomCode();
    socket.emit('create room', room)
  });

  $('#room-code').text(room.id);

});

$('#join-room').on('click', function(){
  var id = $('#input-room-code').val(),
      password = $('#input-room-password').val(),
      room = new Room(id, password);
  socket.emit('join room', room);
});
