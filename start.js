const { exec } = require('child_process');

// Run npm script
exec('npm run dev', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(stdout);
});
