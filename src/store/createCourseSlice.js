
import {createSlice} from "@reduxjs/toolkit";



export const emptyInitialStateForCreateCourseSlice = {
    courseName: '',
    courseDescription: '',
    courseCategoryId: 0,
    lessons: [],

    courseIsLoading: false,
    courseError: '',
}

const initialState = emptyInitialStateForCreateCourseSlice

export const createCourseSlice = createSlice({
    name: 'createCourse',
    initialState,
    reducers: {

        setCourseName(state, action) {
            state.courseName = action.payload
        },

        setCourseDescription(state, action) {
            state.courseDescription = action.payload
        },

        setCourseIsLoading(state, action) {
            state.courseIsLoading = action.payload
        },
        setCourseError(state, action) {
            state.courseError = action.payload
        },

        setLessons(state, action) {
            const levelObj = action.payload

            state.lessons = [
                ...state.lessons,
                {
                    id: Date.now().toString(),
                    ...levelObj,
                    order: state.lessons.length + 1
                }
            ]
        },

        deleteLevel(state, action) {
            const lessonId = action.payload
            state.lessons = state.lessons.map((lesson, idx) => {
                if (lesson.id === lessonId) {
                    return null
                } else { return lesson}
            }).filter(item => !!item).map((el, idx) => ({...el, order: idx + 1}))
        },

        setCourseCategoryId(state, action) {
            state.courseCategoryId = action.payload
        },

        clearAllFieldsCourseSlice(state, action) {
            state.courseName = ''
            state.courseDescription = ''
            state.courseCategoryId = 0
            state.lessons = []
            state.courseIsLoading = false
            state.courseError = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setCourseName,
    setCourseDescription,
    clearAllFieldsCourseSlice,
    setCourseIsLoading,
    setCourseError,
    setLessons,
    setCourseCategoryId,
    deleteLevel
} = createCourseSlice.actions

export default createCourseSlice.reducer