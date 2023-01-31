const express = require('express');
const router = express.Router();
const con = require('../db/dbconnect');

router.get('/', (req, res)=> {
    con.query("SELECT * FROM room", (err, result, fields) => {
        if (err) throw err;
        res.render('main.ejs',{data:result});
    });
});

module.exports = router;