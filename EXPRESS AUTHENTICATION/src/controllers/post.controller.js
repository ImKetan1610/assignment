const express = require("express");

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  req.body.userId = req.userID;
  try {
    const post = await Post.create(req.body);
    return res.status(201).send({ post: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const post = await Post.find().lean().exec();
    return res.status(200).send({ post: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  req.body.userId = req.userID;
  try {
    const post = await Post.findById(req.params.id).lean().exec();
    return res.status(200).send({ post: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  req.body.userId = req.userID;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body)
      .lean()
      .exec();
    return res.status(200).send({ post: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  req.body.userId = req.userID;
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ post: post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
