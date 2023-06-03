import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFethching: false,
            error: false
        }
    },
    reducers: {
        getUserStart: ( state ) => {
            state.users.isFethching = true
        },
        getUserSuccess: ( state, action ) => {
            state.users.isFethching = false
            state.users.allUsers = action.payload
        },
        getUserFailed: ( state ) => {
            state.users.isFethching = false;
            state.users.error = true
        }
    }
})

export const {
    getUserStart, 
    getUserSuccess,
    getUserFailed
} = userSlice.actions

export default userSlice.reducer