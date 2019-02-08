import express from 'express';
import WebSocket from 'ws';

import dispatch from './messaging';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 4020;

const server = app.listen(port, host, err => {
  if (err) {
    /* eslint-disable no-console */
    console.err(err);
    /* eslint-enable */
    return;
  }
  /* eslint-disable no-console */
  console.log(`server is listening at http://${host}:${port}`);
  /* eslint-enable */
});

/**/
function handleClose() {}

/**/
function handleError(error) {
  /* eslint-disable no-console */
  console.error(error.message);
  /* eslint-enable */
}

/**/
function handleMessage(message) {
  this.dispatch(`Echo: ${message}`);
}

/**/
function handlePong() {
  this.dispatch('Pong: Received');
  this.isAlive = true;
}

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.dispatch = dispatch;

  ws.on('close', handleClose);
  ws.on('error', handleError);
  ws.on('message', handleMessage);
  ws.on('pong', handlePong);

  ws.dispatch('Connection: UP');
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
