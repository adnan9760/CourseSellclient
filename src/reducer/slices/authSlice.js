import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loginData: null,
    token: localStorage.getItem("token") || null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setLoginData: (state, action) => {
            state.loginData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            // Save token in localStorage
            if (action.payload) {
                localStorage.setItem("token", action.payload);
            } else {
                localStorage.removeItem("token");
            }
        },
    }
})

export const { setSignupData, setLoading, setToken, setLoginData } = authSlice.actions;

export default authSlice.reducer;
