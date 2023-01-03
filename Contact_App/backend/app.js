// Configure the dotenv
import dotenv from 'dotenv';
dotenv.config()

// importing packages
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
// import Routes
import userRoute from './routes/userRoute.js'
import contactRoute from './routes/contactRoute.js'

// Database connections
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB)
.then(()=>console.log("DB connected successfuly"))
.catch((err)=>console.log(err))


// intialize the middlewere
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(cors())

// Routes
app.use("/api/user", userRoute)
app.use("/api/contact",contactRoute)

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server is running at ${port}`))