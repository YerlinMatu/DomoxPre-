const five = require('johnny-five');
var Board_sensed = require('./api_board');

var board = new five.Board(), potentiometer, temperature, led;

function InitialReadData(){
board.on('ready', ()=> {

  temperature = new five.Thermometer({
    controller: 'LM35',
    pin: 'A5'
  }).on("change", function() {
    //console.log(this.celsius + "°C", this.fahrenheit + "°F");
    Board_sensed.Temperature = { c: this.celsius, f: this.fahrenheit }
  });

  potentiometer = new five.Sensor({
    pin: 'A4',
    freq: 250
  }).on('data', function(){
    Board_sensed.Potentiometer = parseInt(this.value * 255 / 1023);
    // console.log(this.value,this.raw);
  })

  board.repl.inject({
    pot: potentiometer
  })

  led = new five.Led(13);

   if (Board_sensed.Led === false){
       led.off();
   } else if (Board_sensed.Led === true) {
       led.on();
   }
    // @example Movimiento.
  });
}

module.exports = InitialReadData;
