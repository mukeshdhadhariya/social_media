import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
{

    username:{type:String, required:true, unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:''},
    bio:{type:String, default:''},
    gender:{type:String,enum:['male','female']},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]

},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.GenrateToken=function(){
    try {
        return jwt.sign(
            {
                _id:this._id,
                username:this.username,
                email:this.email
            },
                process.env.TOKEN_SECRATE,
            {
                expiresIn:'1d'
            }
        );
    } catch (error) {
        throw new Error("Failed to generate token");
    }
}

export const User = mongoose.model('User', userSchema);