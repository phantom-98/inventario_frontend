import {combineReducers} from 'redux'
import productosReducer from './productosReducer'
import userReducer from './userReducer'
import storeReducer from './storeReducer'

export default combineReducers({
    productos: productosReducer,
    user:userReducer,
    stores:storeReducer
})