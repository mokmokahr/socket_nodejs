module.exports = (io, socket) => {
    socket.on("sendMsg", (data)=>{
        console.log(data);
    });
}