const express = require('express');
const con = require('../db/dbconnect');
const router = express.Router();
const cookieParser = require('cookie-parser');
//res.clearCookie(key); -- 쿠키종료

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cookieParser());

router.get('/', (req, res)=> {
    res.render('login.ejs');
});

router.post('/check', (req, res)=> {
    let id = req.body.id;
    let pw = req.body.pw;
    if(pw && id){
        con.query("SELECT * FROM login WHERE userid = ? AND userpw = ?",[id,pw],(error,rows,results)=>{
            if (error) throw error;
            if(rows.length>0){
                res.cookie('login','1' );
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


module.exports = router;