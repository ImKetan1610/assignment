const express = require("express");

const Evaluation = require("../models/evaluation.model");

const router = express.Router();

router.get("", async (req,res) => {
    try{
        const evaluation = await Evaluation.find().lean().exec();
        return res.status(200).send({evaluation : evaluation})
    } catch(error){
        return res.status(500).send({error: error.message})
    }
})


router.post("", async (req,res) => {
    try{
        const evaluation = await Evaluation.create();
        return res.status(201).send({evaluation : evaluation})
    } catch(error){
        return res.status(500).send({error: error.message})
    }
})

module.exports = router;