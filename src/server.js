import WebSocket from 'ws';

/**/
function handleClose() {}

/**/
function handleError(error) {
  console.error(error.message);
}

/**/
function handleMessage(message) {
  console.log(message);
}

/**/
function handlePong() {
  this.isAlive = true;
}

const wss = new WebSocket.Server({ port: 8085 });

wss.on('connection', ws => {
  ws.isAlive = true;

  ws.on('close', handleClose);
  ws.on('error', handleError);
  ws.on('message', handleMessage);
  ws.on('pong', handlePong);

  ws.send('WebSocket server is up');
});

setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      ws.terminate();
      return;
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
