const express = require("express");
const app = express();
const Post = require("./models/post")
const mongoose = require("mongoose")

//rDP1vbZsWmGZsM3D meanStackAdmin

express.json()
express.urlencoded()

mongoose.connect('mongodb+srv://meanStackAdmin:rDP1vbZsWmGZsM3D@meanstackcluster.pxcqh.mongodb.net/note-angular?retryWrites=true&w=majority')
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
    content: req.body.content
  });
  post.save()
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  posts = [
    {
      id: "asdfsafd1",
      title: 'This is the first title',
      content: 'And this is the first content'
    },
    {
      id: "asdfsafd2",
      title: 'This is the second title',
      content: 'And this is the second content'
    },
    {
      id: "asdfsafd3",
      title: 'This is the third title',
      content: 'And this is the third content'
    },
  ]

  res.status(200).json({
    message: "All posts fechted successfully",
    posts: posts
  })
})

module.exports = app

