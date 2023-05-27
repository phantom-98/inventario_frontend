import {
    PRODUCTOS,
    PRODUCTOS_EXITO,
    PRODUCTOS_FAIL,
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_FAIL
}from '../types'


const initialState = {
    productos: [],
    error: false,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case PRODUCTOS:
            return {
                ...state,
                loading: true
            }
        case PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error:false,
                productos:  action.payload  
            }
        case PRODUCTOS_FAIL:
            return {
                ...state,
                loading: false,
                error:true
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error:false,
                productos: [...state.productos, action.payload]      
            }
        case AGREGAR_PRODUCTO_FAIL:
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