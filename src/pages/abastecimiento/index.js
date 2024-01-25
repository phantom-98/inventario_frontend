import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { muiOptions, columnsFunc, columnsFunc2 } from "components/DataTable/options";
import clienteAxios from "config/axios";
import ListHeader from "components/ListHeader";
import MUIDataTable from "mui-datatables";
import Header from "./components/Header";
import { loadingAction } from "actions/helperActions";
import { useDispatch } from "react-redux";
import {
  dateFormat,
  dateClose,
  dateFormat2,
  insertarPuntos,
  mapDte,
  insertarPuntos2,
} from "../../config/helpers.js";
import Tooltip from "@mui/material/Tooltip";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import CustomFooter from "./CustomFooter";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

function Abastecimiento() {
  const [tabValue, setTabValue] = useState(1);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowsProvider, setrowsProvider] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [rowsFactura, setrowsFactura] = useState([]);
  const [rowsProduct, setrowsProduct] = useState([]);
  const [showCard, setShowCard] = useState("ROP");
  const [showCard2, setShowCard2] = useState("list");

  function convertToNumber(value) {
    return Number(value.replace(/[$,]/g, ""));
  }

  // Ordenar el array por la última columna (convertida a número)

  /* const getData = async () => {
    //dispatch(loadingAction())
    const data = await clienteAxios.get("product/");
    //dispatch(loadingAction())
    let respData = data.data;
    let tempRows = respData.map((r) => {
      return [
        r.sku,
        r.barcode,
        r.name,
        r.laboratories?.name,
        r.stock,
        `$ ${r.price}`,
        `$ ${r.offer_price}`,
        r.id,
      ];
    });

    setRows(tempRows);
  }; */
  const getProvider = async () => {
    dispatch(loadingAction());
    const data = await clienteAxios.get("provider/");
    dispatch(loadingAction());
    let respData = data.data;
    let tempRows = respData.map((r) => {
      return [r.name, r.RUTRecep, r.email, r.creditCondition, r.uid];
    });

    setrowsProvider(tempRows);

    const data2 = await clienteAxios.get("factura/getPerMonthandProvider");
    let respData2 = data2.data.pagadas;
    let respData3 = data2.data.no;
    let countJul = 0;
    let countAg = 0;
    let countSep = 0;
    let countTo = 0;
    let test = tempRows.map((e) => {
      let total =
        (respData2[e[0]]?.Julio ? respData2[e[0]].Julio : 0) +
        (respData2[e[0]]?.Agosto ? respData2[e[0]].Agosto : 0) +
        (respData2[e[0]]?.Septiembre ? respData2[e[0]].Septiembre : 0);
      countJul += respData2[e[0]]?.Julio ? respData2[e[0]].Julio : 0;
      countAg += respData2[e[0]]?.Agosto ? respData2[e[0]].Agosto : 0;
      countSep += respData2[e[0]]?.Septiembre ? respData2[e[0]].Septiembre : 0;
      countTo += total;
      return [
        e[0],
        `$ ${insertarPuntos(respData2[e[0]]?.Julio)}`,
        `$ ${insertarPuntos(respData2[e[0]]?.Agosto)}`,
        `$ ${insertarPuntos(respData2[e[0]]?.Septiembre)}`,
        total,
      ];
    });
    test.sort((a, b) => b[b.length - 1] - a[a.length - 1]);
    test.push([
      "Total",
      `$ ${insertarPuntos(countJul)}`,
      `$ ${insertarPuntos(countAg)}`,
      `$ ${insertarPuntos(countSep)}`,
      countTo,
    ]);

    console.log(test);

    setRows2(test);

    countJul = 0;
    countAg = 0;
    countSep = 0;
    countTo = 0;

    let test2 = tempRows.map((e) => {
      let total =
        (respData3[e[0]]?.Julio ? respData3[e[0]].Julio : 0) +
        (respData3[e[0]]?.Agosto ? respData3[e[0]].Agosto : 0) +
        (respData3[e[0]]?.Septiembre ? respData3[e[0]].Septiembre : 0);
      countJul += respData3[e[0]]?.Julio ? respData3[e[0]].Julio : 0;
      countAg += respData3[e[0]]?.Agosto ? respData3[e[0]].Agosto : 0;
      countSep += respData3[e[0]]?.Septiembre ? respData3[e[0]].Septiembre : 0;
      countTo += total;
      return [
        e[0],
        `$ ${insertarPuntos(respData3[e[0]]?.Julio)}`,
        `$ ${insertarPuntos(respData3[e[0]]?.Agosto)}`,
        `$ ${insertarPuntos(respData3[e[0]]?.Septiembre)}`,
        total,
      ];
    });

    test2.sort((a, b) => b[b.length - 1] - a[a.length - 1]);

    test2.push([
      "Total",
      `$ ${insertarPuntos(countJul)}`,
      `$ ${insertarPuntos(countAg)}`,
      `$ ${insertarPuntos(countSep)}`,
      countTo,
    ]);
    setRows3(test2);
  };

  const getFacturas = async () => {
    const data = await clienteAxios.get("factura/getReceivedDteforApi3");
    let respData = data.data;
    let tempRows = respData.map((r) => {
      return [
        r.folio,
        r.provider?.name,
        mapDte(r.typeId),
        dateFormat(r.createdAt),
        dateFormat(dateClose(r.provider, r.createdAt)),
        `$ ${insertarPuntos2(r.totals.MntTotal, r.typeId)}`,
        dateFormat2(dateClose(r.provider, r.createdAt)),
        r,
        r.obs,
      ];
    });

    setrowsFactura(tempRows);
  };
  const getPerMonthandProvider = async () => {
    dispatch(loadingAction());
    const data = await clienteAxios.get("factura/getPerMonthandProvider");
    dispatch(loadingAction());
  };
  const getProduct = async () => {
    dispatch(loadingAction());
    const data = await clienteAxios.get("product/");
    dispatch(loadingAction());
    let respData = data.data;
    let tempRows = respData.map((r) => {
      return [
        r.sku,
        r.barcode,
        r.name,
        r.laboratories?.name,
        r.stock,
        r.puntoreorden,
        r.nivelLlenado,
        r.id,
      ];
    });

    setrowsProduct(tempRows);
  };

  useEffect(() => {
    getProduct();
    getFacturas();
    //getData();
    getProvider();
  }, []);

  const edit = (item) => {
    navigate(`/productos/edit/${item}`);
  };
  const editProvider = (id) => {
    navigate(`/provider/edit/${id}`);
  };

  const onDelete = (id) => {
    clienteAxios.delete(`/provider/${id}`).then(() => {
      getProvider();
    });
  };

  const changeStatus = (id) => {
    dispatch(loadingAction());
    clienteAxios
      .put(`/factura/changeStatus/${id}`)
      .then((r) => {
        getFacturas();
        dispatch(loadingAction());
      })
      .catch((e) => console.log(e));
  };

  const options2 = {
    rowsPerPageOptions: [15, 30, 100],
  };

  const columns2 = ["Proovedor", "Julio", "Agosto", "Septiembre", "Total"];
  const columns = [
    "Numero Factura",
    "Proovedor",
    "Tipo",
    "Fecha Emision",
    "Fecha Vencimiento",
    "Monto",
    "Mes Vencimiento",
  ];
  const columnsRop = ["Sku", "codigo de barras", "Nombre", "laboratorio", "stock"];

  columns.push({
    name: "Estado",
    options: {
      filter: true,
      sort: true,
      empty: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        let status = tableMeta.rowData[7].status ? tableMeta.rowData[7].status : "No Pagada";
        let color = tableMeta.rowData[7].status == "Pagada" ? "success" : "error";
        return (
          <>
            <SoftButton
              variant="outlined"
              size="small"
              color={color}
              onClick={(e) => changeStatus(tableMeta.rowData[7].uid)}
            >
              {status}
            </SoftButton>
          </>
        );
      },
    },
  });

  const getValueText = (e, uid) => {
    dispatch(loadingAction());
    clienteAxios
      .put(`/factura/changeObs/${uid}`, { data: e.target.value })
      .then((r) => {
        console.log(r);
        getFacturas();
        dispatch(loadingAction());
      })
      .catch((e) => console.log(e));
  };

  const getValueRop = (e, uid) => {
    dispatch(loadingAction());
    clienteAxios
      .put(`/product/changeRop/${uid}`, { data: e.target.value })
      .then((r) => {
        e.target.value = 0;
        console.log(r);
        getProduct();
        dispatch(loadingAction());
      })
      .catch((e) => console.log(e));
  };

  const getValueNll = (e, uid) => {
    dispatch(loadingAction());
    clienteAxios
      .put(`/product/changeNll/${uid}`, { data: e.target.value })
      .then((r) => {
        e.target.value = 0;
        console.log(r);
        getProduct();

        dispatch(loadingAction());
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (w) => {
    console.log(w);
  };

  columns.push({
    name: "Observaciones",
    options: {
      filter: true,
      sort: true,
      empty: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <textarea
              onBlur={(e) => getValueText(e, tableMeta.rowData[7].uid)}
              className="form-control"
            >
              {tableMeta.rowData[8]}
            </textarea>
          </>
        );
      },
    },
  });

  columnsRop.push({
    name: "Rop",
    options: {
      filter: true,
      sort: true,
      empty: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                width: "150px",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <p style={{ width: "40%", marginRight: "2px" }}>{tableMeta.rowData[5]}</p>
              <input
                style={{ width: "60%" }}
                name="puntoreorden"
                defaultValue="0"
                className="form-control"
                onChange={handleChange}
                onBlur={(e) => getValueRop(e, tableMeta.rowData[7])}
              ></input>
            </Box>
          </>
        );
      },
    },
  });
  columnsRop.push({
    name: "Nll",
    options: {
      filter: true,
      sort: true,
      empty: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                width: "150px",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <p style={{ width: "40%", marginRight: "2px" }}>{tableMeta.rowData[6]}</p>
              <input
                style={{ width: "60%" }}
                name="nivelLlenado"
                className="form-control"
                defaultValue="0"
                onChange={() => {}}
                onBlur={(e) => getValueNll(e, tableMeta.rowData[7])}
              ></input>
            </Box>
          </>
        );
      },
    },
  });
  columnsRop.push({
    name: "",
    options: {
      filter: true,
      sort: true,
      empty: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <></>;
      },
    },
  });

  const columnsProvider = columnsFunc2(
    ["Nombre", "Rut", "Email", "Condicion de Credito"],
    editProvider,
    4,
    onDelete
  );

  const listItems = rows3.map((r, i) => (
    <tr key={i}>
      <td>{r[0] == "Total" ? <strong>{r[0]}</strong> : r[0]}</td>
      <td>{r[0] == "Total" ? <strong>{r[1]}</strong> : r[1]}</td>
      <td>{r[0] == "Total" ? <strong>{r[2]}</strong> : r[2]}</td>
      <td>{r[0] == "Total" ? <strong>{r[3]}</strong> : r[3]}</td>
      <td>
        <strong>$ {insertarPuntos(r[4])}</strong>
      </td>
    </tr>
  ));

  const listItems2 = rows2.map((r, i) => (
    <tr key={i}>
      <td>{r[0] == "Total" ? <strong>{r[0]}</strong> : r[0]}</td>
      <td>{r[0] == "Total" ? <strong>{r[1]}</strong> : r[1]}</td>
      <td>{r[0] == "Total" ? <strong>{r[2]}</strong> : r[2]}</td>
      <td>{r[0] == "Total" ? <strong>{r[3]}</strong> : r[3]}</td>
      <td>
        <strong>$ {insertarPuntos(r[4])}</strong>
      </td>
    </tr>
  ));

  let card;
  if (showCard == "orderCompra") {
    card = (
      <Card>
        <ListHeader
          url="/orden_de_compra/create"
          label="Listado Orden de Compra"
          buttonText="Agregar +"
        />
        <SoftBox>
          <MUIDataTable options={muiOptions} />
        </SoftBox>
      </Card>
    );
  } else if (showCard == "consolid") {
    card = (
      <Card>
        <SoftBox>
          <h5 style={{ padding: "30px" }}>No Pagadas</h5>
          <table className="table">
            <thead>
              <tr>
                <td>Proovedor</td>
                <td>Julio</td>
                <td>Agosto</td>
                <td>Septiembre</td>
                <td>
                  <strong>Total</strong>
                </td>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
          <h5 style={{ padding: "30px" }}>Pagadas</h5>
          <table className="table">
            <thead>
              <tr>
                <td>Proovedor</td>
                <td>Julio</td>
                <td>Agosto</td>
                <td>Septiembre</td>
                <td>
                  <strong>Total</strong>
                </td>
              </tr>
            </thead>
            <tbody>{listItems2}</tbody>
          </table>
        </SoftBox>
      </Card>
    );
  } else if (showCard == "recepcion") {
    card = (
      <Card>
        <ListHeader
          url="/factura/receivedDte"
          mode="AbasRecep"
          label="Listado Recepcion"
          buttonText="Actualizar"
        />
        <SoftBox>
          <MUIDataTable data={rowsFactura} columns={columns} options={muiOptions} />
        </SoftBox>
      </Card>
    );
  } else if (showCard == "provider") {
    card = (
      <Card>
        <ListHeader url="/provider/create" label="Listado Provedores" buttonText="Agregar +" />
        <SoftBox>
          <MUIDataTable data={rowsProvider} columns={columnsProvider} options={muiOptions} />
        </SoftBox>
      </Card>
    );
  } else if (showCard == "ROP") {
    card = (
      <Card>
        <ListHeader url="/product/downloadRop" label="Rop" buttonText="Descargar" mode="rop" />
        <SoftBox>
          <MUIDataTable data={rowsProduct} columns={columnsRop} options={muiOptions} />
        </SoftBox>
      </Card>
    );
  }

  return (
    <DashboardLayout>
      <Header setShowCard={setShowCard} />
      <SoftBox py={3}>
        <SoftBox mb={3}>{card}</SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Abastecimiento;
