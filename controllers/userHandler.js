'use strict'
const con = require("../db/dbconnect");

module.exports = (io, socket) => {
    socket.on("sendMsg", (data)=>{
        const roomId = data.roomid;
        const userId = data.userid;
        const msg = data.msg;
        con.query("SELECT * FROM room", (err, result, fields) => {
            if (err) throw err;
            con.query("INSERT INTO message (roomid,userid,date,message) VALUES (?,?,NOW(),?)",[roomId,userId,msg],(error,rows,results)=>{
                if(error) throw error;
                else{
                    console.log("msg is successfully added");
                }
            });
        });
    });

}