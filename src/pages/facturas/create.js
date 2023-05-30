import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import fileDownload from 'js-file-download';
import { useEffect, useState } from "react";


import Axios from 'axios';
import clienteAxios from 'config/axios';
import {succesSwal, errorSwal} from 'config/helpers.js'
import { useNavigate } from "react-router-dom";

import ListHeader from "components/ListHeader"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from "@mui/material/Grid";

import SoftButton from "components/SoftButton";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {apiUrl} from "types/"
function CreateClientes() {
    const [open, setOpen] =useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    const navigate = useNavigate();
    const [clients, setClients] = useState([]) 
    const [client, setClient] = useState({}) 
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [qty, setQty] = useState([])
    const [items, setItems] = useState([])
    const [documentType, setDocumentType] = useState(0)
    

    const getData = async()=>{
        const dataC = await clienteAxios.get('client/');
        setClients(dataC.data)
        const dataP = await clienteAxios.get('product/');
        setProducts(dataP.data)
    }
    
    useEffect(()=>{
        getData()
    },[])
    
    const TAX_RATE = 0.19;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }



    function subtotal(items) {
        return items.map(({ MontoItem }) => MontoItem).reduce((sum, i) => sum + i, 0);
    }

    const clientesAutocomplete = clients.map(c=>({
        label: `${c.rut} ${c.razonsocial}`,
        uid: c.uid
    }))

    const productsAutocomplete = products.map(c=>({
        label: `${c.sku} ${c.nombre} - $${c.precio}`,
        uid: c.uid,
        price: c.precio,
        name: `${c.sku} ${c.nombre}`
    }))

    const addProduct = ()=>{
       

        let tempObject = {
            "NmbItem": product.name,
            "QtyItem": qty,
            "PrcItem": product.price,
            "MontoItem": product.price * qty
        }

        setItems(current => [...current, tempObject]);
    }

    const invoiceSubtotal = subtotal(items);
    
   

    const download = (file)=>{
        Axios({
            url:apiUrl +'factura/download/' + file,
            method:"GET",
            responseType:"blob"
        }).then(res=>{
            fileDownload(res.data, file)
        })
    }

    const generateDTE = ()=>{
        
        let data = {
            dte: documentType,
            clientId: client.uid,
            items,
        }
        handleOpen()

        clienteAxios.post('factura', data)
            .then(async resp =>{
                console.log(resp.data)
                download(resp.data)
                handleClose()
                succesSwal()
                //navigate(`/facturas`);
            })
            .catch((e)=>{
                console.log(e.response.data.msg);
                errorSwal()
            });
    }

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
                    <Card id="facturaCard" >
                        <ListHeader url="/clientes" label="Crear Factura" buttonText="Regresar" />
                        <SoftBox p={2} component="form" role="form" >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} xl={6}>
                                    <SoftBox mb={2}>
                                        <select className="form-select selectWM"  onChange={(e)=> setDocumentType(e.target.value)} >
                                            <option>Seleccione Tipo de Documento</option>
                                            <option value="33">Factura Electronica</option>
                                            <option value="52">Guia de despacho</option>
                                            <option value="34">Factura Exenta</option>
                                            <option value="61">Nota de Credito</option>
                                            <option value="39">Boleta</option>
                                        </select>
                                    </SoftBox>
                                </Grid>
                                <Grid   item xs={12} md={6} xl={6}>
                                    <SoftBox mb={2}>
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={clientesAutocomplete}
                                            className="labelAutocomplete"
                                            onChange={(event, newValue) =>  setClient(newValue)}
                                            renderInput={(params) => <TextField {...params} label="Seleccione Clientes" />}
                                        />
                                    </SoftBox>
                                </Grid>
                                <Grid   item xs={12} md={6} xl={6}>
                                    <SoftBox mb={2}>
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={productsAutocomplete}
                                            className="labelAutocomplete"
                                            onChange={(event, newValue) => setProduct(newValue)}
                                            renderInput={(params) => <TextField {...params} label="Seleccione Producto" />}
                                        />
                                    </SoftBox>
                                </Grid>
                                <Grid item xs={6} md={6} xl={6} >
                                    <SoftBox >
                                        <TextField  className="selectWM" label="Cantidad" variant="standard" onChange={(e)=> setQty(e.target.value)} style={{marginTop:"0px",paddingTop:"0.15rem"}}/>
                                        <SoftButton variant="outlined" color="primary" size="small" onClick={()=>addProduct()} style={{margin:"4px 19px"}}>+</SoftButton>
                                    </SoftBox>
                                </Grid>   
                            </Grid>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                <TableHead>
                               
                                <TableRow>
                                 
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Precio + Iva</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {items.map((row, i) => (
                                    <TableRow key={row.NmbItem + i}>
                                        <TableCell>{row.NmbItem}</TableCell>
                                        <TableCell align="right">{row.QtyItem}</TableCell>
                                        <TableCell align="right">{row.PrcItem}</TableCell>
                                        <TableCell align="right">{ccyFormat(row.MontoItem)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                
                                </TableBody>
                            </Table>
                            <br/>
                            <br/>
                            </TableContainer>
                            <SoftBox mt={4} mb={1}>
                                <SoftButton onClick={()=>generateDTE()} variant="gradient" color="dark" style={{float:"right"}} >Crear</SoftButton>
                            </SoftBox>
                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>
      </DashboardLayout>
    );
}

export default CreateClientes;