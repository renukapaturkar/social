import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1', content: 'This is my first post in socials,I am creating this with redux'
    }, 
    {
        id: '2', content: 'Redux is fun, Awesome documentation very begineer friendly!'
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action){
            state.push(action.payload)
        },
        postUpdated(state, action) {
            const {id, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            if(existingPost){
                existingPost.content = content
            }
        }
    }
})

export const {postAdded, postUpdated} = postsSlice.actions
export default postsSlice.reducer