const child_process = require('child_process');
const util = require('util');
const exec = util.promisify(child_process.exec);
const path = require('path');
const spider = require('./spider');

;(async () => {
  await spider();
  const args = process.argv.slice(2);
  const bashFile = path.join(__dirname, '../../bin/gh-pages.sh');
  child_process.spawn(`sudo chmod +x ${bashFile}`, args, (error, stdout) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
})();