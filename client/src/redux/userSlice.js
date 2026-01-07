import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { currentUser: null, loading: false, error: false, darkMode: false },
    reducers: {
        loginStart: (state) => { state.loading = true; },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },  
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUserSuccess, toggleTheme } = userSlice.actions;
export default userSlice.reducer;