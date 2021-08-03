const express = require("express");
const Post = require("./models/post")
const mongoose = require("mongoose")


const app = express();
//rDP1vbZsWmGZsM3D meanStackAdmin

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(
    'mongodb+srv://meanStackAdmin:rDP1vbZsWmGZsM3D@meanstackcluster.pxcqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
     { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database')
  })
  .catch(() => {
    console.log('Connection Failed')
  })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post added successfully",
      postId: result._id
    });
  })
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Fetch was successful',
      posts: posts
    })
  })
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({ message: "Post has been deleted"})
  })
})

module.exports = app;

