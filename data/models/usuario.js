'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usuario = sequelize.define('Usuario', {
    username: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'usuarios'
  });
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};
