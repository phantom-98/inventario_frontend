import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import SoftButton from "components/SoftButton";
import clienteAxios from 'config/axios';
import axios from "axios";
import { succesSwal } from "config/helpers";
import Swal from "sweetalert2";
import clienteAxiosAuth from "config/axiosAuth";


function  CrearUsuario () {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({})

    const onSubmit = async e => {
        e.preventDefault()
        try {
            await clienteAxiosAuth.post('intranet',usuario)
        Swal.fire({
            title: 'Confirmado!',
            text: 'Usuario creado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        navigate('/usuarios')
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            
        }
        
        /* clienteAxios.post('users', usuario)
            .then(resp =>{
                succesSwal()
                navigate(`/usuarios`);
            })
            .catch((e)=>{

            }); */
    };
    const handleChange=e=>{

        const {name, value}=e.target;
        setUsuario(prevState=>({
            ...prevState,
            [name]: value
        }))
    }



    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox py={3}component="form" role="form" onSubmit={onSubmit}>

                    <SoftBox p={2} >
                        <Grid container spacing={2}>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <TextField 
                                    name="first_name"
                                    type="text"
                                    fullWidth label="Nombre Del Usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                    onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox> 
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <TextField 
                                    name="last_name"
                                    type="text"
                                    fullWidth label="Apellido Del Usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                    onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox> 
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <TextField 
                                    name="rut"
                                    type="text"
                                    fullWidth label="Rut Del Usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                    onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox> 
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="email"
                                    fullWidth label="Email del usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                    onChange={(e)=>handleChange(e)}
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="password"
                                    type="password"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="password" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Rol De Usuario
                                    </InputLabel>
                                    <NativeSelect
                                     onChange={(e)=>handleChange(e)}
                                        name="profileType"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'profileType',
                                            id: 'uncontrolled-native',
                                        }}
                                        >
                                             <option  value=''>Seleccione</option>
                                            <option  value='CLIENT'>cliente</option>
                                            <option  value='ADMIN'>administrador</option>
                                            <option  value='DEVELOPER'>desarrollador</option>
                                            <option  value='PHARMACIST'>farmaceuta</option>
                                            <option  value='PHARMACY_ASSISTANT'>assistente de farmacia</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                        </Grid>
                        <SoftBox mt={4} mb={1}>
                            <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                        </SoftBox>
                    </SoftBox>
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
            
    )
  }
  
  export default CrearUsuario
  