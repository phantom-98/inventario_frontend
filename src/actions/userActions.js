import axios from 'axios';
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
            let data2 = await axios.post('http://localhost:5000/auth/login',user)
            let respdata = data.data
            let respdata2 = data2.data
            if(respdata2.user.profile.type === 'CLIENT') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario sin accesos',
                })
                  dispatch(loginFail(true))
            }else {
                localStorage.setItem("token", respdata2.token)
                localStorage.setItem("user", JSON.stringify(respdata2.user))
                Swal.fire(
                    '',
                    'Usuario logeado correctamente!',
                    'success'
                  )
                dispatch( loginExito(data.data) )
               return respdata2
            }
            
        } catch (error) {
            
            
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

