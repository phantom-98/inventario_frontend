import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { muiOptions,  columnsFunc5 } from "components/DataTable/options"
import clienteAxios from 'config/axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MUIDataTable from "mui-datatables";
import NestedModal from "components/modal/modalExel";
import { loadingAction } from "actions/helperActions";
import {insertarPuntos, dateFormat} from "../../config/helpers"
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { headert, style, botones } from "./style";
import ListHeader from "components/ListHeader"

import {succesSwal, errorSwal} from 'config/helpers.js'

function ProductPrices() {

    const dispatch = useDispatch();
    const routeParams = useParams();
    const {id} = routeParams;
    const [product, setProduct] = useState({})
    const [prices, setPrices] = useState({})
	const [rows, setRows] = useState([])
	const options = { filterType: 'checkbox' };
	const navigate = useNavigate();

    const getData = async()=>{
        const data = await clienteAxios.get('product/sku/'+id);
        let respData = data.data
        console.log(respData)
        let tempRows = respData.prices.map(r=>{
            return[dateFormat(r.createdAt), r.qty, `$ ${insertarPuntos(r.price)}`, r._id]
        })
        setRows(tempRows)
        setProduct(respData)
    }

    useEffect(()=>{
        getData()
    },[])
    
    const edit = (item)=> {
        setPrices({
			uid: item[3],
			qty: item[1],
			price: Number(item[2].replace("$ ","").replace(".", "")),
		})

		handleOpen()
    }

    const onDelete = (item) => {
		
        let data = {
			uid: item[3],
			qty: item[1],
		}

        clienteAxios.put(`/product/deletePrices/`+id, data).then((resp) => {
            console.log(resp.data)
            location.reload()
        })
    }

    const columns = columnsFunc5(["Fecha", "Cantidad", "Costo Neto"],onDelete);
	
	const [open, setOpen] =useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
	const onSubmitPrices = data => {
        clienteAxios.put('product/prices/'+id, prices).then(resp =>{
			console.log(resp)
			let tempRows = resp.data.prices.map(r=>{
				return[dateFormat(r.createdAt), r.qty, `$ ${insertarPuntos(r.price)}`]
			})
			setRows(tempRows)
			location.reload()
			succesSwal()
		}).catch((e)=>{
			console.log(e);
			errorSwal()
		});
    };
	

	const handleChangePrices=e=>{
		const {name, value}=e.target;
		setPrices(prevState=>({ ...prevState, [name]: value }))
	}

	const addPrice = ()=>{
		setPrices({})
		handleOpen()
	}


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card  >
                        <div style={headert}>
                            <h6> Ingreso De Precios: {product.nombre} </h6>
                            <div style={botones}>
                                <ListHeader url="/inventario" buttonText="Regresar" />
                                <SoftButton onClick={()=>addPrice()} variant="outlined" color="info" size="small">
                                
                                    Agregar +</SoftButton>
                            </div>
                                
                            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Agregar Precios
                                    </Typography>
                                    <SoftBox p={2} component="form" role="form" onSubmit={onSubmitPrices}>
                                        <Grid   item xs={12} md={6} xl={6}>
                                            <SoftBox mb={2}> 
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <TextField 
                                                        name="qty"
														value={prices.qty || 0} 
                                                        type="number"
                                                        onChange={(e)=>handleChangePrices(e)}
                                                        fullWidth label="Cantidad" InputLabelProps={{ shrink: true }} variant="standard" 
                                                        style={{paddingTop:"0.15rem"}}
                                                    />
                                                </Typography>
                                            </SoftBox>
                                        </Grid> 
                                        <Grid   item xs={12} md={6} xl={6}>
                                            <SoftBox mb={2}> 
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <TextField 
                                                        name="price"
														value={prices.price || 0} 
                                                        type="number"
                                                        onChange={(e)=>handleChangePrices(e)}
                                                        fullWidth label="Precio" InputLabelProps={{ shrink: true }} variant="standard" 
                                                        style={{paddingTop:"0.15rem"}}
                                                    />
                                                </Typography>
                                            </SoftBox>
                                        </Grid> 
                                        <SoftBox mt={4} mb={1}>
                                            <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
                                        </SoftBox>
                                    </SoftBox>
                                </Box>
                            </Modal>
                        </div>
                        <MUIDataTable data={rows} columns={columns} options={options}/>
                    </Card>           
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
    );
}

export default ProductPrices;
