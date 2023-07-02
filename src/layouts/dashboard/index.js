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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import ListHeader from "components/ListHeader"
import Card from "@mui/material/Card";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import HeaderDashboard from "./components/Header/headerDashboard";
import Invoices from "./components/invoices";
import BillingInformation from "./components/BillingInformation";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction } from "actions/helperActions";
import clienteAxios from 'config/axios';

function Dashboard() {
    const dispatch = useDispatch();
    const { size } = typography;
    const { chart, items } = reportsBarChartData;
    const [showCard, setShowCard] = useState("orderCompra")
    let card;

    const [dataGraph1, setdataGraph1] = useState({})

    const getData = async()=>{
    
        dispatch(loadingAction())
        const data = await clienteAxios.get('sale/salePerMonth');
        dispatch(loadingAction())
        let respData = data.data
        let dataPos = [];
        let dataWeb = [];
        for (let index = 0; index < 12; index++) {
            if(respData.pos[index] && respData.pos[index].mes == index){
                console.log(respData.pos[index].total)
                dataPos.push(respData.pos[index].total)
            }else {
                dataPos.push(100)
            }

            if(respData.web[index] && respData.web[index].mes ==index){
                dataWeb.push(respData.web[index].total)
            }else {
                dataWeb.push(0)
            }
            
            
        }
        let dataTemp = dataGraph1
        dataTemp.datasets = [
            {
                color:"info",
                data: dataPos,
                label: "Pos"
            },
            {
                color:"dark",
                data: dataWeb,
                label: "Web"
            },
        ]
        console.log(dataTemp)
        setdataGraph1(dataTemp)
    }

    useEffect(()=>{
        getData()
    },[])
   



  return (
    <DashboardLayout>
      <HeaderDashboard setShowCard={setShowCard} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas del dia" }}
                count="$53,000"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "ventas semanales" }}
                count="2,300"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "ventas mensuales" }}
                count="+3,462"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "ventas anuales" }}
                count="$103,430"
                icon={{
                  color: "info",
                  component: "paid",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Resumen De Ventas"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={dataGraph1}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <BillingInformation/>
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Dashboard;
