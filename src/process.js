import { spawn } from 'child_process';

import { PROTOCOL_PROCESS_CLOSED } from './protocol';

const run = (ws, program, ...args) => {
  let stdout = '';
  let stderr = '';

  const process = spawn(program, args);

  process.stdout.on('data', data => {
    stdout += String(data);
  });

  process.stderr.on('data', data => {
    stderr += String(data);
  });

  process.on('close', () => {
    if (stderr.length > 0) {
      ws.dispatch(PROTOCOL_PROCESS_CLOSED, stderr);
    } else {
      ws.dispatch(PROTOCOL_PROCESS_CLOSED, stdout);
    }
  });
};

export default run;
