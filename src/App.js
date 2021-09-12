import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { Login } from './features/auth/Login'
import { Signup } from './features/auth/Signup'
import { EditPostForm } from './features/posts/EditPostForm'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { PrivateRoute } from './features/PrivateRoute'
import { UserDetails } from './features/users/UserDetails'
import { setData } from './features/auth/authSlice'
import { setupAuthHeaderForServiceCalls } from './features/auth/utils/utils'
import { EditProfile } from './features/users/EditProfile'
import { Followers } from './features/users/Followers'
import { Followings } from './features/users/Followings'
import { Notifications } from './features/users/Notifications'
const token = JSON.parse(localStorage.getItem('token'))
const userData = JSON.parse(localStorage.getItem('userData'))

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  useEffect(() => {
    if (token) {
      dispatch(setData({ token, userData }))
      setupAuthHeaderForServiceCalls(token)
    }
  }, [dispatch,token])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/home" element={<PostsList />} />
        <PrivateRoute path="/:username" element={<UserDetails />} />
        

        <PrivateRoute
          path="/:username/editprofile"
          element={<EditProfile user={user} />}
        />
        <PrivateRoute path="/notifications" element={<Notifications />} />
        <PrivateRoute path="/:username/followers" element={<Followers />} />
        <PrivateRoute path="/:username/following" element={<Followings />} />
        <PrivateRoute
          path="/:username/posts/:postId"
          element={<SinglePostPage />}
        />
        <PrivateRoute path="/editPost/:id" element={<EditPostForm />} />
      </Routes>
    </div>
  )
}

export default App
