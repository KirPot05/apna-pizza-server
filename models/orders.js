import Sequelize from 'sequelize';
import schema from '../db.js';

const orderSchema = schema.define("orders", {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    ingredients_used:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },

    amount:{
        type: Sequelize.DOUBLE,
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

schema.sync();

export default orderSchema;
