var express = require('express');
var router = express.Router();
var VerifyToken = require('./VerifyToken');

router.use('/usuarios', VerifyToken, require('./usuarios-routes'));
router.use('/auth', require('./authentication-routes'));

module.exports = router;
