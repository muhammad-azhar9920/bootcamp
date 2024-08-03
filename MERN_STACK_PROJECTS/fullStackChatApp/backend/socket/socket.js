import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

// add receiver id into userSocketMap and return
export const getSocketReceiverId=(receiverId)=>{
    return userSocketMap[receiverId];
}

// it will store userId:socketId with key value pairs
const userSocketMap = {}

io.on("connection",(socket)=>{
    console.log("user connected ", socket.id);

    // get userId from frontend
    const userId = socket.handshake.query.userId;
    if(userId !== 'undefined'){
        userSocketMap[userId] = socket.id;
    }

    // send to all (onlineUsers)
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("user disconnected ", socket.id);
        delete userSocketMap[userId]
    // (UPDATE IF someone disconnect) send to all (onlineUsers)
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {app, server, io}