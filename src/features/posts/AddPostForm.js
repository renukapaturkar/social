import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IoImageOutline } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'
import { createPost } from './postsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddPostForm = () => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const checkContent = Boolean(content) || Boolean(image)

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
      const result = await dispatch(createPost({ content, image }))
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
    <div className="flex flex-col w-full md:max-w-lg shadow-md items-center p-8 m-6 bg-white">
      <form className=" flex flex-col w-full p-1 md:max-w-lg h-32">
        <textarea
          className="w-full h-32 md:max-w-lg border bg-gray-200 rounded-sm px-2 justify-center"
          id="postContent"
          name="postContent"
          placeholder="What's on your mind?"
          value={content}
          onChange={onContentHandler}
        />
        <div className="flex justify-between">
          <div className="flex">
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
                className="m-2.5 text-2xl cursor-pointer text-gray-500"
                onClick={removeImage}
                title="Remove image"
              />
            )}
          </div>
          <div>
            <button
              className="border p-1 rounded-lg bg-purple-500 w-20 text-white m-2 justify-end"
              type="button"
              disabled={!checkContent}
              onClick={createPostHandler}
            >
              {status==="pending"? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
