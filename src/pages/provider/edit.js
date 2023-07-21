import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import { formSchema } from "./formSchema";
import FormComponent from "components/Form"
import ListHeader from "components/ListHeader"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import clienteAxios from 'config/axios';
import { Provider } from "react-redux";
import SoftButton from "components/SoftButton";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';

import { useEffect, useState } from "react";
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useParams } from "react-router-dom";

const edit = () => {
    const navigate = useNavigate();
    
    const [provider, setProvider] = useState({})
    const routeParams = useParams();
    const {id} = routeParams;
    

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(provider);
        clienteAxios.put('provider/'+id, provider)
            .then(resp =>{
                succesSwal()
                navigate(`/abastecimiento`);
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
    const handleChange=e=>{

        const {name, value}=e.target;
        setProvider(prevState=>({
            ...prevState,
            [name]: value
        }))
    }
    const getData = async()=>{
        const data = await clienteAxios.get('provider/'+id);
        let respData = data.data
        setProvider(respData)
    
        
      }


    useEffect(()=>{
        getData()
    },[])
  
      
    
    return (

        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}component="form" role="form" schema={formSchema} onSubmit={onSubmit}>
            <SoftBox p={2} >
                    <Grid container spacing={2}>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <TextField 
                                name="name"
                                value={provider.name || ''} 
                                fullWidth label="Nombre del Proveedor" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                                onChange={(e)=>handleChange(e)}
                                />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="RUTRecep"
                                value={provider.RUTRecep || ''} 
                                fullWidth label="Rut" InputLabelProps={{ shrink: true }} variant="standard" 
                                onChange={(e)=>handleChange(e)}
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="email"
                                value={provider.email || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth label="Email de Provedroes" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="bankName"
                                value={provider.bankName || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth label="Nombre de la Cuenta de Banco" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="accountType"
                                value={provider.accountType || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth label="Tipo de Cuenta" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="accountNumber"
                                value={provider.accountNumber || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth label="Numero De Cuenta" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="rut"
                                onChange={(e)=>handleChange(e)}
                                value={provider.rut || ''} 
                                fullWidth label="Rut" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="RznSocRecep"
                                value={provider.RznSocRecep || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth label="Razon social" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="GiroRecep"
                                onChange={(e)=>handleChange(e)}
                                value={provider.GiroRecep || ''} 
                                fullWidth label="GiroRecep" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            <TextField 
                                name="DirRecep"
                                onChange={(e)=>handleChange(e)}
                                value={provider.DirRecep || ''} 
                                fullWidth label="DirRecep" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                        <Grid   item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                                <InputLabel variant="standard" htmlFor="creditCondition">
                                    CmnaRecep
                                </InputLabel>
                                <TextField 
                                    name="CmnaRecep"
                                    value={provider.CmnaRecep || ''} 
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="creditCondition">
                                        Condicion De Credito
                                    </InputLabel>
                                    <NativeSelect
                                        onChange={(e)=>handleChange(e)}
                                        name="creditCondition"
                                        sx={{ input: { color: "white", width: "100%", paddingTop:"0.20rem"} }}
                                        fullWidth
                                        
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            value: provider.creditCondition,
                                            name: 'creditCondition',
                                            id: 'creditCondition',
                                        }}
                                    >
                                          <option  value='Contado'>Contado</option>
                                          <option  value='30'>30</option>
                                          <option  value='60'>60</option>
                                    </NativeSelect>
                                </SoftBox>
                            </Grid>
                        <Grid   item xs={12} md={12} xl={12}>
                            <SoftBox mb={12}>
                            <TextField 
                                type="textarea"
                                name="observaciones"
                                onChange={(e)=>handleChange(e)}
                                value={provider.observaciones || ''} 
                                fullWidth label="observaciones" InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                            />
                            </SoftBox>
                        </Grid>
                    </Grid>
                    <SoftBox mt={4} mb={1}>
                        <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                    </SoftBox>
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
    );
}
export default edit
