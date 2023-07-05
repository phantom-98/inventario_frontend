import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"
import HeaderVentas from "./Header/headerVentas";

import MUIDataTable from "mui-datatables";
import { muiOptions,  columnsFunc } from "components/DataTable/options"
import {insertarPuntos, dateFormat} from "../../config/helpers"
import { loadingAction } from "actions/helperActions";
import { Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
import VentasModal from "./Modal/VentasModal";


function Ventas() {
    const dispatch = useDispatch();

    const [dataRow, setDataRow] = useState([]) 
    const [dataRowF, setDataRowF] = useState([]) 
    const [showCard, setShowCard] = useState("web")
    const [ventas, setVentas] = useState({})



    
    const getData = async()=>{
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/all');
        let respData = data.data
        //console.log(respData.boletas)
        let tempRows = respData.boletas.map(r=>{
            return[dateFormat(r.createdAt), 'WebPay', `$ ${insertarPuntos(r.totals?.MntTotal)}`, r.client?.RUTRecep, r.url,r.uid]
        })

        let tempRows2 = respData.sales.map(r=>{
            return[dateFormat(r.createdAt), r.payType, `$ ${insertarPuntos(r.total)}`, r.clientRut, r.uid]
        })

        setDataRow(tempRows)
        setDataRowF(tempRows2)
        dispatch(loadingAction())
    }


    
    useEffect(()=>{
        getData()
        //getFactura()
    },[])
    
    const navigate = useNavigate();

    const view = (item)=> {
      setVentas(item)

    }


    
    const columns = ["Fecha", "Tipo de Pago", "Total", "Rut"];
    columns.push({
    
        name: "Boleta",
        options: {
          filter: false,
          sort: false,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            return (
              <>
                <SoftButton variant="text" color="dark" onClick={(e) => window.open(tableMeta.rowData[4])}>
                    <Icon >archiveIcon</Icon>
                </SoftButton>
              
              </>
            );
          }
        }
    })
    columns.push({
    
        name: "Ver",
        options: {
          filter: false,
          sort: false,
          empty: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            return (
              <>
                <SoftButton variant="text" color="dark" onClick={(e) => view(tableMeta.rowData[5])}>
                   
                    <VentasModal 
                      setVentas= {setVentas}
                    />
                </SoftButton>
              
              </>
            );
          }
        }
      })
    

    const columnsF = columnsFunc(["Fecha", "Tipo de Pago", "Total", "Rut"], view);



    let card;
    if (showCard == "web") {
        card =  <Card>
                    <ListHeader url="/productos/create" label="Listado Ventas Web" buttonText="Agregar +" />
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
                    <ListHeader url="/provider/create" label="Listado Ventas POS" buttonText="Agregar +" />
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
        </DashboardLayout>
    );
}

export default Ventas;
