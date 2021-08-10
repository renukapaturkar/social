import React from 'react'
import { useSelector } from 'react-redux'
import {useParams, Link} from 'react-router-dom';


export const SinglePostPage = () => {
    const {id} = useParams()

    const post = useSelector(state =>
        state.posts.find(post => post.id === id))

    if(!post){
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return(
        <div>
            <article className="p-4 m-4 shadow-sm" key={post.id}>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} >
                <button className="border p-2 rounded-lg bg-gray-800 text-white m-2">Edit post</button> 
                </Link>
            </article>
        </div>
    )
}