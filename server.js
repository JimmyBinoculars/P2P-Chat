const net = require('net');
const port = 5555;
const crypto = require('crypto');
let currentKey;

function generateRandomString(lengthInBits) {
  const lengthInBytes = Math.ceil(lengthInBits / 8);
  const randomBytes = crypto.randomBytes(lengthInBytes);
  const randomString = randomBytes.toString('hex');
  return randomString;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

//string check
const randomString = generateRandomString(256);
console.log(randomString);

const clients = [];

const server = net.createServer((socket) => {
    console.log('Client connected.');
  
    // Add the socket to the list of connected sockets
    clients.push(socket);
  
    // Handle incoming data from the client
    socket.on('data', (data) => {
      const message = data.toString().trim();
      console.log(`Received message: ${message}`);
    });
  
    socket.on('end', () => {
        console.log('Client disconnected.');
    
        // Remove the socket from the list of connected sockets
        const index = clients.indexOf(socket);
        if (index !== -1) {
          clients.splice(index, 1);
        }
    });
    
      // Handle socket errors
      socket.on('error', (error) => {
        console.error('Socket error:', error);
        socket.destroy(); // Close the socket to prevent further errors
    });
});
server.listen(port);

async function mainLoop(){
    while (true){
        currentKey = generateRandomString(256);
        console.log(`Current key is ${currentKey}`)
        await sleep(1800000);
    }
}
async function sendData(){
    while (true){
        clients.forEach((client) => {
            client.write(currentKey);
        });
        console.log(`sending data`);
        await sleep(500);
    }
}

mainLoop();
sendData();