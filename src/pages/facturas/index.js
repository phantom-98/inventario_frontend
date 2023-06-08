
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";

import { getTiendas } from "../../actions/storeActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "components/DataTable"
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"

import MUIDataTable from "mui-datatables";

function Clientes() {

  const [dataRow, setDataRow] = useState([]) 
  const [rows, setRows] = useState([])
  const columns = ["Fecha", "Tipo", "Cliente Rut", "Total", "Link"];
  
  const getData = async()=>{
    const data = await clienteAxios.get('factura/');
    let respData = data.data
    let tempRows = respData.map(r=>{
      return[r.createdAt, r.type, r.client.RUTRecep, r.totals.MntTotal, r.url]
    })

    setRows(tempRows)
    console.log(tempRows)
    
    //setDataRow(data.data)
  }
    
  useEffect(()=>{
    getData()
  },[])
  
  const navigate = useNavigate();

  const edit = (item)=> {
	  navigate(`/facturas/edit/${item.uid}`);
	}

  const options = {
    filterType: 'checkbox',
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <ListHeader url="/facturas/create" label="Listado Factura" buttonText="Agregar +" />
            <SoftBox>
            <MUIDataTable
              
                data={rows}
                columns={columns}
                options={options}
            />
            
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Clientes;
