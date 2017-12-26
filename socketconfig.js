function SendSocketClient(socket, $event, $sending){
 try {
	socket.emit($event, $sending);
 } catch(err){
		console.error('Socket vacio' +err);
	} 
}

module.exports = SendSocketClient;