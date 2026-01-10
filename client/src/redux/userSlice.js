import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user', // The name used in action types
    initialState: { currentUser: null, loading: false, error: false, darkMode: false },
    reducers: {
        // Triggered immediately when the login process starts
        loginStart: (state) => { state.loading = true; },
        // Triggered when API returns user data successfully
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        // Triggered if the API call fails
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        // Resets the user state to sign out the user
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        // Used for profile updates (merges new data into existing currentUser object)
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
        // Switches between light and dark mode
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },  
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUserSuccess, toggleTheme } = userSlice.actions;
export default userSlice.reducer;