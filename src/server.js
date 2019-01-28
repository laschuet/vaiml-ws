import express from 'express';
import WebSocket from 'ws';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 8085;

app.get('/test', (req, res) => {
  res.send({ data: 'a simple string' });
});

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

const wss = new WebSocket.Server({ server });

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