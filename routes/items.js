const express=require('express'),router=express.Router(),Item=require('../models/Item');
router.get('/',async(_,res)=>{res.json(await Item.find())});
router.post('/',async(req,res)=>{const item=new Item(req.body);await item.save();res.json({message:'Item listed'});});
module.exports=router;