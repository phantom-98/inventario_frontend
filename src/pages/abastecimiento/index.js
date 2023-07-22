
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { muiOptions,  columnsFunc, columnsFunc2 } from "components/DataTable/options"
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"
import MUIDataTable from "mui-datatables";
import Header from "./components/Header";
import { loadingAction } from "actions/helperActions";
import { useDispatch } from "react-redux";
import {dateFormat, dateClose, dateFormat2, insertarPuntos, mapDte} from "../../config/helpers.js"
import Tooltip from '@mui/material/Tooltip';
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

function Abastecimiento() {
    const [tabValue, setTabValue] = useState(1);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([])
    const [rowsProvider, setrowsProvider] = useState([])
    const [rows2, setRows2] = useState([])
    const [rows3, setRows3] = useState([])
    const [rowsFactura, setrowsFactura] = useState([])
    const [showCard, setShowCard] = useState("orderCompra")
    const [showCard2, setShowCard2] = useState("list")
    
    const getData = async()=>{
        //dispatch(loadingAction())
        const data = await clienteAxios.get('product/');
        //dispatch(loadingAction())
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.sku, r.codigoBarra, r.nombre, r.laboratorio, r.stock, `$ ${r.precio}`, `$ ${r.precioOferta}`, r.uid]
        })

        setRows(tempRows)
    }
    const getProvider = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('provider/');
        dispatch(loadingAction())
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.name, r.RUTRecep, r.email, r.creditCondition, r.uid]
        })

        setrowsProvider(tempRows)

        const data2 = await clienteAxios.get('factura/getPerMonthandProvider');
        let respData2 = data2.data.pagadas
        let respData3 = data2.data.no
        let countJul = 0
        let countAg = 0
        let countSep = 0
        let countTo = 0
        let test = tempRows.map(e => {
            let total = (respData2[e[0]]?.Julio ?respData2[e[0]].Julio:0 ) + (respData2[e[0]]?.Agosto? respData2[e[0]].Agosto : 0) + (respData2[e[0]]?.Septiembre? respData2[e[0]].Septiembre:0); 
            countJul += respData2[e[0]]?.Julio ?respData2[e[0]].Julio:0
            countAg += respData2[e[0]]?.Agosto ?respData2[e[0]].Agosto:0
            countSep += respData2[e[0]]?.Septiembre ?respData2[e[0]].Septiembre:0
            countTo += total
            return[e[0],  `$ ${insertarPuntos(respData2[e[0]]?.Julio)}`, `$ ${insertarPuntos(respData2[e[0]]?.Agosto)}`, `$ ${insertarPuntos(respData2[e[0]]?.Septiembre)}`, `$ ${insertarPuntos(total)}`]
        });

        test.push(["Totals", `$ ${insertarPuntos(countJul)}`, `$ ${insertarPuntos(countAg)}`, `$ ${insertarPuntos(countSep)}`, `$ ${insertarPuntos(countTo)}`])
       
        console.log(test)
        
        setRows2(test)

        countJul = 0
        countAg = 0
        countSep = 0
        countTo = 0
        let test2 = tempRows.map(e => {
            let total = (respData3[e[0]]?.Julio ?respData3[e[0]].Julio:0 ) + (respData3[e[0]]?.Agosto? respData3[e[0]].Agosto : 0) + (respData3[e[0]]?.Septiembre? respData3[e[0]].Septiembre:0); 
            countJul += respData2[e[0]]?.Julio ?respData2[e[0]].Julio:0
            countAg += respData2[e[0]]?.Agosto ?respData2[e[0]].Agosto:0
            countSep += respData2[e[0]]?.Septiembre ?respData2[e[0]].Septiembre:0
            countTo += total
            return[e[0],  `$ ${insertarPuntos(respData3[e[0]]?.Julio)}`, `$ ${insertarPuntos(respData3[e[0]]?.Agosto)}`, `$ ${insertarPuntos(respData3[e[0]]?.Septiembre)}`, `$ ${insertarPuntos(total)}`]
        });
        test2.push(["Totals", `$ ${insertarPuntos(countJul)}`, `$ ${insertarPuntos(countAg)}`, `$ ${insertarPuntos(countSep)}`, `$ ${insertarPuntos(countTo)}`])
       
        
        setRows3(test2)
    }

    const getFacturas = async()=>{
        const data = await clienteAxios.get('factura/getReceivedDteforApi3');
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.folio, r.provider?.name, mapDte(r.typeId), dateFormat(r.createdAt), dateFormat(dateClose(r.provider,r.createdAt)), r.totals.MntTotal, dateFormat2(dateClose(r.provider,r.createdAt)), r]
        })

        setrowsFactura(tempRows)
    }
    const getPerMonthandProvider = async ()=>{
        
        dispatch(loadingAction())
        const data = await clienteAxios.get('factura/getPerMonthandProvider');
        dispatch(loadingAction())
        
       
    }

        
    useEffect(()=>{
        getFacturas()
        getData()
        getProvider()
    },[])

    

    const edit = (item)=> {
        
        navigate(`/productos/edit/${item}`);
    }
    const editProvider = (id)=> {
        navigate(`/provider/edit/${id}`);
    }

    const onDelete = (id) => {
        clienteAxios.delete(`/provider/${id}`)
            .then(() => {
            getProvider();
        })
        
    }

    const changeStatus=(id)=>{
        dispatch(loadingAction())
        clienteAxios.put(`/factura/changeStatus/${id}`).then((r) => {
            getFacturas()
            dispatch(loadingAction())
        }).catch(e=>console.log(e))
    }

    const options2 = {rowsPerPageOptions: [15,30,100],}

    const columns2 = [ "Proovedor", "Julio", "Agosto", "Septiembre", "Total"];
    const columns = ["Numero Factura", "Proovedor", "Tipo","Fecha Emision", "Fecha Vencimiento", "Monto", "Mes Vencimiento"];

    columns.push({
        name: "Estado",
        options: {
          filter: true,
          sort: true,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            let status = tableMeta.rowData[6].status ? tableMeta.rowData[6].status :"No Pagada"
            let color = tableMeta.rowData[6].status == "Pagada" ? "success" : "error"
            return (
              <>
                <SoftButton variant="outlined" size="small" color={color} onClick={(e) => changeStatus(tableMeta.rowData[6].uid)}>
                    {status}
                </SoftButton>
              
              </>
            );
          }
        }
    })

    const columnsProvider = columnsFunc2(["Nombre", "Rut", "Email", "Condicion de Credito"], editProvider, 4, onDelete);
    
    let card;
    if (showCard == "orderCompra") {
        card =  <Card>
                    <ListHeader url="/orden_de_compra/create" label="Listado Orden de Compra" buttonText="Agregar +" />
                    <SoftBox>
                        <MUIDataTable
                            options={muiOptions}
                        />
                    </SoftBox>
                </Card>
    } else if(showCard == "consolid") {
        card = <Card>
            <SoftBox>
                    <h5 style={{padding:"30px"}}>Pagadas</h5>
                    <MUIDataTable
                        data={rows2}
                        columns={columns2}
                        options={options2}
                    />
                    <h5 style={{padding:"30px"}}>No Pagadas</h5>
                    <MUIDataTable
                        data={rows3}
                        columns={columns2}
                        options={options2}
                    />
            </SoftBox>
        </Card>
        
    } else if(showCard == "recepcion") {
        card = <Card>
                    
                    <ListHeader url="/factura/receivedDte" mode="AbasRecep" label="Listado Recepcion" buttonText="Actualizar" />
                                    <SoftBox>
                                        <MUIDataTable
                                            data={rowsFactura}
                                            columns={columns}
                                            options={muiOptions}
                                        />
                                    </SoftBox>
                    
                </Card>;
    }else if(showCard == "provider"){
        card = <Card>
            <ListHeader url="/provider/create" label="Listado Provedores" buttonText="Agregar +" />
            <SoftBox>
                <MUIDataTable
                    data={rowsProvider}
                    columns={columnsProvider}
                    options={muiOptions}
                />
            </SoftBox>
        </Card>
    }


  return (
    <DashboardLayout>
     
      <Header setShowCard={setShowCard} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
            {card}
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Abastecimiento;
