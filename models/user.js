import Sequelize from 'sequelize';
import schema from '../db.js';

const userSchema = schema.define("users", {

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

schema.sync()

export default userSchema;
