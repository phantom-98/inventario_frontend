import {
    TIENDAS,
    TIENDAS_EXITO,
    TIENDAS_FAIL
}from '../types'


const initialState = {
    stores: [],
    error: false,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case TIENDAS:
            return {
                ...state,
                loading: true
            }
        case TIENDAS_EXITO:
            return {
                ...state,
                loading: false,
                error:false,
                stores: action.payload
            }
        case TIENDAS_FAIL:
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