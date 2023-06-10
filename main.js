const net = require('node:net');

const port = 3000;

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

function start(){
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

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

start();