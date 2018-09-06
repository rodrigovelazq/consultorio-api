var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const nconf = require('../config'); 
const controller = require('../controller');

router.post('/login',
  function(req, res) {
    controller.authentication.authenticate(req.body.username,req.body.password)
    .then(rps => {
        if(!rps){
            return res.status(401).send({ auth: false, token: null });
        }
        var token = jwt.sign({ id: rps.id }, nconf.get("secret"), {
            expiresIn: 86400 // expires in 24 hours
          });
        return res.status(200).send({ auth: true, token: token, rps });
    }).catch(error => res.status(500).send(error));
});

router.get('/logout', 
    function(req, res) {
        res.status(200).send({ auth: false, token: null });
});

module.exports = router;
