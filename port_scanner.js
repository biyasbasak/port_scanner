var net = require('net');

var host = 'localhost';

// starting port to scan
var start = 1;

//end port to scan
var end = 10000;

while (start <= end) {

	var port = start;

	// self invoking function takes in the port 
	(function(port) {
		var socket = new net.Socket();

		socket.setTimeout(2000,function(){
			socket.destroy();
		});
		socket.connect(port, host, function() {
			console.log('OPEN: ' + port);
		});
		socket.on('data', function(data) {
			console.log(port + ':' + data);
			socket.destroy();
		});
		socket.on('error', function(e) {
			socket.destroy();
		});
	})(port);
	start++;
}