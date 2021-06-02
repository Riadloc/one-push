const fs = require('fs/promises');
const path = require('path');
const { getToday } = require('../constants/utils.js');

const today = getToday();

async function gzh() {
  const filesTxt = await fs.readdir(path.join(__dirname, `../constants/${today}.txt`));
  const files = filesTxt.replace(/(\.html)\s/g, '$1&').split('&');
  const regex = /\.html$/;
  const baseUrl = 'https://riadloc.github.io/one-push/';
  const links = files
    .filter(f => regex.test(f))
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