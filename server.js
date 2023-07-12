const express= require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const DATABASE_URL=process.env.DATABASE_URL
require('dotenv').config();
const app=express();
app.use(express.json());

app.use(cors());
//PORT
const PORT = process.env.PORT || 8090;

mongoose.connect("mongodb+srv://qrapi:qrapi@cluster0.7flubk9.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log("Error"+err))

const login=require('./routers/login.route');
const signup=require('./routers/signup.route');
const feedback=require('./routers/feedback.route');
const register=require('./routers/register.route');
const qr=require('./routers/qr.route');

//main 
app.use('/qrcode',qr);
app.use('/feedback',feedback);

app.use('/login',login);
app.use('/signup',signup);
app.use('/register',register);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})