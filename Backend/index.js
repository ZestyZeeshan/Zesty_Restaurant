import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js"
import { authRouter } from "./controllers/authController.js";
import { auth } from "./middleware/authMiddleware.js";
import cors from "cors";
import user from "./models/user.js";


config();

const  app = express();
// const cors = require('cors');
// app.use(cors({
//     origin: "http://localhost:3000"
// }));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} PORT`));

mongoose.connect(process.env.mongodb)
.then(()=>console.log('Databese is connected'))
.catch((error)=> console.log(error));

app.use(express.json());
app.use('/food', foodRoutes);

app.use(cors());

app.use('/auth',authRouter);

app.use(auth)