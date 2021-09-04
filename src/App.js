import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Route,
  Routes,
} from 'react-router-dom'


import { Navbar } from './app/Navbar'
import { Login } from './features/auth/Login'
import { Signup } from './features/auth/Signup'
import { EditPostForm } from './features/posts/EditPostForm'
import {PostsList} from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { PrivateRoute } from './features/PrivateRoute'
import { UserDetails } from './features/users/UserDetails'
import {setData} from './features/auth/authSlice'
import { setupAuthHeaderForServiceCalls } from './features/auth/utils/utils'
import { EditProfile } from './features/users/EditProfile'
const token = JSON.parse(localStorage.getItem("token"));
const userData = JSON.parse(localStorage.getItem("userData"))


function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.users)
  console.log(user, "user from app.js")
  useEffect(()=> {
    if(token){

      dispatch(setData({token, userData}))
      setupAuthHeaderForServiceCalls(token)
    }

    
  }, [dispatch])
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <PrivateRoute path="/" element={<PostsList/>}/>
        <PrivateRoute path='/:username' element={<UserDetails/>}/>
        <PrivateRoute path="/:username/editprofile" element={<EditProfile user={user}/>}/>
        <Route path="/posts/:id" element={<SinglePostPage/>}/>
        <Route path="/editPost/:id" element={<EditPostForm/>}/>
      </Routes>
    </div>
  )
}

export default App
