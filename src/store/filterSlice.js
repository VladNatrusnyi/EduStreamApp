
import {createSlice} from "@reduxjs/toolkit";



export const emptyInitialStateForFilterSlice = {
    searchText: '',
    categoryValue: 0,
    popularity: 0,
    creationDate: 0
}

const initialState = emptyInitialStateForFilterSlice

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload
        },

        setCategoryValue(state, action) {
            state.categoryValue = action.payload
        },

        setPopularityValue(state, action) {
            state.popularity = action.payload
        },

        setCreationDateValue(state, action) {
            state.creationDate = action.payload
        },

        clearFilters(state, action) {
            state.searchText = ''
            state.categoryValue = 0
            state.popularity = 0
            state.creationDate = 0
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setSearchText,
    setCategoryValue,
    setPopularityValue,
    setCreationDateValue,
    clearFilters
} = filterSlice.actions

export default filterSlice.reducer