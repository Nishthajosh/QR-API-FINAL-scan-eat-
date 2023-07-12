const router=require('express').Router();

const signup=require('../models/signup');

router.route('/').get((req,res)=>{
    signup.find()
    .then((user)=>res.json(user))
    .catch((err)=>res.json("Error"+err))
})

router.route('/add').post(async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const phone=req.body.phone;
    const city=req.body.city;

    try{
        const olduser= await signup.findOne({email});
        if(olduser){
            return(res.send({error:"User exists"}))
        }
        const newuser=new signup({
            username,
            email,
            password,
            phone,
            city
        })
        
        
        newuser.save()
        .then(()=>res.send({status:"ok"}))
        .catch((err)=>{res.send({status:"error"})
    })
    }
    
    catch(err){
res.send({status:"error"})
    }

})

module.exports=router;