
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { muiOptions,  columnsFunc } from "components/DataTable/options"
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"
import MUIDataTable from "mui-datatables";
import Header from "./components/Header";


function Abastecimiento() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([])
    const [rowsProvider, setrowsProvider] = useState([])
    const [showCard, setShowCard] = useState("orderCompra")
    
    const getData = async()=>{
        const data = await clienteAxios.get('product/');
        let respData = data.data
        let tempRows = respData.map(r=>{
        return[r.sku, r.codigoBarra, r.nombre, r.laboratorio, r.stock, `$ ${r.precio}`, `$ ${r.precioOferta}`, r.uid]
        })

        setRows(tempRows)
    }
    const getProvider = async()=>{
        const data = await clienteAxios.get('provider/');
        let respData = data.data
        let tempRows = respData.map(r=>{
            return[r.name, r.RUTRecep, r.email, r.uid]
        })

        setrowsProvider(tempRows)
    }
        
    useEffect(()=>{
        getData()
        getProvider()
    },[])

    

    const edit = (item)=> {
        
        navigate(`/productos/edit/${item}`);
    }
    
    const columns = columnsFunc(["Sku", "Codigo de Barra", "Nombre", "Laboratorio", "Stock", "Precio", "Precio Oferta"], edit);

    const columnsProvider = columnsFunc(["Nombre", "Rut", "Email"], edit);
    
    let card;
    if (showCard == "orderCompra") {
        card =  <Card>
                    <ListHeader url="/productos/create" label="Listado Orden de Compra" buttonText="Agregar +" />
                    <SoftBox>
                    
                    </SoftBox>
                </Card>
    } else if(showCard == "recepcion") {
        card = "";
    }else if(showCard == "provider"){
        card = <Card>
            <ListHeader url="/productos/create" label="Listado Provedores" buttonText="Agregar +" />
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
