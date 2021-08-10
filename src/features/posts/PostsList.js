import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { AddPostForm } from './AddPostForm';


export const PostsList = () => {
    const posts = useSelector(state => state.posts)
    const renderedPosts = posts.map(post => (
        <article className="shadow-sm p-2 m-2" key={post.id}>
            
            <Link to={`/posts/${post.id}`}>
            <p className="post-content">{post.content.substring(0,100)}</p>
            </Link>
            
        </article>
    ))



    return(
        <>
        <AddPostForm/>
        <section className="posts-list">
            <h2>Posts</h2>
            <div>{renderedPosts}</div>
        </section>
        </>
    )
}