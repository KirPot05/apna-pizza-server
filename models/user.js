import Sequelize from 'sequelize';
import schema from '../db.js';

const userSchema = schema.define("users", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default userSchema;
