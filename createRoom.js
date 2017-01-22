var socket = io();

function makeRoomID() {
    var roomID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        roomID += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return roomID;
}

$('#create-room').on('click', function(){
  var roomID = makeRoomID();
  socket.emit('create room', roomID);

  socket.on('room exists', function(){
    var newRoomID = makeRoomID()
    socket.emit('create room', newRoomID)
    roomID = newRoomID;
  });

  $('#room-code').text(roomID);

});

$('#join-room').submit(function(){
  var code = $('#input-room-code').val();
  socket.emit('join room', code);
});
