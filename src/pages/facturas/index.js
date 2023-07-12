
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";

import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";

import { getTiendas } from "../../actions/storeActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "components/DataTable"
import clienteAxios from 'config/axios';
import ListHeader from "components/ListHeader"
import { loadingAction } from "actions/helperActions";
import HeaderFacturas from "./Header/headerFacturas";

import MUIDataTable from "mui-datatables";

function Clientes() {

  const [dataRow, setDataRow] = useState([]) 
  const [rows, setRows] = useState([])
  const [rows2, setRows2] = useState([])
  const [showCard, setShowCard] = useState("Emitido")
  const columns = ["Fecha", "Tipo", "Folio", "Razon Social", "Cliente Rut", "Total"];
  const columnsB = ["Fecha", "Tipo", "Folio", "Razon Social", "Cliente Rut", "Total"];


columns.push({
    
  name: "Action",
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
          <SoftButton variant="text" color="dark" onClick={(e) => edit(tableMeta.rowData[5])}>
              <Icon >edit</Icon>
          </SoftButton>
          <SoftButton variant="text" color="dark" onClick={(e) => (tableMeta.rowData[0])}>
              <Icon >delete</Icon>
          </SoftButton>
        </>
      );
    }
  }
})
const dispatch = useDispatch();

	const getFacturas = async()=>{
		
		const data = await clienteAxios.get('factura/receivedDte');

		let respData = data.data
		let tempRows = [];
		if(!respData.error){
			tempRows = respData
		}else{
			tempRows = [{
				"RUTEmisor": 61808000,
				"DV": "5",
				"RznSoc": "AGUAS ANDINAS S.A.",
				"TipoDTE": 33,
				"Folio": 7187125,
				"FchEmis": "2023-07-03",
				"MntExe": null,
				"MntNeto": 2039,
				"IVA": 387,
				"MntTotal": 2426,
				"Acuses": [
					{
						"codEvento": "ACD",
						"fechaEvento": "2023-07-07 13:08:16",
						"estado": "Pendiente"
					},
					{
						"codEvento": "ERM",
						"fechaEvento": "2023-07-07 13:08:17",
						"estado": "Registro"
					}
				],
				"FmaPago": 0,
				"TpoTranCompra": 1
			}]
		}
		tempRows = tempRows.map(r=>{
			return[r.FchEmis, r.TipoDTE,r.Folio, r.RznSoc,  r.RUTEmisor, r.MntTotal, "r.url", r.uid]
		})

		setRows2(tempRows)
	
	}
  
	const getData = async()=>{
		dispatch(loadingAction())
		const data = await clienteAxios.get('factura/');
		dispatch(loadingAction())
		let respData = data.data
		let tempRows = respData.map(r=>{
			return[r.createdAt, r.type, r.client.RUTRecep, r.totals.MntTotal, r.url, r.uid]
		})

		setRows(tempRows)
		console.log(tempRows)
		
		//setDataRow(data.data)
	}
    
  useEffect(()=>{
	getFacturas()
    getData()
  },[])
  
  const navigate = useNavigate();

  const edit = (item)=> {
    
	  navigate(`/facturas/edit/${item}`);
	}

  const options = {
    filterType: 'checkbox',
  };

  let card;
    if (showCard == "Emitido") {
        card =  <Card>
                   <ListHeader url="/facturas/create" label="Emitidos" buttonText="Agregar +" />
                    <SoftBox>
                        <MUIDataTable
                            data={rows}
                            columns={columns}
                            options={options}
                        />
                    </SoftBox>
                </Card>
    }else if(showCard == "Recibido"){
        card = <Card>
            <ListHeader label="Listado Recibidos" buttonText="Agregar +" />
            <SoftBox>
                <MUIDataTable
                    data={rows2}
                    columns={columnsB}
                    options={options}
                />
            </SoftBox>
        </Card>
    }

  return (
    <DashboardLayout>
      <HeaderFacturas setShowCard={setShowCard} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
            {card}
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Clientes;
