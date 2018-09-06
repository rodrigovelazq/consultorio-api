const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const models = require('../data/models');

exports.authenticate = async (username, password) => {
  if(!username || !password){
    return null;
  }

  const user = await models.Usuario.findOne({ where: {username: username} });

  if (!user) {
    return null;
  }
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    return null;
  }

};
