const express = require("express");

const Batch = require("../models/batch.model")

const router = express.Router();

router.get("", async (req,res)=>{
    try {
        const batch = await Batch.find().lean().exec();

        return res.status(200).send({batch:batch})
    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
})

router.post("", async (req,res)=>{
    try {
        const batch = await Batch.create(req.body);

        return res.status(201).send({batch:batch})
    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
})

module.exports= router;
