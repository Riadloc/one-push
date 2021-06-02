const push = require('./push.js');
const plugins = require('./plugins');

;(async () => {
  Promise.all(plugins.map(plugin => {
    const data = await plugin();
    push(data);
  }))
})();