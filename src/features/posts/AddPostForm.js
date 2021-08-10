import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {nanoid} from '@reduxjs/toolkit'
import {postAdded} from './postsSlice'



export const AddPostForm = () => {
    const [content , setContent] = useState('')

    const dispatch = useDispatch()

    const onContentHandler = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if(content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    content
                })
            )
            setContent('')
        }
    }


    return(
        <section>
            <div className="flex flex-col shadow-sm m-4 content-center">
            <form className=" flex flex-col w-32 h-32 md:h-40 md:w-32">
                <textarea className="w-80 md:w-80 border"
                id="postContent"
                name="postContent"
                placeholder="What's on your mind?"
                value={content}
                onChange={onContentHandler}/>
                 <button className="border p-2 rounded-lg bg-gray-800 text-white m-2" type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>

            </div>

        </section>
    )
}