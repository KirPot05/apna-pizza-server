import Sequelize from 'sequelize';
import schema from '../db.js';

const cartSchema = schema.define("cart", {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    is_completed:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    pizza:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    }
});

schema.sync();

export default cartSchema;
