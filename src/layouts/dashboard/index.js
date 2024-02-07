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
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import { insertarPuntos, dateFormat } from "../../config/helpers";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import ListHeader from "components/ListHeader";
import Card from "@mui/material/Card";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import HeaderDashboard from "./components/Header/headerDashboard";
import Invoices from "./components/invoices";
import BillingInformation from "./components/BillingInformation";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction, getDataforDashAction } from "actions/helperActions";
import clienteAxios from "config/axios";
import moment from "moment";
import HorizontalBarChart from "./../../examples/Charts/BarCharts/HorizontalBarChart/index";

function Dashboard() {
  const dispatch = useDispatch();
  let helper = useSelector((state) => state.helper);
  const { size } = typography;
  const moment = require("moment");
  const [ventasPos, setventasPos] = useState({});
  const [ventasWeb, setventasWeb] = useState({});
  const [dataTemp, setDataTemp] = useState({});
  const [dataTemp2, setDataTemp2] = useState({});
  const [contribution, setContri] = useState({});
  const [inv, setInv] = useState({});

  const getData = async () => {
    const data = await clienteAxios.get("sale/salePerMonth");

    let day = data.data.pos[data.data.pos.length - 1].totalDay;
    let mes = data.data.pos[data.data.pos.length - 1].total;
    let year = data.data.pos.reduce((a, b) => a + b.total, 0);
    setventasPos({ day, mes, year });
    day = data.data.web[data.data.web.length - 1].totalDayB;
    mes = data.data.web[data.data.web.length - 1].total;
    year = data.data.web.reduce((a, b) => a + b.total, 0);
    setventasWeb({ day, mes, year });

    /* const data2 = await clienteAxios.get('sale/getContribution');
        setContri(data2.data) */

    const data3 = await clienteAxios.get("sale/getInv");

    setInv(data3.data);
  };

  const chartData = async () => {
    const data = await clienteAxios.get("sale/salePerMonth");
    let respData = data.data;

    let dataPos = new Array(12).fill(0);
    let dataPos2 = new Array(12).fill(0);
    let dataPos3 = new Array(12).fill(0);
    let posQtySales = new Array(12).fill(0);
    respData.pos.forEach((element) => {
      console.log(element);
      dataPos[element.mes] = element.total;
      dataPos2[element.mes] = element.qty;
      let promedio = element.total / element.qty;
      dataPos3[element.mes] = Math.ceil(promedio.toFixed(2));
      posQtySales[element.mes] = element.qty;
    });

    let dataWeb = new Array(12).fill(0);
    let dataWeb2 = new Array(12).fill(0);
    let dataWeb3 = new Array(12).fill(0);
    let webQtySales = new Array(12).fill(0);
    respData.web.forEach((element) => {
      dataWeb[element.mes] = element.total;
      dataWeb2[element.mes] = element.qty;
      let promedio = element.total / element.qty;
      dataWeb3[element.mes] = Math.ceil(promedio);
      webQtySales[element.mes] = element.qty;
    });

    let d = {};
    d.labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    d.dataPos = dataPos;
    d.dataWeb = dataWeb;
    d.dataPos2 = dataPos2;
    d.dataWeb2 = dataWeb2;
    d.dataPos3 = dataPos3;
    d.dataWeb3 = dataWeb3;

    d.dataTotal = dataPos.map((v, i) => (v + dataWeb[i]) / 2);
    d.dataTotal2 = dataPos2.map((v, i) => (v + dataWeb2[i]) / 2);
    d.dataTotal3 = dataPos3.map((v, i) => (v + dataWeb3[i]) / 2);
    setDataTemp(d);
  };

  const today = moment();
  const dayOfMonth = today.date();
  const currentDate = moment();

  const specificMonth = moment(currentDate);
  const daysInSpecificMonth = specificMonth.daysInMonth();

  const estimacionPos = Math.ceil((ventasPos.mes / dayOfMonth) * daysInSpecificMonth);
  const estimacionWeb = Math.ceil((ventasWeb.mes / dayOfMonth) * daysInSpecificMonth);

  useEffect(() => {
    // dispatch(getDataforDashAction())
    chartData();
    getData();
  }, []);

  const [chartFilter, setChartFilter] = useState("Todos");

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Mes Web" }}
                count={`$ ${insertarPuntos(ventasWeb.mes)}`}
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

            {/* <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Margen Contribucion Mes Pos" }}
                count={` ${contribution.contriPos ? contribution.contriPos.toFixed(2) : 0} %`}
                icon={{ color: "info", component: "percent" }}
              />
            </Grid> */}
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ventas Dia Pos" }}
                count={`$ ${insertarPuntos(ventasPos.day)}`}
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
                title={{ text: "Estimacion cierre Web" }}
                count={`$ ${insertarPuntos(estimacionWeb)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Estimacion cierre Pos" }}
                count={`$ ${insertarPuntos(estimacionPos)}`}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>

            {/*  <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Margen Contribucion Mes Web" }}
                count={`${contribution.contriWeb ? contribution.contriWeb.toFixed(2): 0} %`}
                icon={{
                  color: "info",
                  component: "percent",
                }}
              />
              </Grid> */}
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Inventario $" }}
                count={`$ ${inv.invmoney ? insertarPuntos(Math.ceil(inv.invmoney)) : 0}`}
                icon={{
                  color: "info",
                  component: "paid",
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Inventario stok" }}
                count={`# ${inv.invqty ? inv.invqty : 0}`}
                icon={{
                  color: "info",
                  component: "money",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={4} lg={6} style={{ textAlign: "right" }}>
              Filtros
            </Grid>
            <Grid item xs={4} lg={2} style={{ textAlign: "right" }}>
              <SoftButton
                variant="outlined"
                size="small"
                color="success"
                onClick={() => setChartFilter("Todos")}
              >
                Todos
              </SoftButton>
            </Grid>
            <Grid item xs={4} lg={2} style={{ textAlign: "right" }}>
              <SoftButton
                variant="outlined"
                size="small"
                color="dark"
                onClick={() => setChartFilter("Pos")}
              >
                Pos
              </SoftButton>
            </Grid>
            <Grid item xs={4} lg={2} style={{ textAlign: "right" }}>
              <SoftButton
                variant="outlined"
                size="small"
                color="info"
                onClick={() => setChartFilter("Web")}
              >
                Web
              </SoftButton>
            </Grid>
          </Grid>
        </SoftBox>

        {chartFilter == "Pos" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas $ Pos"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Ventas Pos",
                        color: "dark",
                        data: dataTemp.dataPos,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas Qty Pos"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Qty Pos",
                        color: "dark",
                        data: dataTemp.dataPos2,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ticket Promedio Pos"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Promedio Pos",
                        color: "dark",
                        data: dataTemp.dataPos3,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        )}

        {chartFilter == "Web" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas Qty Web"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Ventas Web",
                        color: "info",
                        data: dataTemp.dataWeb,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas Qty Web"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Qty Web",
                        color: "info",
                        data: dataTemp.dataWeb2,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ticket Promedio Web"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Promedio Web",
                        color: "info",
                        data: dataTemp.dataWeb3,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        )}

        {chartFilter == "Todos" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas $"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Ventas",
                        color: "success",
                        data: dataTemp.dataTotal,
                      },
                      {
                        label: "Ventas Web",
                        color: "info",
                        data: dataTemp.dataWeb,
                      },
                      {
                        label: "Ventas Pos",
                        color: "dark",
                        data: dataTemp.dataPos,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ventas Qty"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Qty",
                        color: "success",
                        data: dataTemp.dataTotal2,
                      },
                      {
                        label: "Qty Web",
                        color: "info",
                        data: dataTemp.dataWeb2,
                      },
                      {
                        label: "Qty Pos",
                        color: "dark",
                        data: dataTemp.dataPos2,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <GradientLineChart
                  title="Ticket Promedio"
                  chart={{
                    labels: dataTemp.labels,
                    datasets: [
                      {
                        label: "Promedio",
                        color: "success",
                        data: dataTemp.dataTotal3,
                      },
                      {
                        label: "Promedio Web",
                        color: "info",
                        data: dataTemp.dataWeb3,
                      },
                      {
                        label: "Promedio Pos",
                        color: "dark",
                        data: dataTemp.dataPos3,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        )}

        <SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <BillingInformation />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
