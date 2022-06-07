import { Router } from "express";
import fetchUser from '../middleware/fetchUser.js';
import Cart from '../models/cart.js';
import Ingredients from '../models/ingredients.js';
import { failed_response, success_response } from "../utils/response.js";
import { body, validationResult } from "express-validator";

const router = Router();


// Fetch cart items of the user
router.get('/', fetchUser, async (req, res) => {

    try{
        
        const cartItems = await Cart.findAll({
            where:{
                user_id: req.user_id,
                is_completed: false
            }
        });

        if(cartItems.length === 0){
            const result = failed_response(400, "No items found in cart");
            return res.status(400).json(result);
        }

        const message = "Successfully fetched cart items";
        const result = success_response(200, message, cartItems);
        res.status(200).json(result);

    } catch(err){
        console.error(err);
        return res.json(failed_response(500, "Internal server error"));
    }

});


// Add pizzas to the cart
router.post('/add', fetchUser, 
    [
        body('pizza').isArray()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(failed_response(500, "Something went wrong", errors.array()));
        }

    try{

        const { pizza } = req.body;

        let price = 100; //Base charge for each pizza

        // Calculating the price of each pizza upon adding ingredients
        for(let i=0; i<pizza.length; i++){
            const item = pizza[i];
            const ingredient = await Ingredients.findOne({where: {name: item}});
            price += ingredient.price;
        }
        
        
        const cartData = {
            user_id: req.user_id,
            price,
            pizza
        };

        const cartItem = await Cart.create(cartData);

        const message = "Added item to cart successfully";
        const result = success_response(201, message, cartItem);
        res.status(201).json(result);

    } catch(err){
        console.error(err);
        return res.json(failed_response(500, "Internal server error"));
    }

})



export default router;