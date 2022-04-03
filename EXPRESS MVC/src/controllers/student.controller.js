const express = require("express");

const Student = require("../models/student.models");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const student = await Student.find().lean().exec();

    return res.status(200).send({ students: student });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).send({ students: student });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
