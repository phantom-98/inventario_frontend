/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
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
        dispatch(loadingAction())
        const data = await clienteAxios.get('factura/receivedDte');
        dispatch(loadingAction())
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
                    facturas.data.map((data, index) => (
                        <Bill key={index}
                            nombre={data.RznSoc}
                            rutEmisor={data.RUTEmisor}
                            montoTotal={data.MntTotal}
                            documento={data.TipoDTE}
                            fecha={data.FchEmis}
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
