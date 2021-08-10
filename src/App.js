import React from 'react'
import {Route,
  Routes,
} from 'react-router-dom'


import { Navbar } from './app/Navbar'
import { EditPostForm } from './features/posts/EditPostForm'
import {PostsList} from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<PostsList/>}/>
        <Route path="/posts/:id" element={<SinglePostPage/>}/>
        <Route path="/editPost/:id" element={<EditPostForm/>}/>
      </Routes>
    </div>
  )
}

export default App
