const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const login=new Schema({
    email:String,
    password:String
});

const User=mongoose.model('User',login);
module.exports=User;
