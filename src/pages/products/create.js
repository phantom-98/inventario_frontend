import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTiendas } from "../../actions/storeActions"

import clienteAxios from 'config/axios';

import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";
import {formSchema} from "./formSchema.js"
import FormComponent from "components/Form"
import ListHeader from "components/ListHeader"

function CreateClientes() {
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        clienteAxios.post('client', data)
            .then(resp =>{
                succesSwal()
                navigate(`/clientes`);
            })
            .catch((e)=>{
                console.log(e.response.data.msg);
                if(e.response.data.msg =="Token no válido"){
                    errorSwal(e.response.data.msg)
                    navigate(`/`);

                }else{
                    errorSwal(e.response.data.msg)
                }
            });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <ListHeader url="/clientes" label="Crear Cliente" buttonText="Regresar" />
                        <FormComponent schema={formSchema} onSubmit={onSubmit}/>
                    </Card>
                </SoftBox>
            </SoftBox>
      </DashboardLayout>
    );
}

export default CreateClientes;