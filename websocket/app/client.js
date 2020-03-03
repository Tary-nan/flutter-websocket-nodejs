const config = require('../config/config');

const WebSocket = require('ws');
const url = `ws://${config.Ip}:${config.port}`;

// connecter le client a mon websocket
const connection = new WebSocket(url)

// envoie de message lorsque la connection websocket est etablit
connection.onopen = () => {

  // envoie de msg
  connection.send(
    JSON.stringify({
      'id':'6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      'author': { 'name': 'Peter', 'imageUrl': 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', 'color': '#4286f4', },
      'body': 'This is the a message from client.js',
    })
  );
}

// affiche le message du clients dans la console
connection.onmessage = (event) => console.log(event.data);

// affiche le message d'erreur du clients dans la console
connection.onerror = (error) => console.log(`WebSocket error: ${error}`);

connection.onclose = ()=> console.log(' serveur deconnecter');

