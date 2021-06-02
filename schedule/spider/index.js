const child_process = require('child_process');
const path = require('path');
const spider = require('./spider');

;(async () => {
  await spider();
  const args = process.argv.slice(2);
  child_process.execFile(path.join('__dirname', '../../bin/gh-pages.sh'), args);
})();