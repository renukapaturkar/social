import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPostForm } from './AddPostForm'
import { getPostFeed } from './postsSlice'
import { PostBody } from './PostsBody'

export const PostsList = () => {
  const { posts } = useSelector((state) => state.posts)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')
  console.log(posts)
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus('pending')
          const result = await dispatch(getPostFeed())
          console.log(result, 'FEED RESULTS')
          unwrapResult(result)
          setStatus('success')
        } catch (error) {
          console.log(error)
          setStatus('idle')
        }
      })()
    }
  }, [dispatch, token])

  let renderedPosts

  renderedPosts =
    posts?.length === 0 ? (
      <div>
        <h1 className="p-2 text-purple-500 text-center">No posts found!</h1>
      </div>
    ) : (
      React.Children.toArray(posts?.map((post) => <PostBody post={post} />))
    )

  return (
    <div className="flex flex-col items-center">
      <AddPostForm />
      {status === 'idle' && (
        <p className="text-2xl text-center">No Posts Found!</p>
      )}
      {status === 'success' && renderedPosts}
    </div>
  )
}
