const axios = require('axios');

let token;

async function getShici() {
  return axios.get('https://v2.jinrishici.com/one.json?client=npm-sdk/1.0', {
    params: {
      'X-User-Token': token
    }
  }).then(res => {
    const { data, token: tk } = res.data;
    if (!token) {
      token = tk;
    }
    // console.log(data.content)
    return {
      msgtype: 'markdown',
      markdown: {
        title: '每日一词',
        text: `#### 每日一词 \n ${data.content}`
      }
    };
  });
}

module.exports = getShici;