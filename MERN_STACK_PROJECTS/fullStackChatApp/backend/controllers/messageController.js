import {Conversation} from '../models/conversationModel.js';
import {Message} from '../models/messageModel.js';
import { getSocketReceiverId, io } from '../socket/socket.js';

// SEND MESSAGE
export const sendMessage= async (req,res,next)=>{
    try {
        const {message} = req.body;
        const senderId = req.user.id;
        const receiverId = req.params.id;

        // CHECK CONVERSATION EXIST OR NOT
        let gotConversation = await Conversation.findOne({
            participants: {$all: [senderId,receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // SOCKET IO functionality
        const socketReceiverId = getSocketReceiverId(receiverId);
        if(socketReceiverId){
            io.to(socketReceiverId).emit('newMessage',newMessage);
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

// GET MESSAGE
export const getMessage= async (req,res,next)=>{
    try {
        const senderId = req.user.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants : {$all: [senderId,receiverId]}
        }).populate("messages");
        if(!conversation){
            return res.status(200).json([]);
        }
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error)
        next(error)
    }
}