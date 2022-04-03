const express = require("express");

const Submission = require("../models/submission.model");

const router = express.Router();

router.get("", async (req,res) => {
    try{
        const submission = await Submission.find().lean().exec();
        return res.status(200).send({submission:submission});
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
})

router.post("", async (req,res) => {
    try{
        const submission = await Submission.create();
        return res.status(201).send({submission:submission});
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
})

router.get("/evaluation_gave", async (req, res) => { // to find all students who gave evalution
    try {
        const student = await Submission.find().lean().exec()
        student.map((ele) => {
            if (ele.marks > 0) {
                console.log('ele', ele);
            }
        })
        return res.status(200).send(student)
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
})

let max = 0
router.get("/high_marks", async (req, res) => { // to find all students who gave evalution
    try {
        const student = await Submission.find().lean().exec()
        student.map((ele) => {
           const res = Math.max(ele.marks)
           console.log('res', res);
         if(res > max){
            max = ele.marks
         }
        })
        const students = await Submission.findOne({marks:max}).lean().exec()
        console.log('students', students);
        return res.status(201).send(students)
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router;