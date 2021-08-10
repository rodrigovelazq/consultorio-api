var express = require('express');
var router = express.Router();
const paciente = require("../controllers/paciente.controller.js");

router.get("/", paciente.findAll);
router.get("/:id", paciente.findOne);
router.post("/", paciente.create);
router.put("/:id", paciente.update);
router.delete("/:id", paciente.delete);

module.exports = router;
