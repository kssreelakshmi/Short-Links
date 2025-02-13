import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
  name: null,
  profile_pic : null,  
  isAuthenticated: false, 
  isAdmin: false,
}

const  UserSlice= createSlice({
  name: 'user_authentication',
  initialState,
  reducers: {
    set_user_authentication: (state, action) => {
      state.name = action.payload.name
      state.profile_pic = action.payload.profile_pic
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.isAdmin;
    },
  },
})

export const { set_user_authentication} = UserSlice.actions
export default UserSlice.reducer