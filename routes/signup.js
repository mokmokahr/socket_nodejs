const express = require('express');
const router = express.Router();
const con = require('../db/dbconnect');

router.use(express.urlencoded({extended:false}));
router.use(express.json());

router.get('/', (req, res)=> {
    res.render('signup.ejs');
});

router.post('/register', (req, res)=> {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const realname = req.body.name;
    const checkPw= req.body.check_pw;
    if(checkPw == pw){
        con.query("INSERT INTO login (userid,userpw,date,nickname,name) VALUES (?,?,NOW(),?,?)",[id,pw,nickname,realname],(error,rows,results)=>{
            if(error) throw error;
            else{
                res.redirect('/login');
            }
        });
    }
    else{
        console.log('you should check your password');
        res.redirect('/signup')
    }
});


module.exports = router;