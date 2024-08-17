import { spawn } from 'child_process';

export const spawnCommand = (command: string, args: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args);
        let output = '';
        let errorOutput = '';
    
        process.stdout.on('data', (data) => {
          output += data.toString();
        });
    
        process.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });
    
        process.on('close', (code) => {
          if (code === 0) {
            resolve(output.trim());
          } else {
            reject(new Error(`Process exited with code ${code}: ${errorOutput}`));
          }
        });
    });
}
