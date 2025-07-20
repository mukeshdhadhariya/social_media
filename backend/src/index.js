import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser"
import dotenv from "dotenv";
import { app,server } from "./socket/socket.js";

dotenv.config({
    path:'./.env'
})

app.use(cors({
    origin:process.env.CORS_URL,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieparser())

import connectDB from "./utils/db.js"

import userRouter from "../src/routes/user.route.js"
import postRouter from "../src/routes/post.route.js"
import messageRouter from "../src/routes/message.route.js"

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post", postRouter);
app.use("/api/v1/message", messageRouter);

connectDB()
.then(
    server.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
)
.catch((err)=>{
    console.log("Mongodb connection faield",err);
})