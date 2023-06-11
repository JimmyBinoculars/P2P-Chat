const net = require('net');
const port = 5555;

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

while (true()){

}