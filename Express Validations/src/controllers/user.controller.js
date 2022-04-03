const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send({ users: user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post(
  "",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name is required"),
  body("last_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Last Name is required"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("first_name is required")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
    }),
  body("pincode")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Pincode is required and must be of 6 digits")
    .isLength({ min: 6, max: 6 }),
  body("age")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Age can't be empty")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("Age must be in between 1 to 100");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      
      return res.status(201).send({ users: user });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);
