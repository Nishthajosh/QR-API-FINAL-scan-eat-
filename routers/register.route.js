const router=require('express').Router();
const register=require('../models/register');
router.route('/').get((req,res)=>{
    register.find()
    .then((user)=>res.json(user))
    .catch((err)=>res.json("Error"+err))
})

router.route('/add').post(async(req,res)=>{
    const username=req.body.username;
  

    try{
        const olduser= await register.findOne({email});
        if(olduser){
            return(res.send({error:"User exists"}))
        }
        const newuser=new register({
            username
        })
        
        
        newuser.save()
        .then(()=>res.send({status:"ok"}))
        .catch((err)=>{res.send({status:"error in saving"})
    })
    }
    
    catch(err){
res.send({status:"error"})
    }

})

module.exports=router;