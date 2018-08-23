const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: `${__dirname}/config.json` });

nconf.required(['database', 'sendDir', 'server']);

module.exports = nconf;
