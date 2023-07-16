import { useState, useEffect} from "react";
import Card from "@mui/material/Card";
import { useDispatch } from "react-redux";
import { loadingAction } from './../../../../actions/helperActions';
import clienteAxios from 'config/axios';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { insertarPuntos, dateFormat } from "config/helpers";

import SoftButton from "components/SoftButton";

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

function Projects() {
    const dispatch = useDispatch();
    const [venta, setVenta] = useState([]) 
    const [ventai, setVentai] = useState([]) 


    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all');
        let respData = data.data
        setVenta(respData.sales)
        dispatch(loadingAction())
     

    }
    useEffect(()=>{
        getData()
    //getFactura()
    },[]) 

  
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        
          <SoftTypography variant="h6" gutterBottom>
            Ventas Pos
          </SoftTypography>
          <SoftButton variant="outlined" color="info" size="small" href="/ventas" >
            Ver Mas +
            </SoftButton>
      
      </SoftBox>
        <SoftBox pt={0} px={2} >
            <table style={tablaf}>
                <thead>
                    <tr style={tr}>
                        <th><strong>Productos </strong></th>
                        <th><strong>F. Pago </strong></th>
                        <th><strong>Total </strong></th>
                    </tr>
                </thead>
                <tbody>
                {
                    venta.map((v, index)=>(
                        <tr key={index}>
                            <td>
                                <ul >
                                    {
                                        v.items.map((item, r)=>(
                                            <li key={r}>{item.qty} - {item.productName}</li>   
                                        ))
                                    }
                                </ul>
                            </td>
                            <td>{v.payType}</td>
                            <td>{v.total}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </SoftBox>
   
    </Card>
  );
}

export default Projects;
