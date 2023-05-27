import {
    TIENDAS,
    TIENDAS_EXITO,
    TIENDAS_FAIL
}from '../types';

import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';

export function getTiendas(){
    return async (dispatch) =>{
        dispatch(tienda())
        try {
            let data = await clienteAxios.get('stores');
            let respdata = data.data
            
            dispatch( tiendaExito(respdata) )
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en logeado',
            })
            dispatch( tiendaFail(true) )
        }
    }
}

const tienda = ()=>({
    type:TIENDAS
})

const tiendaExito = user =>({
    type:TIENDAS_EXITO,
    payload: user
})

const tiendaFail = ()=>({
    type:TIENDAS_FAIL
})