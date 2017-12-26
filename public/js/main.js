const ip = 'http://localhost:8080';
const socket = io.connect(ip, {forceNew:true});

function dom($element){
	return document.querySelector($element)
}

socket.on('now', (now)=>{
	let data = now;
	dom('#now').innerText = (data.time - 10) + ' - ' +data.zone;
	dom('#temp').innerText = data.time
});

dom('#local').addEventListener('click', ()=>{
	socket.emit('foco');
});
