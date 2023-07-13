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
    const [isChecked, setIsChecked] = useState(false);


    const onSubmit = e => {
        e.preventDefault()
        console.log(product)
        clienteAxios.post('product', product)
            .then(resp =>{
                succesSwal()
                navigate(`/inventario`);
            })
            .catch((e)=>{
                errorSwal(e.response.data.msg)
            });
    };
    const handleChange=e=>{
        setIsChecked(e.target.checked);
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
                                <InputLabel variant="standard" htmlFor="Sku">
                                    Sku
                                </InputLabel>
                                <SoftBox mb={2}>
                                    <TextField 
                                    inputProps={{
                                        name: 'sku', id: 'Sku',
                                    }}
                                    name="sku"
                                    type="number"
                                    fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                    onChange={(e)=>handleChange(e)}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="nombre">
                                        Nombre Del Producto
                                    </InputLabel>
                                    <TextField 
                                        name="nombre"
                                        fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                        onChange={(e)=>handleChange(e)}
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'nombre', id: 'nombre',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Subcategoría
                                    </InputLabel>
                                    <NativeSelect
                                     
                                        onChange={(e)=>handleChange(e)}
                                        name="subcategory"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                            <option value=''>Seleccione...</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                           
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="laboratorio">
                                        Laboratorio
                                    </InputLabel>
                                    <NativeSelect
                                        onChange={(e)=>handleChange(e)}
                                        name="laboratorio"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'laboratorio',
                                            id: 'laboratorio',
                                        }}
                                    >
                                            <option  value=''>Seleccione...</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                                        Tipologia De Consumo
                                    </InputLabel>
                                    <NativeSelect
                                        onChange={(e)=>handleChange(e)}
                                        name="tipologia_consumo"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'tipologia_consumo',
                                            id: 'tipologia_consumo',
                                        }}
                                    >
                                            <option  value=''>Seleccione...</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="stock">
                                        Cantidad De Productos Disponible
                                    </InputLabel>
                                    <TextField 
                                        name="stock"
                                        type="number"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                        
                                        inputProps={{
                                            name: 'stock',
                                            id: 'stock',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="formato">
                                        Formato
                                    </InputLabel>
                                    <NativeSelect
                                        onChange={(e)=>handleChange(e)}
                                        name="formato"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'formato',
                                            id: 'formato',
                                        }}
                                    >
                                            <option  value=''>Seleccione...</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="codigoBarra">
                                        Codigo Barra
                                    </InputLabel>
                                    <TextField 
                                        name="codigoBarra"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'codigoBarra',
                                            id: 'codigoBarra',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="precio">
                                        Precio Del Producto
                                    </InputLabel>
                                    <TextField 
                                        name="precio"
                                        type="number"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'precio',
                                            id: 'precio',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="precioOferta">
                                        Precio Con Oferta
                                    </InputLabel>
                                    <TextField 
                                        name="precioOferta"
                                        type="number"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'precioOferta',
                                            id: 'precioOferta',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="cpp">
                                        Costo Promedio Ponderado
                                    </InputLabel>
                                    <TextField 
                                        name="cpp"
                                        type="number"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'cpp',
                                            id: 'cpp',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="fechaVencimiento">
                                        Fecha Vencimiento
                                    </InputLabel>
                                    <TextField 
                                        name="fechaVencimiento"
                                        type="date"
                                        onChange={(e)=>handleChange(e)}
                                        fullWidth InputLabelProps={{ shrink: true }} variant="standard" 
                                        style={{paddingTop:"0.15rem"}}
                                        inputProps={{
                                            name: 'fechaVencimiento',
                                            id: 'fechaVencimiento',
                                        }}
                                    />
                                </SoftBox>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="controlLegal">
                                        Control Legal
                                    </InputLabel>
                                    <NativeSelect
                                     onChange={(e)=>handleChange(e)}
                                        name="controlLegal"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'controlLegal',
                                            id: 'controlLegal',
                                        }}
                                        >
                                             <option  value=''>Seleccione...</option>
                                            <option  value='sicotropico'>Sicotropico</option>
                                            <option  value='estupefaciente'>Estupefacientes</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                           
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                    <InputLabel variant="standard" htmlFor="impuestoExtra">
                                        Impuesto Extra
                                    </InputLabel>
                                    <NativeSelect
                                     onChange={(e)=>handleChange(e)}
                                        name="impuestoExtra"
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'impuestoExtra',
                                            id: 'impuestoExtra',
                                        }}
                                        >
                                        <option value="">Seleccione...</option>
                                        <option value="10">Bebidas analcoholicas y minerales con edulcorante 10%</option>
                                        <option value="18">Bebidas analcoholicas y minerales con elevado contenido de azucares 18%</option>
                                    </NativeSelect>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid item style={check} xs={12} md={6} xl={6}>
                                <SoftBox>
									<input name="petitorioMin" type="checkbox" onChange={(e)=>handleChange(e)} value="1" /> Peritorio Minimo
                                </SoftBox>
                                <SoftBox >
                                    <input name="refrigerado" type="checkbox" onChange={(e)=>handleChange(e)} value="1" /> Refrigerado
                                </SoftBox>
                                <SoftBox>
                                    <input name="generico" type="checkbox" onChange={(e)=>handleChange(e)} value="1" /> Generico
                                    
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