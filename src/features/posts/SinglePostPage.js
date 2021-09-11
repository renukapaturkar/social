import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { PostBody } from './PostsBody'
import { getPost, postComment } from './postsSlice'
import { IoIosArrowBack } from 'react-icons/io'
import { CommentBody } from './CommentBody'

export const SinglePostPage = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [status, setStatus] = useState('idle')
  const [comment, setComment] = useState('')
  const post = useSelector((state) => state.posts.singlePost)
  console.log(post, 'POSTYTTTTTTTTTTTTTTTTTTTTT')

  const isEmpty = Boolean(comment)

  useEffect(() => {
    if (token) {
      ;(async () => {
        try {
          setStatus('pending')
          const result = await dispatch(getPost(postId))
          unwrapResult(result)
          setStatus('success')
        } catch (error) {
          console.log(error.message)
          setStatus('idle')
        }
      })()
    }
  }, [dispatch, postId, token])

  const handleComment = async (post) => {
    try {
      const result = await dispatch(postComment({ postId: post._id, comment }))
      console.log(result, 'This is result of dispatch for COMMENT')
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const renderPost = status === 'success' && (
    <div className="flex flex-col w-full md:max-w-lg items-center">
      <PostBody post={post} />

      <div className="flex w-full shadow rounded-md my-3">
        <textarea
          autoFocus={true}
          className="flex w-full rounded-lg p-1"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="text-md font-semibold p-2 text-purple-600"
          disabled={!isEmpty}
          onClick={() => handleComment(post)}
        >
          POST
        </button>
      </div>
      <CommentBody comments={post.comments} />
    </div>
  )

  return (
    <>
      <div className="flex flex-col items-center">
        <Link to="/" className="flex text-md justify-self-start">
          <IoIosArrowBack />
          <span>Back</span>
        </Link>
        {renderPost}
      </div>
    </>
  )
}
