var express = require('express');
var router = express.Router();

router.use('/usuarios', require('./usuarios-routes'));
//router.use('/', require('./authentication-routes'));

module.exports = router;
