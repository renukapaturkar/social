import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import axios from 'axios';
import { nanoid } from 'nanoid';

//fetch the data from server using thunks

export const getPostFeed = createAsyncThunk(
    'posts/feed', 
    async() => {
        const {data} = await axios.get('https://socials-api-server-1.renukapaturkar.repl.co/posts/feed')
        console.log(data)
        return data;
    }
    
)

export const createPost = createAsyncThunk(
    'posts/createPost', 
    async({content, image}, {fulfillWithValue, rejectWithValue}) => {
        try {
            const response = axios.post('https://socials-api-server-1.renukapaturkar.repl.co/posts/newpost', {content, image})
            console.log(response, "This is new Post from user")
            return fulfillWithValue(response)

        }catch(error){
            return rejectWithValue(error.response)
        }

    }
)


export const likePost = createAsyncThunk(
    'posts/like',
    async(postId, {fulfillWithValue, rejectWithValue}) => {
        try {
            const response = await axios.post(`https://socials-api-server-1.renukapaturkar.repl.co/posts//:${postId}/like`)
            console.log(response)
            if(response.status === 200){
                return fulfillWithValue(response)
            }
        }catch(error) {
            return rejectWithValue(error)
        }
    }

) 

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [], 
        status: "idle",
        error: null,
    },
    reducers: {}, 
    extraReducers: {
        [getPostFeed.pending]: (state) => {
            state.status = "pending"
          },
          [getPostFeed.fulfilled]: (state, action) => {
            state.status = "success"
            state.posts = action.payload
          },

          [createPost.pending]: (state) => {
              state.status = "pending"

          }, 
          [createPost.fulfilled]: (state, action) => {
              state.status = "fulfilled"
              state.posts.push(action.payload)
          }


    }
})

export default postsSlice.reducer