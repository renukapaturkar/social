import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPostFeed = createAsyncThunk('posts/feed', async () => {
  try {
    const { data } = await axios.get(
      'https://socials-api-server-1.renukapaturkar.repl.co/posts/userfeed'
    )
    return data.post
  } catch (error) {
    console.log(error)
  }
})

export const getUsersPosts = createAsyncThunk(
  'posts/getUsersPosts',
  async (userId) => {
    try {
      const response = await axios.get(
        `https://socials-api-server-1.renukapaturkar.repl.co/posts/${userId}/userposts`
      )
      return response.data.posts
    } catch (error) {
      console.log(error.response, 'This is get USERPOST ERROR')
    }
  }
)

export const postComment = createAsyncThunk(
  'posts/postComment',
  async ({ postId, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://socials-api-server-1.renukapaturkar.repl.co/posts/${postId}/comment`,
        { comment }
      )
      console.log(response, 'this is comment response')
      return fulfillWithValue(response.data.post)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ content, image }, { fulfillWithValue, rejectWithValue }) => {
    let PostData = {
      content: content,
    }

    let formData
    if (image) {
      formData = new FormData()
      const fileName = Date().now + image.name
      formData.append('image', image)
      formData.append('name', fileName)
      console.log(formData, 'this is formData')
      try {
        const response = await axios.post(
          'https://socials-api-server-1.renukapaturkar.repl.co/images/upload',
          formData
        )
        if (response.status === 201) {
          PostData.image = response.data.url
        }
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const response = await axios.post(
        'https://socials-api-server-1.renukapaturkar.repl.co/posts/newpost',
        PostData
      )
      console.log(response.data.data, "response.data.data.data")
      return fulfillWithValue(response.data.data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const likePost = createAsyncThunk(
  'posts/like',
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://socials-api-server-1.renukapaturkar.repl.co/posts/${postId}/like`
      )
      if (response.status === 200) {
        return fulfillWithValue(response.data.post)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getPost = createAsyncThunk(
  'posts/getPost',
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://socials-api-server-1.renukapaturkar.repl.co/posts/${postId}`
      )
      if (response.status === 200) {
        return fulfillWithValue(response.data.post)
      }
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    singlePost: "",
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getPostFeed.pending]: (state) => {
      state.status = 'pending'
    },
    [getPostFeed.fulfilled]: (state, action) => {
      state.status = 'success'
      state.posts = action.payload
    },

    [createPost.pending]: (state) => {
      state.status = 'pending'
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.posts.push(action.payload)
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'pending'
      state.error = action.error
    },
    [getUsersPosts.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getUsersPosts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.posts = action.payload
    },
    [getUsersPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [likePost.pending]: (state, action) => {
      state.status = 'pending'
    },
    [likePost.fulfilled]: (state, action) => {
      state.status = 'success'
      const Likedpost = state.posts.findIndex(
        (post) => post._id === action.payload._id
      )
      state.posts.splice(Likedpost, 1, action.payload)
    },
    [likePost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [getPost.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getPost.fulfilled]: (state, action) => {
      state.status = 'success'
      state.singlePost = action.payload
    },
    [getPost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [postComment.pending]: (state, action) => {
      state.status = 'pending'
    },
    [postComment.fulfilled]: (state, action) => {
      console.log(action.payload, "action.payload")
      state.status = 'success'
      state.singlePost = action.payload
    },
    [postComment.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
  },
})

export default postsSlice.reducer
