var express = require('express');
var router = express.Router();
const controller = require('../controller');
//const controllers = require(__base + 'controller');

router.get('/', function(req, res) {
  controller.usuarios.getAll().then(rps => res.json(rps))
  .catch(error => res.status(500).send(error));
});

router.get('/:id', function(req, res) {
  controller.usuarios.getUsuarioById(req.params.id).then(rps => res.json(rps))
  .catch(error => res.status(500).send(error));
});

router.post('/', function(req, res) {
  controller.usuarios.createUsuario(req.body).then(rps => res.json(rps))
  .catch(error => res.status(500).send(error));
});

router.delete('/:id', function(req, res) {
  controller.usuarios.removeUsuario(req.params.id).then(rps => res.json(rps))
  .catch(error => res.status(500).send(error));
});

router.put('/:id', function(req, res) {
  controller.usuarios.updateUsuario(req.params.id,req.body).then(rps => res.json(rps))
  .catch(error => res.status(500).send(error));
});
module.exports = router;
