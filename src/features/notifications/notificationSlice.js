import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getNotifications = createAsyncThunk(
    "notifications/getNotifications", 
    async() => {
        const response = await axios.get("https://socials-api-server-1.renukapaturkar.repl.co/notifications")
        console.log(response.data.notification.notification, "notifications")
       return response.data.notification.notification
    }
)


const notificationSlice = createSlice({
    name: "notifications", 
    initialState: {
        notification: [], 
        status: "idle",
        error: null,
    }, 
    reducers: {}, 
    extraReducers: {
        [getNotifications.pending]: (state) =>{
            state.status = "pending"
        }, 
        [getNotifications.fulfilled]: (state, action) => {
            state.status = "success"
            state.notification = action.payload
        }, 
        [getNotifications.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error
        }

    }
})

export default notificationSlice.reducer