const fs = require('fs/promises');
const path = require('path');
const { getToday } = require('../constants/utils.js');

const today = getToday();

async function gzh() {
  const fileList = await fs.readdir(path.join(__dirname, `../docs/${today}`));
  const regex = /\.html$/;
  const files = fileList.filter(fileName => regex.test(fileName));
  const baseUrl = `https://riadloc.github.io/one-push/${today}/`;
  const links = files
    .map(fileName => ({
      title: fileName.replace(regex, ''),
      messageURL: baseUrl + fileName
    }))
  return {
    msgtype: 'feedCard',
    feedCard: {
      links: links
    }
  }
}

module.exports = gzh;