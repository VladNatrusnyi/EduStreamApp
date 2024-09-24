
import {createSlice} from "@reduxjs/toolkit";



export const emptyInitialStateForAuthSlice = {
    loggedUser: null,
    name: '',
    email: '',
    password: '',
    role: 1,
    showPassword: false,
    isLoading: false,
    error: ''

}

const initialState = emptyInitialStateForAuthSlice

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        setLoggedUser(state, action) {
            state.loggedUser = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setShowPassword(state, action) {
            state.showPassword = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },

        clearAllFields(state, action) {
            state.email = ''
            state.name = ''
            state.password = ''
            state.role = 1
            state.showPassword = false
            state.isLoading = false
            state.error = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setLoggedUser,
    setEmail,
    setPassword,
    setShowPassword,
    setIsLoading,
    setError,
    setName,
    setRole,
    clearAllFields
} = loginSlice.actions

export default loginSlice.reducer
