import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTiendas } from "../../actions/storeActions"
import { useForm } from "react-hook-form";
import clienteAxios from 'config/axios';
import TextField from '@mui/material/TextField';
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";

function CreateTienda() {
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        clienteAxios.post('stores', data)
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
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>    
                    <div></div>
                    <SoftButton variant="outlined" color="info" size="small"  onClick={()=>navigate("/tiendas")} >Regresar</SoftButton>
                </SoftBox>
                
                <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <TextField fullWidth label="Nombre" variant="outlined" 
                                    {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                {errors.name?.type === 'required' && <small className="alert alert-danger" role="alert">Nombre es requerido</small>}
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <TextField fullWidth label="Direccion" variant="outlined" 
                                    {...register("address", { required: true })} aria-invalid={errors.address ? "true" : "false"} 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                {errors.address?.type === 'required' && <small className="alert alert-danger" role="alert">Direccion es requerido</small>}
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <TextField fullWidth label="Telefono" variant="outlined" 
                                    {...register("phone", { required: true })} aria-invalid={errors.phone ? "true" : "false"} 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                {errors.phone?.type === 'required' && <small className="alert alert-danger" role="alert">Telefono es requerido</small>}
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <select className="form-select"  {...register("status", { required: true })}>
                                    <option>Seleccione Estado</option>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                                {errors.status?.type === 'required' && <small className="alert alert-danger" role="alert">Estado es requerido</small>}
                            </SoftBox>
                        </Grid>
                    </Grid>
                    <SoftBox mt={4} mb={1}>
                        <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                    </SoftBox>
                </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
      </DashboardLayout>
    );
}

export default CreateTienda;