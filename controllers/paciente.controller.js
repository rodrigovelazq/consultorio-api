const db = require("../models");
const Paciente = db.paciente;
const Op = db.Sequelize.Op;

const getOrder = (order, orderBy) => {
    return order ? [[orderBy, order ? order : 'ASC']] : null
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count, rows} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);

    return {count, rows, totalPages, currentPage};
};

// Create and Save a new Paciente
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Paciente
    const paciente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        fecha_nacimiento: req.body.fecha_nacimiento
    };

    // Save Paciente in the database
    Paciente.create(paciente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Paciente."
            });
        });
};

// Retrieve all Pacientes from the database.
exports.findAll = (req, res) => {
    const {page, size, filter, order, orderBy} = req.query;
    var condition = filter ? {[Op.or]: [{nombre: {[Op.iLike]: `%${filter}%`}}, {apellido: {[Op.iLike]: `%${filter}%`}}]} : null;

    const {limit, offset} = getPagination(page, size);
    const orderArray = getOrder(order, orderBy);

    Paciente.findAndCountAll({where: condition, limit, offset, order: orderArray})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pacientes."
            });
        });
};

// Find a single Paciente with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Paciente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Paciente with id=" + id
            });
        });
};

// Update a Paciente by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Paciente.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Paciente was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Paciente with id=${id}. Maybe Paciente was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Paciente with id=" + id
            });
        });
};

// Delete a Paciente with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Paciente.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Paciente was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Paciente with id=${id}. Maybe Paciente was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Paciente with id=" + id
            });
        });
};