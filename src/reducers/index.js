import {combineReducers} from 'redux'
import productosReducer from './productosReducer'
import userReducer from './userReducer'
import storeReducer from './storeReducer'
import helperReducer from './helperReducer'

export default combineReducers({
    productos: productosReducer,
    user:userReducer,
    stores:storeReducer,
    helper:helperReducer
})