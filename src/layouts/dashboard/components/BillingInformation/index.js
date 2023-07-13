
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

import{mapDte, dateFormat,insertarPuntos} from '../../../../config/helpers'

function BillingInformation() {
    
    const dispatch = useDispatch();
    const [facturas, setFacturas] = useState([])

    const getFacturas = async()=>{
        const data = await clienteAxios.get('factura/getReceivedDteforApi2');
        let respData = data.data
        setFacturas(respData)
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
                    facturas.map((data, index) => (
                        <Bill key={index}
                            nombre={data.emisorData?.RznSoc}
                            rutEmisor={data.emisorData?.RUTEmisor}
                            montoTotal={`$ ${insertarPuntos(data.totals?.MntTotal)}`}
                            documento={mapDte(data.typeId)}
                            fecha={dateFormat(data.createdAt)}
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
