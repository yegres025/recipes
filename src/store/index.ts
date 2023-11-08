import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import mainReducer from './slice'
const rootReducer = combineReducers({
    mainReducer
}) 

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch : () => AppDispatch = useDispatch

export default store
