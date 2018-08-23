'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
    'usuarios',
          [
            {
              username: 'rvera',
              password:
                '$2a$10$XCQTzGZsZoRgPhMnjQcH/OdE/mhiiLWd97Jo7mu/wia4CZucvwUHC',
              nombre: 'Rodrigo',
              apellido: 'Vera',
              email: 'rvera@gmail.com.py',
              created_at: new Date(),
              updated_at: new Date()
            }
          ],
          {}
        );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
