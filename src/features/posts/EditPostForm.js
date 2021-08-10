import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


import {postUpdated} from './postsSlice'

export const EditPostForm = () => {
    const {id} = useParams()

   
    const post = useSelector(state=> 
        state.posts.find(post=> post.id === id)
    )

    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onContentHandler = e => setContent(e.target.value)

    const onSaveChangesClicked = () => {
        if(content){
            dispatch(postUpdated({id: id, content}))
            navigate(`/posts/${id}`)
        }
    }

    return(
        <section>
            <h2 className="text-center font-semibold p-2">Edit the Post</h2>
            <form className="flex flex-col w-32 h-72 md:h-72 md:w-32 p-4">
                <textarea  
                className="w-80 h-72 md:h-72 md:w-80 border"
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentHandler}/>
                <button  className="border p-2 w-64 rounded-lg bg-gray-800 text-white m-4 align-center" onClick={onSaveChangesClicked}>Save changes</button>
            </form>
        </section>
    )
}
