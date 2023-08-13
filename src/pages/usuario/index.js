import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadingAction } from "actions/helperActions";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import Card from "@mui/material/Card";
import ListHeader from "components/ListHeader"
import clienteAxios from 'config/axios';
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables"
import { muiOptions,  columnsFunc2 } from "components/DataTable/options"


function Usuarios (){
    const [rows, setRows] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('users/');
        dispatch(loadingAction())
        let respData = data.data
        let tempRows = respData.users.map(r=>{
            return[r.name, r.email, r.role, r.uid]
        })
        setRows(tempRows)
    }
    useEffect(()=>{
        getData()
    },[])
    const edit = (item)=> {
        navigate(`/usuario/edit/${item}`);
    }
    const onDelete = (item) => {
        clienteAxios.delete(`/users/${item}`)
            .then(() => {
            getData();
        })
    }
    const columns = columnsFunc2(["Nombre", "Email", "Rol"],edit,3, onDelete);
    return (
        <DashboardLayout>
            <SoftBox py={3}>
            <SoftBox mb={3}>
                <Card>
                <ListHeader url="/usuarios/create" label="Listado Usuarios" buttonText="Agregar +"/>
                <SoftBox>
                    <MUIDataTable data={rows} columns={columns}options={muiOptions}/>
                </SoftBox>
                </Card>
            </SoftBox>
            </SoftBox>
        </DashboardLayout>
    );
}
export default Usuarios
