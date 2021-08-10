const supertest = require('supertest');
const db = require("../models");
const Paciente = db.paciente;
const app = require("../app");

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await db.sequelize.sync({force: true})
})

test("GET /api/pacientes", async () => {
    const paciente = await Paciente.create({
        nombre: "Test",
        apellido: "Test",
        telefono: "1-111-111-1111",
        cedula: "1111111",
        fecha_nacimiento: "2021-08-10"
    });
    console.log(JSON.stringify(paciente))
    await supertest(app).get(`/api/pacientes?size=1&page=0`)
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body.rows)).toBeTruthy();
            expect(response.body.rows.length).toEqual(1);

            // Check data
            expect(response.body.rows[0].id).toBe(paciente.id);
            expect(response.body.rows[0].nombre).toBe(paciente.nombre);
            expect(response.body.rows[0].apellido).toBe(paciente.apellido);
            expect(response.body.rows[0].telefono).toBe(paciente.telefono);
            expect(response.body.rows[0].cedula).toBe(paciente.cedula);
            expect(response.body.rows[0].fecha_nacimiento).toBe(paciente.fecha_nacimiento);
        });
});

test("POST /api/pacientes", async () => {
    const data = {
        nombre: "Test",
        apellido: "Test",
        telefono: "1-111-111-1111",
        cedula: "1111111",
        fecha_nacimiento: "2021-08-10"
    };

    await supertest(app).post(`/api/pacientes`)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.id).toBeTruthy();
            expect(response.body.nombre).toBe(data.nombre);
            expect(response.body.apellido).toBe(data.apellido);
            expect(response.body.telefono).toBe(data.telefono);
            expect(response.body.cedula).toBe(data.cedula);
            expect(response.body.fecha_nacimiento).toBe(data.fecha_nacimiento);

            // Check data in the database
            const paciente = await Paciente.findByPk(response.body.id);
            expect(paciente).toBeTruthy();
            expect(paciente.nombre).toBe(data.nombre);
            expect(paciente.apellido).toBe(data.apellido);
            expect(paciente.telefono).toBe(data.telefono);
            expect(paciente.cedula).toBe(data.cedula);
            expect(paciente.fecha_nacimiento).toBe(data.fecha_nacimiento);
        });
});

test("PUT /api/pacientes/:id", async () => {
    const paciente = await Paciente.create({
        nombre: "Test",
        apellido: "Test",
        telefono: "1-111-111-1111",
        cedula: "1111111",
        fecha_nacimiento: "2021-08-10"
    });

    const data = {
        nombre: "Test CHANGED",
        apellido: "Test CHANGED",
        telefono: "2-222-222-2222",
        cedula: "2222222",
        fecha_nacimiento: "2021-08-11",
    }

    await supertest(app).put(`/api/pacientes/${paciente.id}`)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.message).toBeTruthy();
            expect(response.body.message).toBe("Paciente was updated successfully.");

            // Check data in the database
            const updatedPaciente = await Paciente.findByPk(paciente.id);
            expect(updatedPaciente).toBeTruthy();
            expect(updatedPaciente.nombre).toBe(data.nombre);
            expect(updatedPaciente.apellido).toBe(data.apellido);
            expect(updatedPaciente.telefono).toBe(data.telefono);
            expect(updatedPaciente.cedula).toBe(data.cedula);
            expect(updatedPaciente.fecha_nacimiento).toBe(data.fecha_nacimiento);
        });
});

test("GET /api/pacientes/:id", async () => {
    const paciente = await Paciente.create({
        nombre: "Test",
        apellido: "Test",
        telefono: "1-111-111-1111",
        cedula: "1111111",
        fecha_nacimiento: "2021-08-10"
    });

    await supertest(app).get(`/api/pacientes/${paciente.id}`)
        .expect(200)
        .then((response) => {
            // Check data
            expect(response.body.id).toBe(paciente.id);
            expect(response.body.nombre).toBe(paciente.nombre);
            expect(response.body.apellido).toBe(paciente.apellido);
            expect(response.body.telefono).toBe(paciente.telefono);
            expect(response.body.cedula).toBe(paciente.cedula);
            expect(response.body.fecha_nacimiento).toBe(paciente.fecha_nacimiento);
        });
});

test("DELETE /api/pacientes/:id", async () => {
    const paciente = await Paciente.create({
        nombre: "Test",
        apellido: "Test",
        telefono: "1-111-111-1111",
        cedula: "1111111",
        fecha_nacimiento: "2021-08-10"
    });

    await supertest(app)
        .delete(`/api/pacientes/${paciente.id}`)
        .expect(200)
        .then(async () => {
            expect(await Paciente.findByPk(paciente.id)).toBeFalsy();
        });
});

