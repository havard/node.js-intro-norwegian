require('net').createServer(function(socket) {
  socket.write('Here be echo.');
  socket.pipe(socket);
}).listen(1337);
