const express = require('express');
const con = require('../db/dbconnect');
const router = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');  //not used
//const isSaveInfo = false;

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cookieParser());

router.get('/', (req, res)=> {
    res.render('login.ejs');
});

router.post('/logout',(req,res)=>{
    res.cookie('logined',false);
    res.redirect('/login');
    console.log("logout");
})

router.post('/check', (req, res)=> {
    let id = req.body.id;
    let pw = req.body.pw;
    //let isSaveInfo = req.body.saveInfo;     
    //console.log(isSaveInfo);
    if(req.cookies.logined == 'true'){
        console.log("you already logined");
        res.redirect('/login');
    }
    else if(pw && id){
        con.query("SELECT * FROM login WHERE userid = ? AND userpw = ?",[id,pw],(error,rows,results)=>{
            if (error) throw error;
            if(rows.length>0){
                res.cookie('logined',true);
                res.cookie('userNickname',rows[0].nickname);
                res.cookie('userId',rows[0].id);
                console.log("login succeed");
                res.redirect('/main');
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