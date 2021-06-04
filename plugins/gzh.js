const fs = require('fs/promises');
const path = require('path');
const { getToday } = require('../constants/utils.js');

const today = getToday();

async function gzh() {
  const fileList = await fs.readdir(path.join(__dirname, `../docs/${today}`));
  const regex = /\.html$/;
  const files = fileList.filter(regex.test(regex));
  const baseUrl = 'https://riadloc.github.io/one-push/';
  const links = files
    .map(f => ({
      title: f.replace(regex, ''),
      messageURL: baseUrl + f
    }))
  return {
    msgtype: 'feedCard',
    feedCard: {
      links: links
    }
  }
}

module.exports = gzh;