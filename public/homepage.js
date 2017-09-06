window.onload = function() {
	var messages = [];
	var socket = io.connect('http://10.19.32.154:7000');

	var field = document.getElementById("field");
	var content = document.getElementById("content");
	var sendButton = document.getElementById("send");
	var nameContent = document.getElementById("name");

	socket.on('message', (data) => {
		console.log('inside message');
		if (data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log('there was some error in the data'+data);
		}
	});

	sendButton.onclick = () => {

		var text = field.value;
		var usernaming = nameContent.value;
		if (usernaming == "") {
			alert('please enter it');
		} else {
			socket.emit('send', {message: text, username: usernaming});
			console.log('click happens' + text);	
			field.value ="";
		}
		
	}

};