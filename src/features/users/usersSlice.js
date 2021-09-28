import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk(
  'users/getuser',
  async (username, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://socials-api-server-1.renukapaturkar.repl.co/users/${username}`
      )
      return fulfillWithValue(response.data.user)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const getFollowing = createAsyncThunk(
  'users/getfollowings',
  async (username) => {
    try {
      const response = await axios.get(
        `https://socials-api-server-1.renukapaturkar.repl.co/users/${username}/followings`
      )
      console.log(response, 'followings')
      return response.data.followings
    } catch (error) {
      return error.response
    }
  }
)

export const getFollowers = createAsyncThunk(
  'users/getfollowers',
  async (username) => {
    try {
      const response = await axios.get(
        `https://socials-api-server-1.renukapaturkar.repl.co/users/${username}/followers`
      )
      console.log(response, 'followers')
      return response.data.followers
    } catch (error) {
      return error.response
    }
  }
)

export const followUser = createAsyncThunk(
  'users/followuser',
  async (targetUser, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://socials-api-server-1.renukapaturkar.repl.co/users/follow',
        targetUser
      )

      console.log(response.data.user.followers, 'follow user')
      return fulfillWithValue(response.data.user)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const unfollowUser = createAsyncThunk(
  'users/unfollowuser',
  async (targetUser, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://socials-api-server-1.renukapaturkar.repl.co/users/unfollow',
        targetUser
      )
      console.log(response, 'unfollow user')
      return fulfillWithValue(response.data.user)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'users/updateprofile',
  async ({values, image}, { fulfillWithValue, rejectWithValue }) => {

    let data
    if(image) {
      data = new FormData()
      const fileName = Date().now + image.name
      data.append('image', image)
      data.append('name', fileName)
      try{
        const response = await axios.post('https://socials-api-server-1.renukapaturkar.repl.co/images/upload', data)
        if(response.status === 200){
          values.profilePicture = response.data.url
        }
      }catch(error){
        console.log(error)
      }



    }

    try {
      const response = await axios.post('https://socials-api-server-1.renukapaturkar.repl.co/users/updateuser',values)
      return fulfillWithValue(response)
    }catch(error){
      return rejectWithValue(error.response)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: '',
    followers: [],
    followings: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateUserProfile: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      localStorage.setItem('userData', JSON.stringify(state.user))
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = 'success'
      state.user = action.payload
    },
    [getUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [getFollowers.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getFollowers.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.followers = action.payload
    },
    [getFollowers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [getFollowing.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getFollowing.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.followings = action.payload
    },
    [getFollowing.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [followUser.pending]: (state, action) => {
      state.status = 'pending'
    },
    [followUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.user.followers = action.payload.followers
    },
    [followUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [unfollowUser.pending]: (state, action) => {
      state.status = 'pending'
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.user.followers = action.payload.followers
    },
    [unfollowUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [updateProfile.pending]: (state, action) => {
      state.status = 'pending'
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.status = 'success'
      state.user = action.payload
    },
    [updateProfile.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
  },
})

export const { updateUserProfile } = usersSlice.actions

export default usersSlice.reducer
