import { createSlice } from "@reduxjs/toolkit";

const rtnSlice=createSlice({
    name:'rtn',
    initialState:{
        likenotification:[]
    },
    reducers:{
        setLikenotification:(state,action)=>{
            if(action.payload.type==='like'){
                state.likenotification.push(action.payload)
            }else if(action.payload.type==='dislike'){
                state.likenotification=state.likenotification.filter((item)=>item.userId!==action.payload.userId)
            }
        }
    }
})

export const {setLikenotification}=rtnSlice.actions
export default rtnSlice.reducer