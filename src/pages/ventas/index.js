
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
import HeaderVentas from "./Header/headerVentas";
import Projects from "./Projects";
import MUIDataTable from "mui-datatables";
import { muiOptions,  columnsFunc, columnsFunc2 } from "components/DataTable/options"
import {insertarPuntos} from "../../config/helpers"


function Ventas() {
    const dispatch = useDispatch();
    const [dataRow, setDataRow] = useState([]) 
    const [dataRowF, setDataRowF] = useState([]) 

    const getData = async()=>{
        const data = await clienteAxios.get('sale/');
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.createdAt, r.payType, `$ ${insertarPuntos(r.total)}`, r.clientRut, r.uid]
        })

        setDataRow(tempRows)
    }


    
    useEffect(()=>{
        getData()
        //getFactura()
    },[])
    
    const navigate = useNavigate();

    const edit = (item)=> {
        navigate(`/clientes/edit/${item.uid}`);
        }

        const columns = columnsFunc(["Fecha", "Tipo de Pago", "Total", "Rut"], edit);

    return (
        <DashboardLayout>
        <HeaderVentas />
        <SoftBox py={3}>
            <SoftBox mb={3}>
            <Card>
                <ListHeader url="/Ventas/create" label="Listado ventas" buttonText="Agregar +"  mode="datePicker"/>
                <SoftBox>
                <MUIDataTable
                        data={dataRow}
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

export default Ventas;
