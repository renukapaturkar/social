import {configureStore} from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'


export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer, 
    auth: authReducer
  }
})