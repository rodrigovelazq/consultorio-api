const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../data/models');
const nconf = require('../config');

exports.getAll = async function() {
      //throw 'Ocurrio un error grave';
      return await models.Usuario.findAll();
};


exports.createUsuario = async function(newUsuario) {
  if(!newUsuario)
    throw 'Se necesita una instancia para poder guardar';

  if(!newUsuario.username || !newUsuario.password)
    throw 'Se necesita al menos el username y el password';

  const persisted = await getUsuarioByUsername(newUsuario.username);

  if (persisted.length > 0) 
    throw 'Ya existe un usuario con el mismo nombre de usuario';

  newUsuario.password = bcrypt.hashSync(newUsuario.password, nconf.get('bcrypt:saltRounds'));
  return await models.Usuario.create(newUsuario);
};

const getUsuarioByUsername = async function(username) {
  const filter = {
    where: {
      username: { $eq: username }
    } 
  };
  return models.Usuario.findAll(filter);
};

const getUsuarioById = exports.getUsuarioById = async function(id) {
  return await models.Usuario.findById(id);
};


exports.removeUsuario = async function(id) {
  if (!id) {
    throw ('El usuario a eliminar no puede ser nulo');
  }

  const persisted = await getUsuarioById(id);
  if(!persisted) {
    throw ("No existe un usuario con ese id");
  }

  return await persisted.destroy();
};


exports.updateUsuario = async function(id, usuario) {
  if (!usuario) {
    throw ('El usuario a actualizar no puede ser nulo');
  }

  const persisted = await getUsuarioById(id);
  if (!persisted) {
    throw ('No existe un usuario con ese id');
  }

  //verificamos que no exista otro usuario con el mismo username
  const persisted2 = await getUsuarioByUsername(usuario.username);
  if (persisted2.length > 0) {
    if (persisted2[0].id != id) {
      throw ('Ya existe un usuario con el mismo nombre de usuario');
    }
  }

  for (const key of Object.keys(usuario)) {
    persisted[key] = usuario[key];
  }
  await persisted.save();
  return persisted;
};
