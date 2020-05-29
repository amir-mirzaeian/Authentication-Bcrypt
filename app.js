require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
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

app.get('/',(req,res) => {
    res.render('home');
});
app.get('/register',(req,res) =>{
    res.render('register');
});
app.get('/login', (req,res) =>{
    res.render('login');
})

app.post('/register',(req,res) =>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save();
        res.send("The new account is created.");
    });

});

app.post('/login', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email : username}, (err, foundUser)=>{
        if (err) console.log(err);
        else
            if (foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (result === true){
                        res.render('secrets');
                    };
                });
            }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});