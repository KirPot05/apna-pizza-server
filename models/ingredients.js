import Sequelize from 'sequelize';
import schema from '../db.js';

const ingredientsSchema = schema.define("ingredients", {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING
    },

    img_url:{
        type: Sequelize.TEXT
    }

});

schema.sync();

export default ingredientsSchema;