var randomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

$(document).ready(function() {
  var socket = io.connect('http://localhost:1337/');
  socket.on('draw', function(json) {
  	var coords = JSON.parse(json);
  	draw(coords.ax, coords.ay, coords.bx, coords.by, coords.color);
  });

  var canvas = $('#canvas');
  var ax = -1, ay = -1;
  var color = randomColor();
  canvas.mousemove(function(e) {
	if (ax != -1) {
	  draw(ax, ay, e.offsetX, e.offsetY, color);
      socket.emit('draw', JSON.stringify({ ax: ax, ay: ay, bx: e.offsetX, by: e.offsetY, color: color}));
      ax = e.offsetX;
      ay = e.offsetY;
	}
  });

  canvas.mousedown(function(e) {
  	ax = e.offsetX; 
  	ay = e.offsetY;
  });

  canvas.mouseup(function(e) {
  	ax = -1;
  });

  canvas.mouseleave(function(e) {
  	ax = -1;
  });

  var ctx = canvas[0].getContext('2d');
  var draw = function(ax, ay, bx, by, color) {
  	ctx.strokeStyle = color;
  	ctx.beginPath();
	ctx.moveTo(ax, ay);
	ctx.lineTo(bx, by);
    ctx.closePath();
	ctx.stroke();
  };

});
