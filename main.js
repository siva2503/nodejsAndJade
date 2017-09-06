const express = require('express');
const expressInstance = express();
const port = 7000;

expressInstance.set('views', __dirname+'/jadeFiles');
expressInstance.set('view engine', 'jade');
expressInstance.engine('jade', require('jade').__express);

expressInstance.get('/', (req, res) => {

	// renders the page.jade page and sends that as a response.
	res.render('page');
});

expressInstance.use(express.static(__dirname+'/public'));

const ioObject = require('socket.io').listen(expressInstance.listen(port, () => {
	console.log('the socket is set at ->' +port);
}));

ioObject.sockets.on('connection', (socket) => {

	// emits Welcome message when the page first loads
	socket.emit('message', {message:'welcome'});

	//emits the received data to all sockets.
	socket.on('send', (data)=> {
		ioObject.sockets.emit('message', data);
	});
});

