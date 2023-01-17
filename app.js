const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const userHandler = require("./controllers/userHandler");
const onConnection = (socket) => {userHandler(io, socket);}

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

server.listen(process.env.PORT || 8080,()=>{
    console.log(`server is running on the ${process.env.PORT|| 8080} port...`);
});

io.on("connection", onConnection);

const home = require('./routes/index.js');
const login = require('./routes/login.js');
const main = require('./routes/main.js');
const signup = require('./routes/signup.js');
const chat = require('./routes/chat.js');


app.use(express.static(__dirname + '/public'));
app.use('/',home);
app.use('/login',login);
app.use('/main',main);
app.use('/signup',signup);
app.use('/chat',chat);