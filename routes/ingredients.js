import { Router } from "express";
import Ingredients from '../models/ingredients.js';
import { failed_response, success_response } from "../utils/response.js";

const router = Router();


// Endpoint to fetch all the ingredients
router.get('/', async (req, res) => {

    try{

        const ingredients = await Ingredients.findAll();

        if(ingredients.length === 0){
            const result = failed_response(400, "No ingredients found");
            return res.status(400).json(result);
        }

        const message = "Successfully fetched the previous orders";
        const result = success_response(200, message, ingredients);
        res.status(200).json(result);

    } catch(err){
        console.error(err);
        return res.json(failed_response(500, "Internal server error"));
    }

});



export default router;