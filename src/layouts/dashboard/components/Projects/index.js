import { useState, useEffect} from "react";
import Card from "@mui/material/Card";
import { useDispatch } from "react-redux";
import { loadingAction } from './../../../../actions/helperActions';
import clienteAxios from 'config/axios';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
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

function Projects() {
    const dispatch = useDispatch();
    const [venta, setVenta] = useState([]) 
    const [ventai, setVentai] = useState([]) 


    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all');
        let respData = data.data
        console.log(respData.sales)

        setVenta(respData.sales.slice(0, 10))
       

    }
    useEffect(()=>{
        getData()
    //getFactura()
    },[]) 

  
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Detalle De Ventas
          </SoftTypography>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
          </SoftBox>
        </SoftBox>
      </SoftBox>
        <SoftBox pt={2} px={2} >
            <table style={tablaf}>
                <thead>
                    <tr style={tr}>
                        <th><strong>Productos </strong></th>
                        
                        <th><strong>Tipo De Pago </strong></th>
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
