// if(process.env.NODE_ENV !== "production"){
//     require('dotenv').config()  //selalu ditulis di awal app.js & di pakai tahap dev
//   }

const express = require('express');
const app = express();
//   const cors = require('cors'); //DISTRIBUTION

// app.use(cors()) // DEPLOY

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(require("./routes"));


module.exports = app;