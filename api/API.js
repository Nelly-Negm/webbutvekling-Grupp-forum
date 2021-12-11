const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/newpost", (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    email: req.body.email,
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: '<h3>An error occured while saving post</h3>',
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        message: { msgBody: "<h3>Post successfully created</h3>", 
        msgError: false },
      });
    }
  });
});

router.get("/getposts", (req, res) => {
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "<h3>An error occured while saving post</h3>",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

router.put("/updatepost/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content },
    (err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "<h3>An error occured updating post</h3>",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: { msgBody: "<h3>Post successfully updated</h3>", 
          msgError: false },
        });
      }
    }
  );
});

router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "<h3>An error occured deleting post</h3>",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: { msgBody: "<h3>Post successfully deleted</h3>", 
        msgError: false },
      });
    }
  });
});

module.exports = router;
