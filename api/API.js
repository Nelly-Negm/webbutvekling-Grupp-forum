const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { postAddedEmail } = require("../services/EmailService");

router.post("/newpost", (req, res) => { //The code that makes it possible to create a new post. 
  //If succesfully created, a "succes-message" will be create. Otherwise a "error-message" will be create. 
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
      postAddedEmail(req.body) 
      res.status(201).json({
        message: { msgBody: "<h3>Post successfully created</h3>", 
        msgError: false },
      });
    }
  });
});

router.get("/getposts", (req, res) => { //The code that makes it possible to render out the posts from the databas.
  //If error a "error-message" will be create. 
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

router.put("/updatepost/:id", (req, res) => { //The code that makes it possible to update the title and message on your post depending on its id.
  //If succesfully updated, a "succes-message" will be create. Otherwise a "error-message" will be create. 
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

router.delete("/deletepost/:id", (req, res) => { //The code that makes it possible to delete a post depending on its id.
  //If succesfully deleted, a "succes-message" will be create. Otherwise a "error-message" will be create. 
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
