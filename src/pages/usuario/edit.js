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
import clienteAxiosAuth from "config/axiosAuth";
import axios from "axios";

function  EditUsuario () {
    const routeParams = useParams();
    const {id} = routeParams;
    const [usuario, setUsuario] = useState({email:'',first_name:'',profileType:''})
    const [profileOptions, setProfileOptions] = useState([])
    const [rows, setRows] = useState([])
    const navigate = useNavigate();
    
    const getData = async()=>{
        const data = await clienteAxiosAuth.get(`${id}`);
        //const data = await clienteAxios.get('users/64b413eeb7e38b5f4a80ac3f');
        let respData = data.data
        setUsuario({email:respData.email,first_name: respData.first_name, profileId:respData.profile.id})
        console.log(usuario);
        const profileData = await axios.get('http://localhost:4001/profile')
        setProfileOptions(profileData.data.data)
        console.log(profileData.data.data);
    }

    useEffect(()=>{
        getData()
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        clienteAxiosAuth.put(`${id}`, usuario)
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
        /* setUsuario(prevState=>({
            ...prevState,
            [name]: value
        })) */
        if(name === 'profileId') {
            const auxValue = parseInt(value)
            setUsuario(prevState=>({
                ...prevState,
                [name]: auxValue
            }))
            
        }else {
            setUsuario(prevState=>({
                ...prevState,
                [name]: value
            }))
        }
        
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
                                        value={usuario.first_name} 
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
                            <Grid  item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="password"
                                    defaultValue={""} 
                                    fullWidth label="Contraseña del usuario" InputLabelProps={{ shrink: true }} variant="standard" 
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
                                        name="profileId"
                                        value={usuario.profileId} 
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        
                                        inputProps={{
                                            name: 'profileId',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option  value=''>Seleccione</option>
                                        { profileOptions.map(profile => <option key={profile.id} value={profile.id}>{profile.type}</option>)}
                                        
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
