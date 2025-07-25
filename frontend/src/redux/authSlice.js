import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        suggestedusers:[],
        userprofile:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        },
        setsuggestedusers:(state,action)=>{
            state.suggestedusers=action.payload
        },
        setuserprofile:(state,action)=>{
            state.userprofile=action.payload
        },
        logout: (state) => {
          state.user = null;
        }
    }
})

export const {setAuthUser,logout,setsuggestedusers,setuserprofile}=authSlice.actions
export default authSlice.reducer