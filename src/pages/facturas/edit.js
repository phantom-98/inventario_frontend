import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTiendas } from "../../actions/storeActions"
import clienteAxios from 'config/axios';
import { formSchema } from "./formSchema";

import { useForm } from "react-hook-form";
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";
import FormComponent from "components/Form"
import ListHeader from "components/ListHeader"

function EditClientes() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const {id} = routeParams;
    const stores = useSelector(state => state.stores.stores)
    const dispatch = useDispatch();
    
    useEffect(()=>{ dispatch(getTiendas()) },[])

    const store = stores.find(s=>s.uid == id);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        clienteAxios.put('stores/'+id, data)
            .then(resp =>{
                succesSwal()
                navigate(`/tiendas`);
            })
            .catch((e)=>{
                console.log(e);
                errorSwal()
            });
    };
    

    return (
        <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
                <ListHeader url="/clientes" label="Editar Factura" buttonText="Regresar" />
                <FormComponent schema={formSchema} onSubmit={onSubmit}/>
            </Card>
          </SoftBox>
        </SoftBox>
      </DashboardLayout>
    );
}

export default EditClientes;