const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../data/models');

exports.authenticate = (username, password, done) => {
  models.Usuario.findOne({ where: {username: username} })
  .then(user => {
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }).catch(err => {
      if (err) {
        return done(err);
      }
  });
};

exports.serializeUser = (user, done) => {done(null, user.id);};

exports.deserializeUser = (id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
};
