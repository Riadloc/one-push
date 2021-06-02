const crypto = require('crypto');
const axios = require('axios');

function getSign(secret, content) {
  const str = crypto.createHmac('sha256', secret).update(content)
    .digest()
    .toString('base64');
  return str;
}

const push = async (data) => {
  const timestamp = Date.now();
  const secret = 'SEC8b0013aa5c7a6c97b3eb9b01621b4ecca8d5848e57e166c67183bdb2cc150c72';
  const sign = getSign(secret, `${timestamp}\n${secret}`);
  axios.post('https://oapi.dingtalk.com/robot/send?access_token=8137b92bd07c46666dc10633cee146ac5ce1f4f558572c05c843a8b63ae19b22',
    data, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      timestamp,
      sign,
    },
  }).then(res => {
    console.log('success');
  }).catch(err => {
    console.log(err);
  });
}

module.exports = push;