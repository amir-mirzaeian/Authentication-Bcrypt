# Authentication-DatabseEncryption
using bcrypt to secure the password

## Description:
A very simple login/registration page with hashing the password by the help of 'bcrypt' npm package.

## Technology used in the project
Database: Mongodb  
programming language: Node Js  

## Server Staring code
```
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//create a database
mongoose.connect('mongodb://localhost:27017/userDB',{ useNewUrlParser: true, useUnifiedTopology: true  });
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


const User = mongoose.model('User', userSchema);

//TODO

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

```

