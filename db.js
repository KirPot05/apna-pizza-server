import Sequelize from 'sequelize';

const db = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5425,  
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.DB_SSL == "true"
    }
});

export default db;