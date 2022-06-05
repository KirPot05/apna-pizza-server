import express, { urlencoded, json } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import ingredientRoutes from './routes/ingredients.js';
import orderRoutes from './routes/orders.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());



app.get("/", (req, res) => {
    res.send("Nothing found here");
});



app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/order', orderRoutes);



app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});