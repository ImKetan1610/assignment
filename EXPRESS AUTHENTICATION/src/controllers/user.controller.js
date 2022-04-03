const express = require("express");

const User = require("../models/user.model");

const router = express.Router();

router.post("", async(req,res)=>{
    try{
        const user = await User.create(req.body);
        return res.status(201).send({user:user})   
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
})


router.get("", async(req,res)=>{
    try{
        const user = await User.find().lean().exec();
        return res.status(200).send({user:user})   
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
})

module.exports = router;