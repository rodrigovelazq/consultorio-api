var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', passport.authenticate('local'),
  function(req, res) {
      
});

router.get('/logout', function(req, res) {
    req.logout();
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
