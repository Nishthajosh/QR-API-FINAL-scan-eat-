const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const feedback=new Schema({
    tableid:String
})

const Userfeedback=mongoose.model('Userfeedback',feedback)
module.exports=Userfeedback;