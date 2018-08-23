#CREAR MODELO
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
node_modules/.bin/sequelize seed:generate --name user-seeder

node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
