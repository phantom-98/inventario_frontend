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
    fontSize: '12px',
}



function Invoices() {
  
    const dispatch = useDispatch();
    const [venta, setVenta] = useState([]) 
    const columns = ["Fecha", "Tipo de Pago", "Total", "Rut"];

    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all');
        let respData = data.data
        dispatch(loadingAction())

        console.log(respData)
        setVenta(respData.boletas)
    }
    useEffect(()=>{
        getData()
        //getFactura()
    },[]) 

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
       <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        
          <SoftTypography variant="h6" gutterBottom>
            Ventas Web
          </SoftTypography>
          <SoftButton variant="outlined" color="info" size="small" href="/ventas" >
            Ver Mas +
            </SoftButton>
      
      </SoftBox>
        <SoftBox pt={0} px={2} >
            <table style={tablaf}>
                <thead>
                    <tr style={tr}>
                          <th><strong># </strong></th>
                        <th><strong>Productos </strong></th>
                        <th><strong>Total </strong></th>
                        <th><strong>Rut </strong></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        venta.map((v, index)=>(
                            <tr key={index}>
                                <td>{v.counter}</td>
                               <td>
                                    <ul >
                                        {
                                            v.items.map((item, r)=>(
                                                <li key={r}>{item.QtyItem} - {item.NmbItem}</li>   
                                            ))
                                        }
                                    </ul>
                                </td>
                                
                                <td>$ {insertarPuntos(v.totals?.MntTotal)}</td>
                                <td>{v.client?.RUTRecep}</td>
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
