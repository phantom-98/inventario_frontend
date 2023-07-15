/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import Invoice from "../Invoice";

//TODO ANDRES copiar funcion para loading
import { loadingAction } from './../../../../actions/helperActions';
import { useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import clienteAxios from 'config/axios';
import { muiOptions,  columnsFunc4 } from "components/DataTable/options"
import { insertarPuntos, dateFormat } from "config/helpers";

const tablaf ={
    width:'100%',
    borderStyle: 'solid' ,
    borderWidth: '1px',
    borderColor: 'black',
    padding: '10px',   
  }
const tr = {
    borderStyle: 'solid none' ,
    borderWidth: '1px',
    borderColor: 'black',
    fontSize: '13px',
}



function Invoices() {
  
    const dispatch = useDispatch();
    const [venta, setVenta] = useState([]) 
    const columns = ["Fecha", "Tipo de Pago", "Total", "Rut"];

   


    const test = ()=>{
        
        /*
        Una vez crea true
        dispatch(loadingAction())
        Otra vez crea false
        dispatch(loadingAction())
        */

    }
    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all');
        let respData = data.data
        setVenta(respData.boletas.slice(0, 10))
    }
    useEffect(()=>{
        getData()
        //getFactura()
    },[]) 

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
        <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <SoftTypography variant="h6" fontWeight="medium">
                Ventas Diarias
            </SoftTypography>
            <SoftButton variant="outlined" color="info" size="small" href="/ventas" >
            Ver Mas +
            </SoftButton>
        </SoftBox>
        <SoftBox pt={2} px={2} >
            <table style={tablaf}>
                <thead>
                    <tr style={tr}>
                        <th><strong>Fecha </strong></th>
                        <th><strong>Tipo De Pago </strong></th>
                        <th><strong>Total </strong></th>
                        <th><strong>Rut </strong></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        venta.map((item, index)=>(
                            <tr key={index}>
                                <td>{dateFormat(item.createdAt)}</td>
                                <td>WebPay</td>
                                <td>${insertarPuntos(item.totals.MntTotal)}</td>
                                <td>{item.client.RUTRecep}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </SoftBox>
    </Card>
  );
}

export default Invoices;
