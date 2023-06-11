const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
var CryptoJS = require("crypto-js");
const client = new net.Socket();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
let currentKey;

const port = 3000;
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateRandomString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
}

//Connect to other client
function clientConnect(ip, port){
    const client = net.createConnection({ host, port }, () => {
        console.log('Connected to server.');
      
        // Send a message to the server
        client.write('Hello server!');
      });
      
      // Handle incoming data from the server
      client.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Received response from server: ${message}`);
      });
      
      // Handle server disconnection
      client.on('end', () => {
        console.log('Disconnected from server.');
      });
}

async function getCurrentKey(){

}

function start(){
    //encryption check
    console.log(CryptoJS.AES.encrypt("Hello", "Monday left me broken").toString());
    
    //Start server
    const server = net.createServer((socket) => {
        console.log('Client connected.');
      
        // Handle incoming data from the client
        socket.on('data', (data) => {
          const message = data.toString().trim();
          console.log(`Received message: ${message}`);
      
          // Send a response back to the client
          socket.write(`Server received message: ${message}\n`);
        });
      
        // Handle client disconnection
        socket.on('end', () => {
          console.log('Client disconnected.');
        });
      });

    server.listen(port);

    //connect to keygen server
    client.connect(5555, 'localhost', () => {
      console.log('Connected to server.');
    
      client.on('data', (data) => {
        const receivedData = data.toString().trim();
        currentKey = receivedData;
        console.log(`Received data: ${receivedData}`);
      });
    
      client.on('close', () => {
        console.log('Connection closed.');
      });
    });

    //Get client info
    console.log("Finished starting server");
    let isData;
    try {
        let {identifierBase} = require('./config.json');
    } catch {
        isData = false;
    }

    let tempData = {};
    if(isData){
        let {identifierBase, name} = require('./config.json');
    }else {
        readline.question('Whats your name? (optional)', name => {
            console.log(`Hey there ${name}!`);
            readline.close();
            console.log("Generating your identifier");
            tempData['name'] = name;
        });
        //tempData['identifier'] = CryptoJS.AES.encrypt()
    }
}

start();