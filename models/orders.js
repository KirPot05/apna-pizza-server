import Sequelize from 'sequelize';
import schema from '../db.js';

const orderSchema = schema.define("users", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    ingredients_used:{
        type: Sequelize.ARRAY,
        allowNull: false
    },

    date:{
        type: Sequelize.DATE,
        allowNull: false
    },

    address:{
        type: Sequelize.TEXT,
        allowNull: false
    },

    payment_method:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default orderSchema;
