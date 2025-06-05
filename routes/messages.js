const express=require('express'),router=express.Router(),Message=require('../models/Message');
router.get('/:user',async(req,res)=>{res.json(await Message.find({to:req.params.user}));});
router.post('/',async(req,res)=>{const m=new Message(req.body);await m.save();res.json({message:'Sent'});});
module.exports=router;