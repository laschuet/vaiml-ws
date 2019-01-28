import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8085 });

wss.on('connection', ws => {
  /**/
  ws.on('message', message => {
    console.log(message);
  });

  /**/
  ws.on('close', () => {});

  /**/
  ws.on('error', error => {
    console.error(error.message);
  });

  ws.send('WebSocket server is up');
});
