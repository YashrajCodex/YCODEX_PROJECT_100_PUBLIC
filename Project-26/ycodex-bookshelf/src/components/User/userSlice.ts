import { createSlice } from "@reduxjs/toolkit";

export interface User {
    isAuthenticated: boolean;
    users: {
    key: string;
    userName: string;
    Email: string;
    Password: string;
    Profile_Image_Link: string;
    }[];
}
const initialState: User = {
    isAuthenticated: false,
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { 
        addUser: (state, action) => {
            state.isAuthenticated = true;
            state.users.push(action.payload)
        },
        removeUser: (state) => {
            state.isAuthenticated = false;
            state.users = []
        },
        editUserName: (state, action) => {
            const check = state.users.find(user => user.key === action.payload.id)
            // console.log(check)
            if (check) {
                check.userName = action.payload.name
            }
        }
    }
})

export const {addUser, removeUser, editUserName} = userSlice.actions
export default userSlice.reducer