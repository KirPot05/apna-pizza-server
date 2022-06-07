import Sequelize from 'sequelize';

const db = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'db',
    dialect: 'postgres'
});

export default db;