import {configureStore} from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'
import notificationReducer from '../features/notifications/notificationSlice'


export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer, 
    auth: authReducer, 
    notifications: notificationReducer
  }
})