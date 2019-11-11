import { spawn } from 'child_process';

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
      ws.dispatch('process', stderr);
    } else {
      ws.dispatch('process', stdout);
    }
  });
};

export default run;
