var express = require('express');

var app = express.createServer();
app.use(express.static(__dirname + '/ui'));
app.listen(1337);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
  socket.on('draw', function(draw) {
  	socket.broadcast.emit('draw', draw);
  });
});
