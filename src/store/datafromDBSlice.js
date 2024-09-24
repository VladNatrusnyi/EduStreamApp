
import {createSlice} from "@reduxjs/toolkit";



export const emptyInitialStateForDataFromDBSlice = {
    usersInDB: null,
    coursesInDB: null
}

const initialState = emptyInitialStateForDataFromDBSlice

export const dataFromDBSlice = createSlice({
    name: 'dataFromDB',
    initialState,
    reducers: {

        setUsersInDB(state, action) {
            state.usersInDB = action.payload
        },


        setCoursesInDB(state, action) {
            state.coursesInDB = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    clearAllDataFields,
    setUsersInDB,
    setCoursesInDB
} = dataFromDBSlice.actions

export default dataFromDBSlice.reducer