
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
import { muiOptions,  columnsFunc } from "components/DataTable/options"
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"
import MUIDataTable from "mui-datatables";

function Clientes() {
 
  const [rows, setRows] = useState([])
  
  const getData = async()=>{
    const data = await clienteAxios.get('product/');
    let respData = data.data
    let tempRows = respData.map(r=>{
      return[r.sku, r.nombre, r.laboratorio, r.stock, `$ ${r.precio}`, `$ ${r.precioOferta}`, r.uid]
    })

    setRows(tempRows)
  }
    
  useEffect(()=>{
    getData()
  },[])


  
  const navigate = useNavigate();

  const edit = (item)=> {
    
	  navigate(`/productos/edit/${item}`);
	}
  const columns = columnsFunc(["Sku", "Nombre", "Laboratorio", "Stock", "Precio", "Precio Oferta"], edit);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <ListHeader url="/productos/create" label="Listado Productos" buttonText="Agregar +" />
            <SoftBox>
              <MUIDataTable
                
                data={rows}
                columns={columns}
                options={muiOptions}
              />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Clientes;
