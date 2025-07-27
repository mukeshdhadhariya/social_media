import { createSlice } from "@reduxjs/toolkit";

const rtnSlice=createSlice({
    name:'rtn',
    initialState:{
        likenotification:[],
        follownotification:[]
    },
    reducers:{
        setLikenotification:(state,action)=>{
            if(action.payload.type==='like'){
                state.likenotification.push(action.payload)
            }else if(action.payload.type==='dislike'){
                state.likenotification=state.likenotification.filter((item)=>item.userId!==action.payload.userId)
            }
        },
        setFollownotification:(state,action)=>{
            if(action.payload.type==='unfollow'){
                state.follownotification.push(action.payload)
            }else if(action.payload.type==='follow'){
                state.follownotification=state.follownotification.filter((item)=>item.senderId!==action.payload.senderId)
            }
        }
    }
})

export const {setLikenotification,setFollownotification}=rtnSlice.actions
export default rtnSlice.reducer