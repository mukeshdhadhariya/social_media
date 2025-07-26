import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        suggestedusers:[],
        userprofile:null,
        selectedUser:null,
        
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
        setselectedUser:(state,action) => {
            state.selectedUser = action.payload;
        },
        logout: (state) => {
          state.user = null;
        }
    }
})

export const {setAuthUser,logout,setsuggestedusers,setuserprofile,setselectedUser}=authSlice.actions
export default authSlice.reducer