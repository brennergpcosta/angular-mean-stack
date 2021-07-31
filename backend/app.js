const express = require("express");

const app = express();

express.json()
express.urlencoded()

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
  const post = req.body;
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

