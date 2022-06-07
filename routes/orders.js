import { Router } from "express";
import { body, validationResult } from "express-validator";
import fetchUser from "../middleware/fetchUser.js";
import Order from '../models/orders.js';
import Cart from '../models/cart.js';
import { failed_response, success_response } from "../utils/response.js";

const router = Router();


// Fetch all the orders of the user
router.get('/', fetchUser, async (req, res) => {

    try{

        const orders = await Order.findAll({
            where:{
                user_id: req.user_id
            }
        });

        if(orders.length === 0){
            const result = failed_response(400, "No orders found");
            return res.status(400).json(result);
        }

        const message = "Successfully fetched the previous orders";
        const result = success_response(200, message, orders);
        res.status(200).json(result);

    } catch(err){
        console.error(err);
        return res.json(failed_response(500, "Internal server error"));
    }

});


// Add an order
router.post('/add', fetchUser,
    [
        body('address').isString(),
        body('payment_method').isString(),
        body('cart_item_id').isNumeric(),
    ],
    async (req, res) => {
        // show errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(failed_response(500, "Something went wrong", errors.array()));
        }


        try{
            const { address, payment_method, cart_item_id } = req.body;
            const userId = req.user_id;

            const orderItemId = await Cart.update( { is_completed: true }, {
                where: {
                    id: cart_item_id,
                    is_completed: false
                }
            });

            if(orderItemId[0] === 0){
                const result = failed_response(400, "Cannot place the order");
                return res.status(400).json(result);
            }
            
            const orderItem = await Cart.findByPk(cart_item_id);

            if(orderItem.length === 0){
                const result = failed_response(400, "No such item found in cart");
                return res.status(400).json(result);
            }

            const orderData = {
                user_id: userId,
                amount: orderItem.price,
                ingredients_used: orderItem.pizza,
                address,
                payment_method
            };
            const order = await Order.create(orderData);

            const message = "Order placed successfully";
            const result = success_response(201, message, order);
            res.status(201).json(result);

        } catch(err){
            console.error(err);
            return res.json(failed_response(500, "Internal server error"));
        }
    }
);




export default router;