
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
import MUIDataTable from "mui-datatables"
import NestedModal from "components/modal/modalExel";
import { loadingAction } from "actions/helperActions";



function Clientes() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([])
  
  const getData = async()=>{
    dispatch(loadingAction())
    const data = await clienteAxios.get('product/');
    dispatch(loadingAction())
    let respData = data.data
    let tempRows = respData.map(r=>{
      return[r.sku, r.codigoBarra, r.nombre, r.laboratorio, r.stock, `$ ${r.precio}`, `$ ${r.precioOferta}`, r.uid]
     
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
  const columns = columnsFunc(["Sku", "Codigo de Barra", "Nombre", "Laboratorio", "Stock", "Precio", "Precio Oferta"], edit);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            
            <ListHeader url="/productos/create" label="Listado Productos" buttonText="Agregar +"  mode="excelModal"/>
            
            
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
