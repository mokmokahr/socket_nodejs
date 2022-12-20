const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen('3000',()=>{
    console.log("server is running on the 3000 port...");
});

const home = require('./routes/index.js');
const login = require('./routes/login.js');
const main = require('./routes/main.js');
const signup = require('./routes/signup.js');


app.use(express.static(__dirname + '/public'));
app.use('/',home);
app.use('/login',login);
app.use('/main',main);
app.use('/signup',signup);