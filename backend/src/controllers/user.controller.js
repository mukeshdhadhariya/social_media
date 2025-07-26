import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {ApiResponce} from "../utils/ApiResponce.js"
import bcrypt from "bcryptjs"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import getDataUrl  from "../utils/getDataUrl.js";
import { Post } from "../models/post.model.js";


export const register=async(req,res)=>{
   try {
   
    
     const {username,email,password}=req.body;
     

     if ([username, email, password].some((field) =>field.trim() === "")) {
        throw new ApiError(401, "Some Value is Missing");
      }
  
      const existUser = await User.findOne({email});
  
      if (existUser) {
        throw new ApiError(500, "User already exists");
      }

      const createdUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
      });
  
      const createuser = await User.findById(createdUser._id).select("-password");
  
      if (!createuser) {
        throw new ApiError(401, "User creation failed");
      }

     return res
     .status(201)
     .json(
        new ApiResponce(201,createuser,"user created successfully")
     )

   }catch (error) {
    console.log("Register error:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }

}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
    
        if(!email || !password){
            throw new ApiError(401,"some fields is missing")
        }

        let user=await User.findOne({email})

        if(!user){
            throw new ApiError(401,"User does not exist")
        }

        const isPaswordCorrect=await bcrypt.compare(password,user.password)

        if(!isPaswordCorrect){
            throw new ApiError(401,"password incorrect")
        }

        const token=user.GenrateToken();

        const populatedPosts = await Promise.all(
            user.posts.map( async (postId) => {
                const post = await Post.findById(postId);
                // if(post.author.equals(user._id)){
                //     return post;
                // }
                return post;
            })
        )

        const bookmarksp=await Promise.all(
            user.bookmarks.map(async(postid)=>{
                const post = await Post.findById(postid);
                return post;
            })
        )
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts,
            bookmarks:bookmarksp
        }
        

        const options={
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:1*24*60*60*1000
        }

        return res
        .status(200)
        .cookie("token",token,options)
        .json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        });



    } catch (error) {
        console.log("login fail : ",error);
    }


}

export const logout=async(req,res)=>{
    try {
        const options={
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:0
        }
        return res
        .status(200)
        .clearCookie("token",options)
        .json(
            new ApiResponce(200,{},"logout successfully")
        )
    } catch (error) {
        throw new ApiError(401,"logout error")
    }
}

export const GetProfile=async(req,res)=>{
    try {
        const userid=req.params.id
        const user=await User.findById(userid).populate({path:'posts',createdAt:-1}).populate('bookmarks');
        return res
        .status(200)
        .json({
            success:true,
            user
        })
    } catch (error) {
        throw new ApiError(401,"Profile does not find")
    }
}

export const editprofile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            cloudResponse = await uploadOnCloudinary(profilePicture);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };

        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};

export const getSuggestedUser=async(req,res)=>{
    try {
        const suggestedUser=await User.find({_id:{$ne:req.id}}).select("-password")
        if(!suggestedUser){
            throw new ApiError(401,"SuggestedUser not find")
        }
        return res.status(200).json({
            success: true,
            users: suggestedUser
        })

    } catch (error) {
        throw new ApiError(401,"getSuggestedUser not find")
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // patel
        const jiskoFollowKrunga = req.params.id; // shivani
        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}
