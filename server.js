"use strict"

const express = require('express');
const app     = new express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const router  = express.Router();
const port    = 8080;

//const five    = require('johnny-five');
const wifi    = require('node-wifi');
// CLI
const os      = require('os');
const Log     = require('log');
const colors  = require('colors');
var  arduino  = require('./Arduino')();
var  Board_sensed  = require('./api_board');


const SendSocketClient = require('./socketconfig');

let log  = new Log('dubug'), state;
// Sockets
var i = 0;
io.on('connection', socket=> {
  setInterval(() => {
    socket.emit('now', Board_sensed);
  }, 200);
  socket.on('led', (bool) => {
      state = bool;
      console.log(bool +' '+i++);
      //Board_sensed.Led = bool;
  })
});

// New WebSockets Reading

Board_sensed.Led = state;

// Callbacks Router.
function login(req, res) {
    res.render('Login');
    res.end();
}

function dashboard(req, res) {
    res.render('index.html');
}

function settings(req, res) {
    res.send('settings');
    res.end();
}

//Board_sensed.Led = true;
// Rutas and Middleware.
app.use(express.static('public'));

app.get('/', dashboard);
app.get('/login', login);
app.get('/settings', settings);
app.get('/dashboard', dashboard);

server.listen(port, () => {
	console.log(`Servidor corriendo en el puerto ${ port }`.yellow);
	// ScannerWifi();
});
