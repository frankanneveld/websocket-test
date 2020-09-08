"use strict";

const timer = setInterval(() => {
  const date = JSON.stringify(new Date());
  sendMessage(`{ "interval" : ${date} }`);
}, 1000);

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {

  console.log('Socket Client Connected ');

    //send feedback to the incoming connection
    webSocketClient.send('{ "connection" : "ok"}');

    //when a message is received
    webSocketClient.on('message', (message) => {
        console.log('Message: \x1b[32m %s \x1b[0m', message);
        const date = JSON.stringify(new Date());
        sendMessage(`{ "message" : ${message} ,"date" : ${date}}`);
    });

    // Ignore ECONNRESET and re throw anything else
    webSocketClient.on('error', err => {
      if (err.code !== 'ECONNRESET') {
        throw err;
      }
    });
});

function sendMessage(message) {
  websocketServer
  .clients
  .forEach( client => {
      client.send(message);
  });
}

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});
