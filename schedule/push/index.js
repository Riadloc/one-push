const push = require('../../push');
const plugins = require('../../plugins');

// console.log(plugins);

;(() => {
  Promise.all(plugins.map(plugin => plugin().then(push)))
})();