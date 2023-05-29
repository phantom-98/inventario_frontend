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

function CreateClientes() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]) 
    const [products, setProducts] = useState([]) 
    
    const getData = async()=>{
        const dataC = await clienteAxios.get('client/');
        setClients(dataC.data)

        

        const dataP = await clienteAxios.get('product/');
        setProducts(dataP.data)
    }
    
    useEffect(()=>{
        getData()
    },[])
    

   
    
    const onSubmit = data => {
        console.log(data);
        clienteAxios.post('client', data)
            .then(resp =>{
                succesSwal()
                navigate(`/clientes`);
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


    const TAX_RATE = 0.07;

    function ccyFormat(num: number) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty: number, unit: number) {
        return qty * unit;
    }

    function createRow(desc: string, qty: number, unit: number) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    interface Row {
    desc: string;
    qty: number;
    unit: number;
    price: number;
    }

    function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const rows = [
        createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),
    ];

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <ListHeader url="/clientes" label="Crear Factura" buttonText="Regresar" />
                        <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                {
                                    formSchema.map((f, i) => 
                                        <Grid key={`formsControl${i}`}  item xs={12} md={6} xl={6}>
                                            <SoftBox mb={2}>
                                            { f.type == "select" 
                                                ?   <>
                                                    <select className="form-select"  {...register(f.value, { required: true })}>
                                                        { f.options.map((o, k) => <option key={`oo${k}`}  value={o.value}>{o.label}</option> )}
                                                    </select>
                                                    {errors[`${f.value}`]?.type === 'required' && <small className="alert alert-danger" role="alert">{f.label} es requerido</small>}
                                                    </>
                                                    
                                                :  <>

                                                    <TextField  fullWidth label={f.label} variant="standard" 
                                                    {...register(f.value, { required: true })} aria-invalid={errors[`${f.value}`] ? "true" : "false"} 
                                                    style={{paddingTop:"0.15rem"}}/>
                                                    {errors[`${f.value}`]?.type === 'required' && <small className="alert alert-danger" role="alert">{f.label} es requerido</small>}
                                                    </>
                                            }
                                            </SoftBox>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                <TableHead>
                               
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.desc}>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell align="right">{row.qty}</TableCell>
                                    <TableCell align="right">{row.unit}</TableCell>
                                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Neto</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Impuesto</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            <br/>
                            <br/>
                            </TableContainer>
                            
                            <br/>
                            <SoftBox mt={4} mb={1}>
                                <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                            </SoftBox>
                        </SoftBox>
                        <div>
                        
                        </div>
                    </Card>
                </SoftBox>
            </SoftBox>
      </DashboardLayout>
    );
}

export default CreateClientes;