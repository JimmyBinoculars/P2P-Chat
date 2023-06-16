const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const readlineSync = require('readline-sync');
var CryptoJS = require("crypto-js");
const client = new net.Socket();
const readline = require('readline');
const { json } = require('stream/consumers');
let data;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateRandomString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function main() {
    //encryption check
    console.log(CryptoJS.AES.encrypt("Hello", "Monday left me broken").toString());

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

    let tempData = {'identifierBase':null, 'key':null};
    tempData['identifierBase'] = generateRandomString();
    tempData['key'] = generateRandomString();
    const jsonString = JSON.stringify(tempData);
    fs.writeFile('./data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
    fs.readFile('./data.json', (err, jsonString) => {
        if (err) {
            console.log(`Error reading the written file`);
            return;
        } else {
            data = JSON.parse(jsonString);
            console.log(`Successfully read file`);
            console.log(`Data read: ${JSON.stringify(data)}`);
            console.log(`Your key is: ${data["key"]}`)
        }
    });
}

main();