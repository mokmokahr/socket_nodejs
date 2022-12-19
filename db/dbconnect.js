const express = require('express');
const mysql = require('mysql');
const app = express();
require('dotenv').config()


const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERID,
    password: process.env.USERPW,
    database: process.env.DBNAME
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;