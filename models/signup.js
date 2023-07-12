const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Signup=new Schema({
    username:String,
    email:String,
    password:String,
    phone:Number,
    city:String
    
})

const Sign=mongoose.model('Sign',Signup);

module.exports=Sign;