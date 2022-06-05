import Sequelize from 'sequelize';
import schema from '../db.js';

const ingredientsSchema = schema.define("ingredients", {
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

    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true
    }

});

export default ingredientsSchema;