
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Bill from "../billing";
import { useState, useEffect } from "react";
import { loadingAction } from "actions/helperActions";
import { useDispatch } from "react-redux";
import clienteAxios from 'config/axios';

function BillingInformation() {
    
    const dispatch = useDispatch();
    const [facturas, setFacturas] = useState({data:[]})

    const getFacturas = async()=>{
      
        const data = await clienteAxios.get('factura/receivedDte');
  
        let respData = data.data
        if(!respData.error){
            setFacturas(respData)
        }else{
            setFacturas({data:[{
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
            }]})
        }
     
   }

    useEffect(()=>{
        getFacturas()
    },[])






  return (
    <Card id="delete-account"  >
        <SoftBox pt={3} px={2}>
            <SoftTypography variant="h6" fontWeight="medium">
            Facturación
            </SoftTypography>
        </SoftBox>
        <SoftBox pt={1} pb={2} px={2}>
            <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0} overflow="scroll" height="320px"  >
                {
                    facturas.data.map((data, index) => (
                        <Bill key={index}
                            nombre={data.RznSoc}
                            rutEmisor={data.RUTEmisor}
                            montoTotal={data.MntTotal}
                            documento={data.TipoDTE}
                            fecha={data.FchEmis}
                            item={data}
                            noGutter
                        />
                    ))
                }
            
            </SoftBox>
        </SoftBox>
    </Card>
  );
}

export default BillingInformation;
