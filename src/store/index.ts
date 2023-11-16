import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import recipesReducer from './recipe-slice'
import cocktailsReducer from './coctails-slice'
const rootReducer = combineReducers({
    recipes: recipesReducer,
    coctails: cocktailsReducer,
}) 

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch : () => AppDispatch = useDispatch

export default store
