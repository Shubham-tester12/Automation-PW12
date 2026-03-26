const { spawnSync } = require('child_process');
const maxAttempts = 10;

(async () => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Attempt ${attempt}/${maxAttempts}: running Playwright tests...`);
    const res = spawnSync('npx', ['playwright', 'test'], { stdio: 'inherit', shell: true });
    if (res.status === 0) {
      console.log('Tests passed. Exiting.');
      process.exit(0);
    }
    console.log('Tests failed. Retrying...');
  }
  console.error(`Tests did not pass after ${maxAttempts} attempts.`);
  process.exit(1);
})();
