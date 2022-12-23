const express = require('express');
const con = require('../db/dbconnect');
const router = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const isSaveInfo = false;``

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cookieParser());

router.get('/', (req, res)=> {
    res.render('login.ejs');
});

router.post('/logout',(req,res)=>{
    res.cookie('logined',false);
    res.redirect('/');
    console.log("logout");
})

router.post('/check', (req, res)=> {
    let id = req.body.id;
    let pw = req.body.pw;
    //let isSaveInfo = req.body.saveInfo;     
    //console.log(isSaveInfo);
    if(pw && id){
        con.query("SELECT * FROM login WHERE userid = ? AND userpw = ?",[id,pw],(error,rows,results)=>{
            if (error) throw error;
            if(rows.length>0){
                res.cookie('logined',true);
                res.redirect('/main');
                console.log("login succeed");
            }
            else{
                console.log("you failed to login");
                res.redirect('/login');
            }
        });
    }
    else{
        console.log(id);
    }
});


//dev mode
router.get('/dev',(req,res)=>{
    res.clearCookie('logined');
    res.redirect('/');
});

module.exports = router;