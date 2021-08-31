import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoImageOutline } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'
import { createPost } from './postsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddPostForm = () => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
  const dispatch = useDispatch()

  const onContentHandler = (e) => setContent(e.target.value)

  const addImage = (e) => {
    setImage(e.target.files[0])
    e.target.value = ''
  }

  const removeImage = () => {
    setImage('')
  }

  const createPostHandler = async () => {
    try {
      setStatus('pending')
      const result = await dispatch(createPost(content, image))
      console.log(result)
      unwrapResult(result)
      setContent('')
      setImage('')
      setStatus('success')
    } catch (error) {
      console.log(error)
      setStatus('idle')
    }
  }

  return (
    <div className="flex flex-col shadow-md m-4 items-center p-2 m-1">
      <form className=" flex flex-col w-80 h-32 md:h-40 md:w-32">
        <textarea
          className="w-80 h-32 md:max-w-full border bg-gray-200 rounded-sm m-2 p-2 justify-center"
          id="postContent"
          name="postContent"
          placeholder="What's on your mind?"
          value={content}
          onChange={onContentHandler}
        />
        <div className="flex justify-between">
          <div>
            <label>
              <IoImageOutline className="text-2xl text-gray-600 m-3" />
              <input
                className="hidden"
                name="image"
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={addImage}
              />
            </label>
            {image && (
              <ImCancelCircle
                className="text-2xl cursor-pointer"
                onClick={removeImage}
                title="Remove image"
              />
            )}
          </div>
          <div>
            <button
              className="border p-1 rounded-lg bg-purple-500 w-20 text-white m-2 justify-end"
              type="button"
              onClick={createPostHandler}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
