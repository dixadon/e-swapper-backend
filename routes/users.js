const express=require('express'),router=express.Router(),User=require('../models/User'),jwt=require('jsonwebtoken');
router.post('/register',async(req,res)=>{const user=new User(req.body);await user.save();res.json({message:'User created'});});
router.post('/login',async(req,res)=>{const u=await User.findOne({username:req.body.username});if(u&&u.password===req.body.password){const token=jwt.sign({id:u._id},process.env.JWT_SECRET);res.json({token});}else{res.status(401).json({message:'Invalid'});}});
module.exports=router;