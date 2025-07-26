import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import {Comment} from "../models/comment.model.js"
import mongoose from "mongoose"
import { getReceiverSocketId, io } from "../socket/socket.js"


export const addnewPost=async(req,res)=>{
    try {
        const {caption}=req.body
        const image=req.file
        const authorId=req.id

        if(!image){
            throw new ApiError(500,"image is required")
        }

        const cloudresponce=await uploadOnCloudinary(image)

        const post=await Post.create({
            caption,
            image:cloudresponce.secure_url,
            author:authorId
        })

        const user=await User.findById(authorId)

        if(user){
            user.posts.push(post._id)
            await user.save()
        }

        await post.populate({path:'author',select:'-password'})

        return res.status(200).json(
            new ApiResponce(200,post,"post creaded successfully")
        )


    } catch (error) {
        throw new ApiError(401,"Post error")
    }
}

export const getAllPost=async(req,res)=>{
    try {
        const posts=await Post.find().sort({createdAt:-1})
        .populate({path:'author',select:'username profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username profilePicture'
            }
        })

        return res.status(200)
        .json(
            new ApiResponce(200,posts," get all post ")
        )
    } catch (error) {
        throw new ApiError(401,"get all post error")
    }
}

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id; 
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await post.save();

        // implement socket io for real time notification
        const user=await User.findById(likeKrneWalaUserKiId).select("username profilePicture")
        const PostOwnerId=post.author.toString()
        if(likeKrneWalaUserKiId!==PostOwnerId){
            const notification={
                type:'like',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'your post was liked'
            }
            const PostOwnerSocketId=getReceiverSocketId(PostOwnerId)
            io.to(PostOwnerSocketId).emit('notification',notification)

        }

        return res.status(200).json({message:'Post liked', success:true});
    } catch (error) {

    }
}

export const dislikePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await post.save();

        // implement socket io for real time notification
        const user=await User.findById(likeKrneWalaUserKiId).select("username profilePicture")
        const PostOwnerId=post.author.toString()
        if(likeKrneWalaUserKiId!==PostOwnerId){
            const notification={
                type:'dislike',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'your post was disliked'
            }
            const PostOwnerSocketId=getReceiverSocketId(PostOwnerId)
            io.to(PostOwnerSocketId).emit('notification',notification)

        }

        return res.status(200).json({message:'Post disliked', success:true});
    } catch (error) {

    }
}

export const addComment = async (req,res) =>{
    try {
        const postId = req.params.id;
        const commentKrneWalaUserKiId = req.id;

        const {text} = req.body;

        const post = await Post.findById(postId);

        if(!text) return res.status(400).json({message:'text is required', success:false});

        const comment = await Comment.create({
            text,
            author:commentKrneWalaUserKiId,
            post:postId
        })

        await comment.populate({
            path:'author',
            select:"username profilePicture"
        });
        
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment Added',
            comment,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCommentsOfPost = async (req,res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

        return res.status(200).json({success:true,comments});

    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});
        
        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
           
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});

        }else{
            
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
        }

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id?.trim();
        const authorId = req.id;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid Post ID', success: false });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        if (post.author.toString() !== authorId.toString()) {
            return res.status(403).json({ message: 'Unauthorized', success: false });
        }

        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            success: true,
            message: 'Post deleted',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};


