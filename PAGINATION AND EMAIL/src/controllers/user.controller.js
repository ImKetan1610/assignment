const path = require("path");

const express = require("express");

const transporter = require("../configs/mail");

const User = require("../models/user.model");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10;

    const skip = (page - 1) * pagesize;

    const user = await User.find()
      .skip(skip) // 30
      .limit(pagesize) // 31 - 60
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ user, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>',
      to: user.sellerEmail, 
      subject: "Your user is successfully registerd",
      text: "Hello sir/madam  user is successfully registered",
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../mailers/user-created.mail.html"),
        },
        {
          filename: "user.txt",
          path: path.join(__dirname, "../mailers/user-details.txt"),
        },
      ],
    });

    return res.status(201).send({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
