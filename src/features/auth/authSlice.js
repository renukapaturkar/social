import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setupAuthHeaderForServiceCalls } from './utils/utils'
import { clearLocalStorage } from './utils/clearLocalStorage'



export const signUp = createAsyncThunk(
  'auth/signup',
  async (values, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://socials-api-server-1.renukapaturkar.repl.co/signup',
        values
      )
      return fulfillWithValue(response)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (values, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://socials-api-server-1.renukapaturkar.repl.co/signin',
        values
      )

      if (response.status === 200) {
        setupAuthHeaderForServiceCalls(response.data.token)
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('userData', JSON.stringify(response.data.userData))
      }
      console.log(response, "LOGIN")
      return fulfillWithValue(response.data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const currentUser = {
  email: '',
  name: '',
  username: '',
  _id: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: currentUser,
    token: "",
    status: 'idle',
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.token = action.payload.token
      state.currentUser = action.payload.userData
    },
    logout: (state, action) => {
      state.status = 'idle'
      state.token = ''
      clearLocalStorage()
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'pending'
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'success'
      state.token = action.payload.token
      state.currentUser = action.payload.userData
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message
      state.status = 'failed'
    },
    [signUp.pending]: (state, action) => {
        state.status = "pending"
    }, 
    [signUp.fulfilled]: (state, action) => {
        state.status = "success"
    }, 
    [signUp.rejected]: (state, action) => {
        state.status = "failed"
        state.error = action.error
    }
  },
})

export const { setData, logout } = authSlice.actions

export default authSlice.reducer
