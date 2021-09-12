import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersPosts } from '../posts/postsSlice'
import { PostBody } from '../posts/PostsBody'

export const UsersPosts = ({ user }) => {
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && user._id) {
      ;(async () => {
        try {
          setStatus('pending')
          const result = await dispatch(getUsersPosts(user?._id))
          unwrapResult(result)
          setStatus('success')
        } catch (error) {
          console.log(error, 'error from users posts')
          console.log('something went wrong!')
          setStatus('idle')
        }
      })()
    }
  }, [dispatch, token, user._id])


  const orderedUserPosts = posts?.slice().sort((a,b) => b.createdAt.localeCompare(a.createdAt))


  const renderUsersPosts =
    posts.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No posts yet!</p>
      </div>
    ) : (

        React.Children.toArray(orderedUserPosts?.map((post) => <PostBody post={post} />))


      
    )

  return (
    <div className="flex flex-col items-center">
      {status === 'pending' && 'Loading'}
      {status === 'success' && renderUsersPosts}
    </div>
  )
}
