import { spawn } from 'child_process';

const run = (program, ws) => {
  let stdout = '';
  let stderr = '';

  const process = spawn('julia', ['-e', program]);

  process.stdout.on('data', data => {
    stdout += String(data);
  });

  process.stderr.on('data', data => {
    stderr += String(data);
  });

  process.on('close', () => {
    if (stderr.length > 0) {
      ws.dispatch({ output: stderr, type: 'STDERR' });
    } else {
      ws.dispatch({ output: stdout, type: 'STDOUT' });
    }
  });
};

export default run;
