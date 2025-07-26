import { Server } from "socket.io";
import http from 'http'

import express from "express"

const app=express();

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:process.env.SOCKET_ORIGIN,
        methods:['GET','POST']
    }
})

const userSocketmap={}

export const getReceiverSocketId=(receiverId)=>userSocketmap[receiverId]

io.on("connection",(socket)=>{
    const userid=socket.handshake.query.userId

    if(userid){
        userSocketmap[userid]=socket.id
        console.log(`user connected : ${userid} `)
    }

    io.emit('get-onlineuser',Object.keys(userSocketmap));

    socket.on("disconnect",()=>{
        console.log("User disconnected ")
        delete userSocketmap[userid]


        io.emit('get-onlineuser',Object.keys(userSocketmap));

    })

    
})

export {app,server,io}