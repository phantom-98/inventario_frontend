import {
    LOGIN,
    LOGIN_EXITO,
    LOGIN_FAIL,
}from '../types';

import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';



export function loginAction(user){
    return async (dispatch) =>{
        dispatch(login())
        try {
            let data = await clienteAxios.post('users/login', user);
            let respdata = data.data
            Swal.fire(
                '',
                'Usuario logeado correctamente!',
                'success'
              )
            dispatch( loginExito(data.data) )
            localStorage.setItem("token", respdata.token)
           return respdata
        } catch (error) {
            console.log(error)
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en logeado',
            })

            dispatch( loginFail(true) )
        }
    }
}


const login = ()=>({
    type:LOGIN
})

const loginExito = user =>({
    type:LOGIN_EXITO,
    payload: user
})

const loginFail = ()=>({
    type:LOGIN_FAIL
})

