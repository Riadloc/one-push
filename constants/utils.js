const dayjs = require('dayjs');

function getToday() {
  return dayjs(new Date()).format('YYYY-MM-DD');
}

module.exports = {
  getToday
}