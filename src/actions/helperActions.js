import {
    LOADING,
    GETDATAFORDASHBOARD,
    GETDATAFORDASHBOARDEXITO
}from '../types';
import clienteAxios from 'config/axios';
import gradientLineChartData from "../layouts/dashboard/data/gradientLineChartData"
export function loadingAction(){
    return async (dispatch) =>{
        dispatch(loading())
    }
}

export function getDataforDashAction(){
    return async(dispatch) =>{
        dispatch( getDataforDashExito(gradientLineChartData) )
        try {
            const data = await clienteAxios.get('sale/salePerMonth');
            let respData = data.data
            
            let dataPos = new Array(12).fill(0);
            data.data.pos.forEach(element => {
                dataPos[element.mes] = element.total;
            });

            let dataWeb = new Array(12).fill(0);
            data.data.web.forEach(element => {
                dataWeb[element.mes] = element.total;
            });

            
            let dataTemp =  {}
            dataTemp.labels =  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
            dataTemp.datasets = [
                {
                    color:"info",
                    data: dataPos,
                    label: "Pos"
                },
                {
                    color:"dark",
                    data: dataWeb,
                    label: "Web"
                },
            ]
            dispatch( getDataforDashExito(dataTemp) )
        } catch (error) {
            console.log(error)
            dispatch( getDataforDashExito(gradientLineChartData) )
        }
        
    }
}


const loading = ()=>({
    type:LOADING
})



const getDataforDash = ()=>({
    type:GETDATAFORDASHBOARD
})

const getDataforDashExito = data =>({
    type:GETDATAFORDASHBOARDEXITO,
    payload: data
})


