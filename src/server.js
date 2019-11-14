import express from 'express';
import WebSocket from 'ws';

import dispatch from './messaging';
import run from './process';
import {
  PROTOCOL_CONNECTION_ESTABLISHED,
  PROTOCOL_RUN_JULIA_CODE,
  PROTOCOL_RUN_JULIA_FILE,
} from './protocol';

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
  try {
    const json = JSON.parse(message);
    if (json.type === PROTOCOL_RUN_JULIA_CODE) {
      run(this, 'julia', '-E', json.data);
    } else if (json.type === PROTOCOL_RUN_JULIA_FILE) {
      // TODO implement
    }
  } catch (error) {
    handleError(error);
  }
}

/**/
function handlePong() {
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

  ws.dispatch(PROTOCOL_CONNECTION_ESTABLISHED);
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
