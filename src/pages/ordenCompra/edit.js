import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function OrdenDeCompra  () {
    const navigate = useNavigate();
    const routeParams = useParams();
    const {id} = routeParams;
    const [order, setOrder] = useState({
        Proveedor: "",
        Producto: "",
        Cantidad: 0,
        Precio: 0,
        Total: 0,
    })

    const getData = async()=>{
        const data = await clienteAxios.get('order/'+id);
        let respData = data.data

        setProduct(respData)
    }
    useEffect(()=>{
        getData()
      },[])

      const onSubmit = data => {
        //handleOpen()
          clienteAxios.put('order/'+id, order)
              .then(resp =>{
                  //handleClose()
                  console.log(resp)
                  succesSwal()
                  //navigate(`/inventario`);
              })
              .catch((e)=>{
                  //handleClose()
                  console.log(e);
                  errorSwal()
              });
      };


    const handleChange=e=>{
        const {name, value}=e.target;
        setOrder(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Grid container spacing={2}>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                            <InputLabel variant="standard" htmlFor="Proveedor">
                                Proveedor
                            </InputLabel>
                            <NativeSelect
                                onChange={(e)=>handleChange(e)}
                                name="proveedor"
                                value={order.Proveedor || ''} 
                                sx={{ input: { color: "white", width: "100%" } }}
                                fullWidth
                                inputProps={{
                                    name: 'Proveedor',
                                    id: 'Proveedor',
                                }}
                            >
                                <option  value='' >Seleccione...</option>
                                <option  value='x'>x</option>
                                <option  value='y'>y</option>
                            </NativeSelect>
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                        <InputLabel variant="standard" htmlFor="Producto">
                            Producto
                        </InputLabel>
                            <TextField 
                                inputProps={{
                                    name: 'Producto', id: 'Producto',
                                }}
                                name="producto"
                                value={order.Producto || ''} 
                                type="text"
                                fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                                onChange={(e)=>handleChange(e)}
                            />
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                            <InputLabel variant="standard" htmlFor="Cantidad">
                                Cantidad
                            </InputLabel>
                            <TextField 
                                name="cantidad"
                                type="number"
                                value={order.Cantidad || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                                inputProps={{
                                    name: 'Cantidad',
                                    id: 'Cantidad',
                                }}
                            />
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                            <InputLabel variant="standard" htmlFor="Precio">
                                Precio
                            </InputLabel>
                            <TextField 
                                name="precio"
                                type="number"
                                value={order.Precio || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                                inputProps={{
                                    name: 'Precio',
                                    id: 'Precio',
                                }}
                            />
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                            <InputLabel variant="standard" htmlFor="Total">
                                Total
                            </InputLabel>
                            <TextField 
                                name="total"
                                type="number"
                                value={order.Total || ''} 
                                onChange={(e)=>handleChange(e)}
                                fullWidth  InputLabelProps={{ shrink: true }} variant="standard" 
                                style={{paddingTop:"0.15rem"}}
                                inputProps={{
                                    name: 'Total',
                                    id: 'Total',
                                }}
                            />
                        </SoftBox>
                    </Grid>
                </Grid>
                <SoftBox mt={4} mb={1}>
                    <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
        
    )
}