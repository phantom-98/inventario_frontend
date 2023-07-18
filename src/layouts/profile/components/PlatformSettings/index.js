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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { loadingAction } from "actions/helperActions";
import { useDispatch } from "react-redux";
import clienteAxios from 'config/axios';

function PlatformSettings() {
  const dispatch = useDispatch();
  const [descount, setDescount] = useState(false);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(false);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const getSettings = async ()=>{
    dispatch(loadingAction())
    const data = await clienteAxios.get('setting/');
    dispatch(loadingAction())
    let respData = data.data
    let posDiscount = respData.find(r=>r.key =="POS_DISCOUNT")
    if(posDiscount){
      setDescount(posDiscount.value == "true");
    }
  }
  const setSetting = async (name)=>{
    dispatch(loadingAction())
    const data = await clienteAxios.put('setting/'+name);
    dispatch(loadingAction())
    let respData = data.data
    console.log(respData)
    
    if(name =="POS_DISCOUNT"){
      setDescount(respData.value == "true");
    }
  }
  
  useEffect(()=>{
    getSettings()
  })


  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Settings Pos
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch checked={descount} onChange={() => setSetting("POS_DISCOUNT")} />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Precio Descuento en Pos
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
