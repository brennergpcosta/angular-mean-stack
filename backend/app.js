const express = require("express");
const mongoose = require("mongoose")

const postsRoutes = require('./routes/posts')


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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes)

module.exports = app;

