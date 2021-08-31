import axios from 'axios'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { setupAuthHeaderForServiceCalls } from './utils/utils'

const currentUser = {
    username: "", 
    name: "", 
    email: "", 
    userId: "", 
}

export const signUp = createAsyncThunk(
    'auth/signup', 
    async(values, {fulfillWithValue, rejectWithValue}) => {
        try {
            const response = await axios.post('https://socials-api-server-1.renukapaturkar.repl.co/signup', values)
            return fulfillWithValue(response)
        }catch(error){
            return rejectWithValue(error.response)
        }

    }
)

export const login = createAsyncThunk(
    'auth/login', 
    async(values, {fulfillWithValue, rejectWithValue}) => {
        try {
            const response = await axios.post('https://socials-api-server-1.renukapaturkar.repl.co/signin', values)

            if(response.status === 200){
                setupAuthHeaderForServiceCalls(response.data.token)
                localStorage.setItem("token",JSON.stringify(response.data.token))
                localStorage.setItem("userData", JSON.stringify(response.data.userData))
            }
            return fulfillWithValue(response)
        }catch(error){
            return rejectWithValue(error.response)
        }
    }
)

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        currentUser: currentUser, 
        token: "", 
        status: "idle", 
        error: null
    },
    reducers: {
        setToken: (state,action) => {
            state.token = action.payload
        }
    }, 

    extraReducers: {
        [login.pending]: (state) => {
            state.status = "pending"
        }, 
        [login.fulfilled]: (state, action) => {
            state.status = "success"
            state.token = action.payload.token
            state.userData = action.payload.userData
        }, 
        [login.rejected]: (state, action)=> {
            state.error = action.error.message
            state.status = "failed"
        }
    }
})

export const {setToken} =authSlice.actions

export default authSlice.reducer