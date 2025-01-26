'use strict'

const THISBROADCASTER = 'power-broadcaster-port'

const pickPort = require('pick-port');

const os = require('os')
const path = require('path')
const fs = require('fs')

const EventEmitter = require('events');
const monitor = new EventEmitter()


const ansiEscapes = require('ansi-escapes');
const boxen = require('boxen');

console.log( ansiEscapes.clearTerminal + ansiEscapes.cursorTo(0,0))
console.log(boxen(' Reading Rouvy data from network packets... ') + ansiEscapes.cursorDown(1))

const ora = require('ora')
const spinner = ora({
          text: '',
          indent: 0
        })

        
try {
    console.log('Require: RouvyPacketMonitor')
    var RouvyPacketMonitor = require('rouvy-packet-monitor')
    console.log('Create monitor')
} catch(e) {
    console.log(e)
}



const ip = require('internal-ip').v4.sync();
console.log(ip)


var host = '127.0.0.1'
var MULTICAST_ADDR = '239.255.255.250';


pickPort({ minPort: 6900, maxPort: 6999, ip: host, type: 'udp' }).then((port) => {

    var dgram = require('dgram');
    var server = dgram.createSocket("udp4");

    server.bind(port, host, function () {
        var portFile = path.join(os.tmpdir(), THISBROADCASTER)
    
        console.log(ansiEscapes.cursorDown(1) + 'Publishing port in: ' + portFile + ansiEscapes.cursorDown(2))
    
        fs.writeFileSync(portFile, `${port}`)
        
        spinner.start()

        if (RouvyPacketMonitor) {
            var monitor = new RouvyPacketMonitor(ip)
            console.log('Monitor created')
            
            monitor.on('outgoingPlayerState', (playerState) => {
                multicast(JSON.stringify({ ...playerState, packetInfo: { source: 'rouvy' } }))
            })
        }
        
    
    });


    function multicast(text) {
        var message = new Buffer.from(text);
        server.send(message, 0, message.length, port, MULTICAST_ADDR, function () {
            spinner.text = `Sent ${message}`;
            // console.log(`Sent ${message}`);
        });
    }
    
});

