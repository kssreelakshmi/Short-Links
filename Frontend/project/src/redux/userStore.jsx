import { configureStore } from '@reduxjs/toolkit'
import UserSliceReducer from './user/UserSlice.jsx'

export const userStore = configureStore({ 
    reducer: {
        user_authentication : UserSliceReducer,
    }
 })
 
// The store now has redux-thunk added and the Redux DevTools Extension is turned on