const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Register=new Schema({
    username:String
    
    
})

const Regis=mongoose.model('Regis',Register);

module.exports=Regis;