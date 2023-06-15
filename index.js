const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const readlineSync = require('readline-sync');
var CryptoJS = require("crypto-js");
const client = new net.Socket();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let identifierBase, key;
let currentKey;

function main() {
    //connect to keygen server
    client.connect(5555, 'localhost', () => {
        console.log('Connected to server.');

        client.on('data', (data) => {
            const receivedData = data.toString().trim();
            currentKey = receivedData;
            //console.log(`Received data: ${receivedData}`);
        });

        client.on('close', () => {
            console.log('Connection closed.');
        });
    });
}

main();