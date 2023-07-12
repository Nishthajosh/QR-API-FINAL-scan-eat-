const router = require("express").Router();
let signup = require("../models/signup");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hbcdui48u83uio@#%G89hcdkld9cmddmopecklllm37huhujknjkcnuidndnk78$h";

router.route("/add").post(async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await signup.findOne({ email });

    if (!user) {
      return res.json({ status: "user not found" });
    } 
    else {
      if (password === user.password) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        if (res.status(201)) {
          return res.json({ status: "ok" ,data:token});
        } else {
          return res.json({ error: "there is an error" });
        }
      } else {
        res.json({ status: "Invalid password", error: "Invalid password" });
      }
    }
  } 
  
  catch (err) {
    res.send({ status: "error" });
  }
});

router.route('/userdata').post(async(req,res)=>{
    const {token}=req.body;

    try{
       const user=jwt.verify(token,JWT_SECRET);
       const useremail=user.email;

      await signup.findOne({email:useremail})
       .then((data)=>{
        res.send({status:"ok",data:data})
       })
       .catch((err)=>{
        res.send({status:"error",data:err})
       })
    }

    catch{
      res.send({status:"error"})
    }
})

// router.route('/logout').get(async(req,res)=>{
//  try{
//   const token=req.cookies.jwt;
//   const verifyUser=jwt.verify(token,JWT_SECRET);
//   const user=await signup.findOne({email:verifyUser})
  
//   req.token=token;
//   req.user=user;
//   next();
//  }
//  catch(err){
// res.status(401).send(err);
//  }
// })


module.exports = router;
