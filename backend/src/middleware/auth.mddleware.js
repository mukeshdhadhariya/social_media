import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const jwtVerify=async(req,res,next)=>{
    try {
        const token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedtoken=jwt.verify(token,process.env.TOKEN_SECRATE)
    
        const user=await User.findById(decodedtoken?._id).select(
            "-password"
        )
    
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
    
        req.id=user._id
        next()
    }catch (error) {
        throw new ApiError(401,"invalid accessToken")
    }
}

export {jwtVerify}