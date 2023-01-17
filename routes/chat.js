const express = require('express');
const router = express.Router();

const con = require('../db/dbconnect');
const cookieParser = require('cookie-parser');

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cookieParser());


router.get('/:id',(req,res)=>{
    const roomId = req.params.id;
    con.query("SELECT * FROM message WHERE roomid = ?",[roomId],(error,rows,results)=>{
        if (error) throw error;
        res.render('chat.ejs',
        {
            roomId: roomId,
            messages : rows
        });
    });
});

router.post('/:id/sendMsg',(req,res)=>{
    const msg = req.body.userMsg;
    const roomId = req.params.id;
    const userId = req.cookies.userId;
    con.query("INSERT INTO message (roomid,userid,date,message) VALUES (?,?,NOW(),?)",[roomId,userId,msg],(error,rows,results)=>{
        if(error) throw error;
        else{
            res.redirect('/chat/' + roomId);
        }
    });
});

module.exports = router;