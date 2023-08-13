import {
    LOADING,
    GETDATAFORDASHBOARD,
    GETDATAFORDASHBOARDEXITO
}from '../types'


const initialState = {
    loading: false,
    data:{
        labels:[],
        datasets:[]
    }
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOADING:
            return {
                loading: !state.loading
            }
        case GETDATAFORDASHBOARD:
            return {
                ...state,
                loading: true
            }
        case GETDATAFORDASHBOARDEXITO:
            return {
                ...state,
                loading: false,
                error:false,
                data: action.payload      
            }
        default:
            return state;
            break;
    }
}