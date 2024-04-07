import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import foodRouter from './Routers/food.router.js';
import userRouter from './Routers/user.router.js';
import uploadRouter from './Routers/upload.router.js';
import orderRouter from './Routers/order.router.js';

import { dataconnect } from "./config/database.config.js";
dataconnect();

const app = express();
app.use(express.json());

app.use(cors({credentials: true, origin: ['http://localhost:3000']
}));

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Listenting to "+PORT)
} );

