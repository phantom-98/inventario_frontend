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
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from "react-redux";
import { loadingAction } from "actions/helperActions";
import clienteAxios from 'config/axios';
import CircularProgress from '@mui/material/CircularProgress';


function OrdenDeCompra  () {
    const navigate = useNavigate();
    const [order, setOrder] = useState({})
    const [productos, setProductos] = useState([])
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [rowsProvider, setrowsProvider] = useState([])

    function sleep(delay = 0) {
        return new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
    }
    const onSubmit = e => {
        e.preventDefault()
        console.log(order)
        clienteAxios.post('order', order)
            .then(resp =>{
                succesSwal()
                navigate(`/abastecimiento`);
            })
            .catch((e)=>{
                errorSwal(e.response.data.msg)
            });
    };
    const handleChange=e=>{
        const {name, value}=e.target;
        setOrder(prevState=>({
            ...prevState,
            [name]: value
        }))
    }
    const getProductos = async()=>{
  
        dispatch(loadingAction())
        const data = await clienteAxios.get('product/');
        dispatch(loadingAction())
        let respData = data.data
      
        setProductos(respData)
        console.log(productos)
    }
    const getProvider = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('provider/');
        dispatch(loadingAction())
        let respData = data.data
       

        setrowsProvider(respData)
    }

    useEffect(() =>{
        getProductos()
        getProvider()
    },[])

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }    
        (async () => {
            await sleep(1e3); // For demo purposes.
      
            if (active) {
              setOptions([...productos]);
            }
          })();
      
          return () => {
            active = false;
          };
    }, [loading]);  
        
        useEffect(() => {
            if (!open) {
              setOptions([]);
            }
          }, [open]);


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
                                name="Proveedor"
                                sx={{ input: { color: "white", width: "100%" } }}
                                fullWidth
                                inputProps={{
                                    name: 'Proveedor',
                                    id: 'Proveedor',
                                }}
                            >
                                <option  value='' >Seleccione...</option>
                                { rowsProvider.map(c => (<option key={c.id} value={c.name}>{c.name}</option>))}
                            </NativeSelect>
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                        <InputLabel variant="standard" htmlFor="Producto">
                            Productos
                        </InputLabel>
                        <Autocomplete
                            id="asynchronous-demo"
                            sx={{ input: { color: "white", width: "100%" } }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                            getOptionLabel={(option) => option.nombre}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                key={params.sku}
                                {...params}
                                label="Buscar Producto"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                    ),
                                }}
                                />
                            )}
                        />
                        </SoftBox>
                    </Grid>
                    <Grid   item xs={12} md={6} xl={6}>
                        <SoftBox mb={2}>
                            <InputLabel variant="standard" htmlFor="Cantidad">
                                Cantidad
                            </InputLabel>
                            <TextField 
                                name="Cantidad"
                                type="number"
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
                                name="Precio"
                                type="number"
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
                                name="Total"
                                type="number"
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

export default OrdenDeCompra