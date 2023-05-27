import {
    LOGIN,
    LOGIN_EXITO,
    LOGIN_FAIL,
}from '../types'


const initialState = {
    user: {},
    error: false,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true
            }
        case LOGIN_EXITO:
            return {
                ...state,
                loading: false,
                error:false,
                user: action.payload      
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error:true
            }
        default:
            return state;
            break;
    }
}