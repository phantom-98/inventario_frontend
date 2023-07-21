
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
import {dateFormat, dateClose, dateFormat2} from "../../config/helpers.js"
import Tooltip from '@mui/material/Tooltip';
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
function Abastecimiento() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([])
    const [rowsProvider, setrowsProvider] = useState([])
    const [rowsFactura, setrowsFactura] = useState([])
    const [showCard, setShowCard] = useState("orderCompra")
    
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
    }

    const getFacturas = async()=>{
        const data = await clienteAxios.get('factura/getReceivedDteforApi3');
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.folio, r.emisorData?.RznSoc, dateFormat(r.createdAt), dateFormat(dateClose(r.provider,r.createdAt)), r.totals.MntTotal, dateFormat2(dateClose(r.provider,r.createdAt)), r]
        })

        setrowsFactura(tempRows)
    }

        
    useEffect(()=>{
        getData()
        getFacturas()
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


    const columns = ["Numero Factura", "Proovedor", "Fecha Emision", "Fecha Vencimiento", "Monto", "Mes Vencimiento"];
    columns.push({
        name: "Estado",
        options: {
          filter: false,
          sort: false,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            let status = tableMeta.rowData[6].status ? tableMeta.rowData[6].status :"No Pagada"
            let color = tableMeta.rowData[6].status == "Pagada" ? "success" : "error"
            return (
              <>
                <SoftButton variant="outlined"  size="small" color={color} onClick={(e) => changeStatus(tableMeta.rowData[6].uid)}>
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
