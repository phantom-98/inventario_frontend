import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clienteAxios from 'config/axios';
import ListHeader from "./Header/ListHeader"
import HeaderVentas from "./Header/headerVentas";

import MUIDataTable from "mui-datatables";
import { muiOptions,  columnsFunc4 } from "components/DataTable/options"
import {insertarPuntos, dateFormat, itemListWeb, itemListPos} from "../../config/helpers"
import { loadingAction } from "actions/helperActions";
import { Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import tableData from './../tiendas/storeTableData';
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const logo = {
    width: '480px',
    marginTop: '5px',
    marginBottom: '5px',
  }
  const tabla ={
    width: '150%',
    padding: '10px',
    fontSize: '100px'   
  }
  const td ={
    width: '140px'
  }
  const tr = {
    borderStyle: 'solid none' ,
    borderWidth: '1px',
    borderColor: 'black',
    fontSize: '13px',
  }
  const tablaf ={
    width:'100%',
    borderStyle: 'solid' ,
    borderWidth: '1px',
    borderColor: 'black',
    padding: '10px',   
  }
  const tdf2 ={
    fontSize: '12px',
    paddingTop: '10px',
  }
  const tdf1 ={
    textAlign: 'center',
    paddingTop: '10px',
    fontSize: '12px'
  }

function Ventas() {
    const dispatch = useDispatch();

    const [dataRow, setDataRow] = useState([]) 
    const [dataRowF, setDataRowF] = useState([]) 
    const [showCard, setShowCard] = useState("web")
    const [venta, setVenta] = useState({items:[]})

    


    
    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all3');
        let respData = data.data
        //console.log(respData.boletas)
        let tempRows = respData.boletas.map(r=>{
            return[r.counter, dateFormat(r.createdAt), itemListWeb(r.items) ,`$ ${insertarPuntos(r.totals?.MntTotal)}`, r.client?.RUTRecep, r.url,r.uid]
        })

        let tempRows2 = respData.sales.map(r=>{
            let items = r.items.map(i=>{
                return {
                    producto: i.productName,
                    cantidad: i.qty,
                    precio: i.price,
                }
            })
            return[dateFormat(r.createdAt), r.payType, itemListPos(r.items),`$ ${insertarPuntos(r.total)}`,  r.clientRut, r.uid, JSON.stringify(items)]
        })

        setDataRow(tempRows)
        setDataRowF(tempRows2)
        dispatch(loadingAction())
    }
    useEffect(()=>{
        const currentDate = moment();
        const firstDayOfMonth = currentDate.clone().startOf('month');
        const lastdayMonth = currentDate.clone().endOf('month');

        filterWeb({
            startAt: firstDayOfMonth.format("YYYY-MM-DD"),
            endAt: lastdayMonth.format("YYYY-MM-DD")
        })
        filterPos({
            startAt: firstDayOfMonth.format("YYYY-MM-DD"),
            endAt: lastdayMonth.format("YYYY-MM-DD")
        })
        //getFactura()
    },[])         

    const filterWeb = async(dateRange) =>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all3');
        let respData = data.data
        //console.log(respData.boletas)
        let tempRows = respData.boletas.map(r=>{
            return[r.counter, dateFormat(r.createdAt), itemListWeb(r.items) ,`$ ${insertarPuntos(r.totals?.MntTotal)}`, r.client?.RUTRecep, r.url,r.uid]
        })
        dispatch(loadingAction())

        const filteredData = tempRows.filter((item) => {
            const dateItem = moment(item[1],'DD-MM-YYYY H:mm').format("YYYY-MM-DD")
            const itemDate = new Date(dateItem);
            const start = new Date(dateRange.startAt);
            const end = new Date(dateRange.endAt);
            return itemDate >= start && itemDate <= end;
        });

        setDataRow(filteredData)
    }

    const filterPos = async(dateRange) =>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all3');
        let respData = data.data
        //console.log(respData.boletas)
        let tempRows2 = respData.sales.map(r=>{
            let items = r.items.map(i=>{
                return {
                    producto: i.productName,
                    cantidad: i.qty,
                    precio: i.price,
                }
            })
            return[dateFormat(r.createdAt), r.payType, itemListPos(r.items),`$ ${insertarPuntos(r.total)}`,  r.clientRut, r.uid, JSON.stringify(items)]
        })
        dispatch(loadingAction())

        const filteredData = tempRows2.filter((item) => {
            const dateItem = moment(item[1],'DD-MM-YYYY H:mm').format("YYYY-MM-DD")
            const itemDate = new Date(dateItem);
            const start = new Date(dateRange.startAt);
            const end = new Date(dateRange.endAt);
            return itemDate >= start && itemDate <= end;
        });

        setDataRowF(filteredData)
    }

    const view = async(id)=>{
        let resp = await clienteAxios.get("/sale/"+id)
        let respData = resp.data
        setVenta(respData)
        handleOpen();
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const columns = ["#", "Fecha", "Productos", "Total", "Rut"];
    columns.push({
    
        name: "Boleta",
        options: {
          filter: false,
          sort: false,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            return (
              <>
                <SoftButton variant="text" color="dark" onClick={(e) => window.open(tableMeta.rowData[5])}>
                  <Tooltip title="boleta">
                    <Icon >archiveIcon</Icon>
                  </Tooltip>
                </SoftButton>
              
              </>
            );
          }
        }
    })
    const columnsF = columnsFunc4(["Fecha", "Tipo de Pago", "Productos", "Total", "Rut"], view);
    columnsF.push({
    
        name: "Ver",
        options: {
          filter: false,
          sort: false,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <SoftButton variant="text" color="dark" onClick={(e) => view(tableMeta.rowData[5])}>
                  <Tooltip title="boleta">
                    <Icon >archiveIcon</Icon>
                  </Tooltip>
                </SoftButton>
              
              </>
            );
          }
        }
      })
    




    let card;
    if (showCard == "web") {
        card =  <Card>
                    <ListHeader url="/productos/create" label="Listado Ventas Web" buttonText="Agregar +"  mode="downloadWeb" filter={filterWeb} />
                    <SoftBox>
                        <MUIDataTable
                            data={dataRow}
                            columns={columns}
                            options={muiOptions}
                        />
                    </SoftBox>
                </Card>
    }else if(showCard == "pos"){
        card =  <Card>
                    <ListHeader url="/provider/create" label="Listado Ventas POS" buttonText="Agregar +" mode="downloadPos" filter={filterPos}  />
                    <SoftBox>
                        <MUIDataTable
                            data={dataRowF}
                            columns={columnsF}
                            options={muiOptions}
                        />
                    </SoftBox>
                </Card>
    }

    return (
        <DashboardLayout>
        <HeaderVentas  setShowCard={setShowCard} />
        <SoftBox py={3}>
            <SoftBox mb={3}>
                {card}
            </SoftBox>
        </SoftBox>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <h5 className="modal-title text-center" id="exampleModalLabel">
                <img src="/static/media/logo.dc83d23100f9c81b98d3.jpeg" style={logo}  alt="waves" />
            </h5>
            <table style={tabla}>
            <tbody>
                <tr>
                    <td style={td}>Nombre:</td>
                    <td><strong>Farmacias Oxfar</strong></td>
                </tr>
                <tr>
                    <td style={td}>Direccion:</td>
                    <td><strong>Antonio Bellet 147, Providencia</strong></td>
                </tr>
                <tr>
                    <td style={td}>Fono:</td>
                    <td><strong>+56 2 2437 0237</strong></td>
                </tr>
                <tr>
                    <td style={td}>Fecha</td>
                    <td><strong>{dateFormat(venta.createdAt)}</strong></td>
                </tr>
                <tr>
                    <td style={td}>Forma de Pago</td>
                    <td><strong>{venta.payType}</strong></td>
                </tr>
                <tr>
                    <td>Boleta</td>
                    <td><strong>{venta.uid}</strong></td>                                 					
                </tr>
            </tbody>
            </table>
            <table style={tablaf} >
                <thead>
                    <tr style={tr} >
                        <th >Esp.</th> 
                        <th >Cant.</th>   
                        <th >Item</th>
                        <th >Valor U.</th>  
                        <th >Desc.</th>   
                        <th >Subtotal</th>   
                    </tr>
                </thead>
                <tbody>
                    {
                        venta.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.valor1}</td>
                              <td>{item.qty}</td>
                              <td>{item.product.nombre}</td>
                              <td>$ {insertarPuntos(item.price)}</td>
                              <td>0</td>
                              <td>$ {insertarPuntos(item.total)}</td>
                            </tr>
                          ))
                    }
                         
                    </tbody>
            </table>
            </Box>
        </Modal>
        </DashboardLayout>
    );
}

export default Ventas;
