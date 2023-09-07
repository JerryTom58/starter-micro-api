const express =require('express')
const socket =require('socket.io')
const http = require('http')
const path =require('path')
const {getRoomUsers,userLeave,userJoin} = require('./user.js')
const app = express();
const server = http.createServer(app);

const io = socket(server);


//on接受 emit发送
io.on("connection", (socket) => {
    socket.on("join",({name,room}) =>{
        socket.join(room);

        userJoin(socket.id,name,room)

        io.to(room).emit('roomUsers',getRoomUsers(room));

        socket.emit("sys","欢迎来到Jerry聊天室.Jerry博客:http://43.143.1.84:23698/")
        socket.emit("sysConnect","成功连接至服务器终端!") 
        
        socket.on('chat',message => {
            io.to(room).emit('chat' , message);
            console.log(message)
            console.log("房间："+room)
        })

        socket.on("disconnect", () => {
            userLeave(socket.id)

            io.to(room).emit('roomUsers',getRoomUsers(room));
        })
    
    })

})







app.use(express.static(path.join(__dirname, 'public')));//设置工作目录


const PORT = process.env.PORT || 9527;

server.listen(PORT, ()=>{
    console.log('此服务器运行在'+ PORT +'端口。'+'如果下次服务器错误，请检查'+ PORT +'端口是否被占用！');
})