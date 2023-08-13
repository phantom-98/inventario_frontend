import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import SoftButton from "components/SoftButton";
import clienteAxios from 'config/axios';
import SoftBox from "components/SoftBox";
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";

function  EditUsuario () {
    const routeParams = useParams();
    const {id} = routeParams;
    const [usuario, setUsuario] = useState({})
    const [rows, setRows] = useState([])
    const navigate = useNavigate();
    
    const getData = async()=>{
        const data = await clienteAxios.get('users/'+id);
        let respData = data.data
        setUsuario(respData)
    }

    useEffect(()=>{
        getData()
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        clienteAxios.put('users/'+id, usuario)
            .then(resp =>{
                succesSwal()
                navigate(`/usuarios`)
            })
            .catch((e)=>{
                console.log(e);
                errorSwal()
            });
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
                                        name="name"
                                        type="text"
                                        value={usuario.name} 
                                        fullWidth label="Nombre Del Usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox> 
                            </Grid>
                            <Grid  item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="email"
                                    value={usuario.email} 
                                    fullWidth label="Email del usuario" InputLabelProps={{ shrink: true }} variant="standard" 
                                    onChange={(e)=>handleChange(e)}
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
                                        name="role"
                                        value={usuario.role} 
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'role',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option  value=''>Seleccione</option>
                                        <option  value='administrator'>administrador</option>
                                        <option  value='SuperAdmin'>SuperAdmin</option>
                                        <option  value='vendedor'>vendedor</option>
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
export default EditUsuario
