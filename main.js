const net = require('node:net');

//Connect to other client
function clientConnect(ip){

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
    const port = 3000;

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

start();