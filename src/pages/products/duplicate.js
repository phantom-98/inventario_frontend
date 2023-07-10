import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTiendas } from "../../actions/storeActions"
import clienteAxios from 'config/axios';
import {formSchema} from "./formSchema.js"
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";
import FormComponent from "components/Form"
import ListHeader from "components/ListHeader"
import SoftButton from "components/SoftButton";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Margin } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MUIDataTable from "mui-datatables";
import {insertarPuntos, dateFormat} from "../../config/helpers"
const check ={
    display: 'flex',
    justifyContent: 'space-around',
    padding: 30

}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
  
const headert={
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
    margin: '10px'
}


function DuplicarProducto() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const {id} = routeParams;
    const [product, setProduct] = useState({
      sku:"",
      nombre: "",
      laboratorio: "",
      stock: 0,
      precio: 0,
      precioOferta: 0,
    })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const columns = ["Fecha", "Cantidad", "Precio", ];
    const [rows, setRows] = useState([])

    const getData = async()=>{
      const data = await clienteAxios.get('product/sku/'+id);
      let respData = data.data
      console.log(data)

      setProduct(respData)
    }
  
    useEffect(()=>{
      getData()
    },[])

    const onSubmit = e => {
      console.log(product)
      delete product['uid']
      delete product['prices']

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

      const {name, value}=e.target;
      setProduct(prevState=>({
        ...prevState,
        [name]: value
      }))
    }
    //TODO set on Redux
    const [open, setOpen] =useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const options = {
        filterType: 'checkbox',
      };
    
    return (
        <DashboardLayout>
           <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
               
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <ListHeader url="/inventario" label="Editar Producto" buttonText="Regresar" />
                <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          InputProps={{ shrink: true}}
                          name="sku"
                          fullWidth label="SKU" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.sku || ''} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          name="nombre"
                          fullWidth label="Nombre" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.nombre || ''} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          name="laboratorio"
                          fullWidth label="Laboratorio" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.laboratorio || ''} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          type="number"
                          name="stock"
                          fullWidth label="Stock" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.stock || 0} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                        <TextField 
                            name="codigoBarra"
                            value={product.codigoBarra} 
                            onChange={(e)=>handleChange(e)}
                            fullWidth label="codigoBarra" InputLabelProps={{ shrink: true }} variant="standard" 
                            style={{paddingTop:"0.15rem"}}
                        />
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          type="precio"
                          name="precio"
                          fullWidth label="Precio" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.precio || 0} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          type="number"
                          name="precioOferta"
                          fullWidth label="Precio Oferta" InputLabelProps={{ shrink: true }} variant="standard" 
                          value={product.precioOferta || 0} 
                          onChange={(e)=>handleChange(e)}
                          style={{paddingTop:"0.15rem"}}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <TextField 
                                    name="cpp"
                                    value={product.cpp} 
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
                                    value={product.fechaVencimiento} 
                                    type="date"
                                    onChange={(e)=>handleChange(e)}
                                    fullWidth label="Fecha Vencimiento" InputLabelProps={{ shrink: true }} variant="standard" 
                                    style={{paddingTop:"0.15rem"}}
                                />
                                </SoftBox>
                            </Grid>
                            <Grid   item  md={6} xl={6}>
                                <Box sx={{ minWidth: '100%' }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Control Legal
                                        </InputLabel>
                                        <NativeSelect
                                         onChange={(e)=>handleChange(e)}
                                          name="controlLegal"
                                        fullWidth
                                        defaultValue={'ninguna'}
                                        inputProps={{
                                            name: 'controlLegal',
                                            value:product.controlLegal,
                                            id: 'uncontrolled-native',
                                        }}
                                        >
                                        <option value={'ninguna'}>Ninguna</option>
                                        <option value={'sicotropico'}>Sicotropico</option>
                                        <option value={'estupefaciente'}>Estupefacientes</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid   item xs={12} md={6} xl={6}>
                                <SoftBox mb={2}>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Impuesto Extra
                                    </InputLabel>
                                    <NativeSelect
                                     name="impuestoExtra"
                                     onChange={(e)=>handleChange(e)}
                                        sx={{ input: { color: "white", width: "100%" } }}
                                        fullWidth
                                       
                                        inputProps={{
                                            name: 'impuestoExtra',
                                            value:product.impuestoExtra,
                                            id: 'uncontrolled-native',
                                        }}
                                        >
                                        <option value="">Seleccione</option>
                                        <option value={"10"}>Bebidas analcoholicas y minerales con edulcorante 10%</option>
                                        <option value={"18"}>Bebidas analcoholicas y minerales con elevado contenido de azucares 18%</option>
                                    </NativeSelect>
                                </SoftBox>
                            </Grid>
                            <Grid  style={check} xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <input name="petitorioMin" type="checkbox" onChange={(e)=>handleChange(e)} checked={product.petitorioMin} value="1" /> Peritorio Minimo
                                </SoftBox>
                                <SoftBox >
                                    <input name="refrigerado" type="checkbox" onChange={(e)=>handleChange(e)} checked={product.refrigerado} value="1" /> Refrigerado
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

export default DuplicarProducto;