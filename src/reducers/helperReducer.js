import {
    LOADING
}from '../types'


const initialState = {
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOADING:
            return {
                loading: !state.loading
            }
        default:
            return state;
            break;
    }
}