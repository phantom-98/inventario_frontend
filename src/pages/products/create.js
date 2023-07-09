import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTiendas } from "../../actions/storeActions"

import clienteAxios from 'config/axios';

import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";
import {formSchema} from "./formSchema.js"
import FormComponent from "components/Form"
import ListHeader from "components/ListHeader"
import Grid from "@mui/material/Grid";
import SoftButton from "components/SoftButton";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const check ={
    display: 'flex',
    justifyContent: 'space-around',
    padding: 30

}


function create() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({})


    const onSubmit = e => {
        e.preventDefault()
        console.log(product)
        clienteAxios.post('product', product)
            .then(resp =>{
                succesSwal()
                //navigate(`/inventario`);
            })
            .catch((e)=>{
                errorSwal(e.response.data.msg)
            });
    };
    const handleChange=e=>{

        const {name, value}=e.target;
        setProduct(prevState=>({
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
                                    name="sku"
                                    type="number"
                                    fullWidth label="Sku" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                    onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="nombre"
                                    fullWidth label="Nombre Del Producto" InputLabelProps={{ shrink: true }} variant="standard" 
                                    onChange={(e)=>handleChange(e)}
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="laboratorio"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="laboratorio" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="stock"
                                    type="number"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="Cantidad De Productos Disponible" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="codigoBarra"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="codigoBarra" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="precio"
                                    type="number"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="precio" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            



                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="precioOferta"
                                    type="number"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="Precio Oferta" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="cpp"
                                    type="number"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="Costo Promedio Ponderado" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="fechaVencimiento"
                                    type="date"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="Fecha Vencimiento" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Control Legal
                                    </InputLabel>
                                    <NativeSelect
                                     onChange={(e)=>handleChange(e)}
                                        name="controlLegal"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                        >
                                             <option  value=''>Seleccione</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                           
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Impuesto Extra
                                    </InputLabel>
                                    <NativeSelect
                                     onChange={(e)=>handleChange(e)}
                                        name="impuestoExtra"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                        >
                                        <option value="">Seleccione</option>
                                        <option value="10">Bebidas analcoholicas y minerales con edulcorante</option>
                                        <option value="18">Bebidas analcoholicas y minerales con elevado contenido de azucares</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid  style={check} xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <FormControlLabel   name="petitorioMin" control={<Checkbox name="petitorioMin"  onChange={(e)=>handleChange(e)}  />} label="Petitorio Minimo" />
                                </SoftBox>
                                <SoftBox >
                                    <FormControlLabel   name="refrigerado" control={<Checkbox  name="refrigerado" onChange={(e)=>handleChange(e)} />} label="Refrigerado" />
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
    );
}

export default create;