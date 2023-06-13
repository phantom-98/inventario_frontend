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

function EditClientes() {
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
    
    const getData = async()=>{
      const data = await clienteAxios.get('product/sku/'+id);
      let respData = data.data
      setProduct(respData)
  
      
    }

    
    useEffect(()=>{
      getData()
    },[])

    
    const onSubmit = data => {
      handleOpen()
        clienteAxios.put('product/sku/'+id, product)
            .then(resp =>{
                console.log(resp)
                succesSwal()
                handleClose()
                navigate(`/inventario`);
            })
            .catch((e)=>{
              handleClose()
                console.log(e);
                errorSwal()
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
                <ListHeader url="/inventario" label="Editar Cliente" buttonText="Regresar" />
                <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid   item xs={12} md={6} xl={6}>
                      <SoftBox mb={2}>
                        <TextField 
                          InputProps={{ readOnly: true}}
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
                          type="precio"
                          name="stock"
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

export default EditClientes;