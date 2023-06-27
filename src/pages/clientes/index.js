
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
import { loadingAction } from "actions/helperActions";

function Clientes() {
  const dispatch = useDispatch();
  const [clients, setClients] = useState([]) 

  const getData = async()=>{
    dispatch(loadingAction())
    const data = await clienteAxios.get('client/');
    dispatch(loadingAction())
    setClients(data.data)
  }
    
  useEffect(()=>{
    getData()
  },[])
  
  const navigate = useNavigate();

  const edit = (item)=> {
	  navigate(`/clientes/edit/${item.uid}`);
	}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <ListHeader url="/clientes/create" label="Listado Clientes" buttonText="Agregar +" />
            <SoftBox>
              <DataTableComponent rowsData={clients} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Clientes;
