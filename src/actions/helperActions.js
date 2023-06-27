import {
    LOADING
}from '../types';


export function loadingAction(){
    return async (dispatch) =>{
        console.log("asasdas")
        dispatch(loading())
    }
}


const loading = ()=>({
    type:LOADING
})


