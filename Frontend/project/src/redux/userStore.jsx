import { configureStore } from '@reduxjs/toolkit'
import UserSliceReducer from './user/userSlice'
// import rootReducer from './reducers'

export const userStore = configureStore({ 
    reducer: {
        authenticate_user : UserSliceReducer,
    }
 })
 
// The store now has redux-thunk added and the Redux DevTools Extension is turned on