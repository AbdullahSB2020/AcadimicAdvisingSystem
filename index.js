const result = require('dotenv').config();

if (!result.error) {
    console.log();
    console.log(result.parsed);
}

// Development Environment
if (process.env.NODE_ENV === 'development') {
    console.log('we are in the development..!')
}

// libraries
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

// route imports 
const postsRoute = require('./routes/posts');

// initalizing the app
const app = express();
const PORT = process.env.PORT | 5000;

// connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// check if connection open successfully
mongoose.connection
    .once('open', () => console.log('\n\tconnected to DB\n'));

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/post',postsRoute);

app.listen(PORT, () => console.log(`\n\tapp listens on ${PORT}`));