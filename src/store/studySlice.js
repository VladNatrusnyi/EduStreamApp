
import {createSlice} from "@reduxjs/toolkit";



export const emptyInitialStateForStudySlice = {
    currentCourseData: null,
}

const initialState = emptyInitialStateForStudySlice

export const studySlice = createSlice({
    name: 'study',
    initialState,
    reducers: {

        setCurrentCourseData(state, action) {
            state.currentCourseData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentCourseData
} = studySlice.actions

export default studySlice.reducer