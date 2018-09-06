var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var nconf = require('../config'); // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
  // verifies secret and checks exp
  jwt.verify(bearerToken,  nconf.get("secret"), function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;