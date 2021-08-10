var express = require('express');
var router = express.Router();
const paciente = require("../controllers/paciente.controller.js");

router.get("/", paciente.findAll);

module.exports = router;
