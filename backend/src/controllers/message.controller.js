import { ApiError } from "../utils/ApiError.js"
import {Conversation} from "../models/conversation.model.js"
import {Message} from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage=async(req,res)=>{
    try {
        const senderId=req.id
        const receiverId = req.params.id;
        const {textMessage:message}=req.body


        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()])


        // some thing
        const receiverSocketId=getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        return res.status(201).json({
            success:true,
            newMessage
        })

    } catch (error) {
        throw new ApiError(401,"send meaagse error")
    }
}

export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}