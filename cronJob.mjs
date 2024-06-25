import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';

const scriptPath = path.join(process.cwd(), 'update_prices.mjs');

cron.schedule('*/30 * * * *', () => {
    console.log('Running updatePrices.mjs script');
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script error output: ${stderr}`);
            return;
        }
        console.log(`Script output: ${stdout}`);
    });
});

console.log('Cron job scheduled to run every 30 minutes');