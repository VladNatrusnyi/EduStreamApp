import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginReducer from './loginSlice'
import createCourseReducer from './createCourseSlice'
import dataFromDBReducer from './datafromDBSlice'
import studyReducer from './studySlice'
import filterReducer from './filterSlice'
import {setupListeners} from "@reduxjs/toolkit/query";



export const USER_LOGOUT_FROM_SYSTEM = '@@logout/USER_LOGOUT_FROM_SYSTEM'

const combinedReducer = combineReducers({
    login: loginReducer,
    createCourse: createCourseReducer,
    dbData: dataFromDBReducer,
    study: studyReducer,
    filter: filterReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT_FROM_SYSTEM) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
})

setupListeners(store.dispatch)