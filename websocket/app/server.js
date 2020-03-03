const WebSocket = require('ws')
// je creer mon server websocket
const config = require('../config/config');

// demarrage de mon serveur ws
const wss = new WebSocket.Server({ port: 8080 });
console.log('[WebSocket] Starting WebSocket server...');
const url = `ws://${config.Ip}:${config.port}`;
console.log(url);

// ensuite nous cablons des evenement
wss.on('connection', (ws, request) => {
  // lorsque je me connect ws

  const clientIp = request.connection.remoteAddress;
  console.log(`[WebSocket] Client with IP ${clientIp} has connected`);


  // Broadcast to all connected clients 
  ws.on('message', message => {

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    console.log(`[WebSocket] Message ${message} was received`)
  });
  ws.on('error', (error) => console.log(error.message));
});