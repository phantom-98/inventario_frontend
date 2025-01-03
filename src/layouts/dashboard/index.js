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
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import {insertarPuntos, dateFormat} from "../../config/helpers"
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
import { loadingAction, getDataforDashAction } from "actions/helperActions";
import clienteAxios from 'config/axios';
import moment from "moment";
import HorizontalBarChart from './../../examples/Charts/BarCharts/HorizontalBarChart/index';

function Dashboard() {
    const dispatch = useDispatch();
    let helper = useSelector(state => state.helper)
    const { size } = typography;
    const moment = require('moment')
    const [ventasPos, setventasPos] = useState({})
    const [ventasWeb, setventasWeb] = useState({})
    const [dataTemp, setDataTemp] = useState({})
    const [dataTemp2, setDataTemp2] = useState({})
    
    const getData = async()=>{
        const data = await clienteAxios.get('sale/salePerMonth');
      
        let day = data.data.pos[data.data.pos.length-1].totalDay
        let mes = data.data.pos[data.data.pos.length-1].total
        let year = data.data.pos.reduce((a,b)=>a + b.total,0)
        setventasPos({ day,mes, year})
        day = data.data.web[data.data.web.length-1].totalDayB
        mes = data.data.web[data.data.web.length-1].total
        year = data.data.web.reduce((a,b)=>a + b.total,0)
        setventasWeb({ day, mes, year})
        
    }

    const chartData = async() =>{
        const data = await clienteAxios.get('sale/salePerMonth');
        let respData = data.data
        
        let dataPos = new Array(12).fill(0);
        data.data.pos.forEach(element => {
            dataPos[element.mes] = element.total;
        });

        let dataWeb = new Array(12).fill(0);
        data.data.web.forEach(element => {
            dataWeb[element.mes] = element.total;
        });

        
        let d =  {}
        d.labels =  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        d.dataPos = dataPos
        d.dataWeb = dataWeb
        
        setDataTemp(d)

        
      }
     
   
      
      
      const today = moment(); 
      const dayOfMonth = today.date(); 
      const currentDate = moment();
      


    const specificMonth = moment(currentDate); 
    const daysInSpecificMonth = specificMonth.daysInMonth();
      
     
    const estimacionPos = Math.ceil(ventasPos.mes/dayOfMonth*daysInSpecificMonth)
    const estimacionWeb = Math.ceil(ventasWeb.mes/dayOfMonth*daysInSpecificMonth)
      
    

      
      
      
      useEffect(()=>{
       // dispatch(getDataforDashAction())
        chartData()
        getData()
      },[])
      



  return (
    <DashboardLayout>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} xl={3} >
              <MiniStatisticsCard
                title={{ text: "Ventas Dia Pos" }}
                count={`$ ${insertarPuntos(ventasPos.day)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Mes Pos" }}
                count={`$ ${insertarPuntos(ventasPos.mes)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Estimacion cierre mes Pos" }}
                count={`$ ${insertarPuntos(estimacionPos)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Anuales Pos" }}
                count={`$ ${insertarPuntos(ventasPos.year)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Dia Web" }}
                count={`$ ${insertarPuntos(ventasWeb.day)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Mes Web" }}
                count={`$ ${insertarPuntos(ventasWeb.mes)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Estimacion cierre mes Web" }}
                count={`$ ${insertarPuntos(estimacionWeb)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Anuales Web" }}
                count={`$ ${insertarPuntos(ventasWeb.year)}`}
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
            <VerticalBarChart
                title="Grafico Ventas 2023"
                chart={{
                    labels: dataTemp.labels,
                    datasets: [{
                        label: "Ventas Pos",
                        color: "dark",
                        data: dataTemp.dataPos,
                    },
                    {
                        label: "Ventas Web",
                        color: "info",
                        data: dataTemp.dataWeb,
                    }
                ],
                }}
                />
            </Grid>
            <Grid item xs={12} lg={5}>
              <BillingInformation />
             
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={6} >
            <Invoices />
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Dashboard;
