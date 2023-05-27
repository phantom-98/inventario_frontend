import {
    PRODUCTOS,
    PRODUCTOS_EXITO,
    PRODUCTOS_FAIL,
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_FAIL,
}from '../types';

import clienteAxios from 'config/axios';
import Swal from 'sweetalert2';


export function getProductos(){
    return async (dispatch) =>{
        dispatch(productos())
        try {
            let data = await clienteAxios.get('product');
            let respdata = data.data
            
            dispatch( productosExito(respdata) )
            
        } catch (error) {
            console.log(error)
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en logeado',
            })
            dispatch( productosFail(true) )
        }
    }
}

export function crearNuevoProductoAction(producto){
    return async (dispatch) =>{
        dispatch(productos())
        try {
            let data = await clienteAxios.post('users/login', producto);
            console.log(data)
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
            dispatch( agregarProductoExito(producto) )
        } catch (error) {
            console.log(error)
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })

            dispatch( agregarProductoFail(true) )
        }
    }
}

const productos = ()=>({
    type:PRODUCTOS
})

const productosExito = (productos)=>({
    type:PRODUCTOS_EXITO,
    payload: productos
})

const productosFail = ()=>({
    type:PRODUCTOS_FAIL
})

const agregarProducto = ()=>({
    type:AGREGAR_PRODUCTO
})

const agregarProductoExito = producto =>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoFail = ()=>({
    type:AGREGAR_PRODUCTO_FAIL
})