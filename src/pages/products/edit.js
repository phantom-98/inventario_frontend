import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTiendas } from "../../actions/storeActions";
import clienteAxios from "config/axios";
import { formSchema } from "./formSchema.js";
import { succesSwal, errorSwal } from "config/helpers.js";
import { useNavigate } from "react-router-dom";
import FormComponent from "components/Form";
import ListHeader from "components/ListHeader";
import SoftButton from "components/SoftButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Margin } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MUIDataTable from "mui-datatables";
import { insertarPuntos, dateFormat } from "../../config/helpers";
import { getCpp } from "../../config/helpers";
import { laboratories } from "../../config/labs.js";
import { subcat } from "../../config/subcat.js";

const check = {
  display: "flex",
  justifyContent: "space-around",
  padding: 30,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const headert = {
  display: "flex",
  padding: "10px",
  justifyContent: "space-between",
  margin: "10px",
};

function EditProduct() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const { id } = routeParams;
  const [product, setProduct] = useState({
    sku: "",
    nombre: "",
    laboratorio: "",
    stock: 0,
    precio: 0,
    precioOferta: 0,
  });
  const [prices, setPrices] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const columns = ["Fecha", "Cantidad", "Precio"];
  const [rows, setRows] = useState([]);

  const getData = async () => {
    const data = await clienteAxios.get("product/sku/" + id);
    let respData = data.data;
    let tempRows = respData.prices.map((r) => {
      return [dateFormat(r.createdAt), r.qty, `$ ${insertarPuntos(r.price)}`];
    });

    setRows(tempRows);

    setProduct(respData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmitPrices = (data) => {
    clienteAxios
      .put("product/prices/" + id, prices)
      .then((resp) => {
        console.log(resp);
        let tempRows = resp.data.prices.map((r) => {
          return [dateFormat(r.createdAt), r.qty, `$ ${insertarPuntos(r.price)}`];
        });

        setRows(tempRows);
        succesSwal();
      })
      .catch((e) => {
        console.log(e);
        errorSwal();
      });
  };

  const onSubmit = (data) => {
    //handleOpen()
    clienteAxios
      .put("product/sku/" + id, product)
      .then((resp) => {
        //handleClose()
        console.log(resp);
        succesSwal();
        //navigate(`/inventario`);
      })
      .catch((e) => {
        //handleClose()
        console.log(e);
        errorSwal();
      });
  };
  const handleChangePrices = (e) => {
    const { name, value } = e.target;
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //TODO set on Redux
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCheckChange = (e) => {
    //setIsChecked(e.target.checked);
    const { name } = e.target;

    setProduct((prevState) => ({
      ...prevState,
      [name]: !product.activo,
    }));
  };

  const options = {
    filterType: "checkbox",
  };

  return (
    <DashboardLayout>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <ListHeader url="/inventario" label="Editar Producto" buttonText="Regresar" />
            <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="Sku">
                      Sku
                    </InputLabel>
                    <TextField
                      InputProps={{ readOnly: true }}
                      name="sku"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.sku || ""}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="nombre">
                      Nombre Del Producto
                    </InputLabel>
                    <TextField
                      name="nombre"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.nombre || ""}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="subcategory">
                      Subcategoría
                    </InputLabel>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={(e) => handleChange(e)}
                        name="subcategory"
                        fullWidth
                        defaultValue={"ninguna"}
                        inputProps={{
                          name: "subcategory",
                          value: product.subcategory,
                          id: "subcategory",
                        }}
                      >
                        <option value={"ninguna"}>Ninguna</option>
                        {subcat.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="laboratorio">
                      Laboratorio
                    </InputLabel>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={(e) => handleChange(e)}
                        name="laboratorio"
                        fullWidth
                        defaultValue={"ninguna"}
                        inputProps={{
                          name: "laboratorio",
                          value: product.laboratorio,
                          id: "laboratorio",
                        }}
                      >
                        <option value={"ninguna"}>Ninguna</option>
                        {laboratories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                      Tipologia De Consumo
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="tipologia_consumo"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      defaultValue={"ninguna"}
                      inputProps={{
                        name: "tipologia_consumo",
                        value: product.tipologia_consumo,
                        id: "tipologia_consumo",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="">Seleccione...</option>
                      <option value="ABA - ORAL S.ORD.GRAGEAS" selected="">
                        ABA - ORAL S.ORD.GRAGEAS
                      </option>
                      <option value="AAA - ORAL S.ORD. TABLETAS">AAA - ORAL S.ORD. TABLETAS</option>
                      <option value="TYQ - VAGINAL PESARIO MEC C/S">
                        TYQ - VAGINAL PESARIO MEC C/S
                      </option>
                      <option value="JWN - OTROS SIST.EMPL TRANSDER">
                        JWN - OTROS SIST.EMPL TRANSDER
                      </option>
                      <option value="GMD - PARENT.RET.AMP I.M.">GMD - PARENT.RET.AMP I.M.</option>
                      <option value="ABC - ORAL S.ORD.GRAG.RECUB.">
                        ABC - ORAL S.ORD.GRAG.RECUB.
                      </option>
                      <option value="GNE - PARENT.RET. JER PREC SC">
                        GNE - PARENT.RET. JER PREC SC
                      </option>
                      <option value="GND - PARENT.RET.JER.PRECAR.IM">
                        GND - PARENT.RET.JER.PRECAR.IM
                      </option>
                      <option value="TYR - VAGINAL D.I.U.">TYR - VAGINAL D.I.U.</option>
                      <option value="TVA - VAGINAL GEL/SOL">TVA - VAGINAL GEL/SOL</option>
                      <option value="TTA - VAGINAL CREMA NO ESPEC.">
                        TTA - VAGINAL CREMA NO ESPEC.
                      </option>
                      <option value="TGW - VAGINAL JAB LIQD/LAV">TGW - VAGINAL JAB LIQD/LAV</option>
                      <option value="ACA - ORAL S.ORD.CAPSULAS">ACA - ORAL S.ORD.CAPSULAS</option>
                      <option value="TLS - VAGINAL SUPOSITORIOS">TLS - VAGINAL SUPOSITORIOS</option>
                      <option value="TGS - VAGINAL LOCIONES">TGS - VAGINAL LOCIONES</option>
                      <option value="DEP - ORAL LIQ.ORD.POLVO DOSIS">
                        DEP - ORAL LIQ.ORD.POLVO DOSIS
                      </option>
                      <option value="GPD - PARENT.RET.VIALES I.M.">
                        GPD - PARENT.RET.VIALES I.M.
                      </option>
                      <option value="TWY - VAGINAL OTR APOSIT MEDIC">
                        TWY - VAGINAL OTR APOSIT MEDIC
                      </option>
                      <option value="FMA - PARENT.ORD.AMPOLLAS">FMA - PARENT.ORD.AMPOLLAS</option>
                      <option value="DGA - ORAL LIQ.ORD.LIQUIDOS">
                        DGA - ORAL LIQ.ORD.LIQUIDOS
                      </option>
                      <option value="GYV - PARENT.RET.INJERTO">GYV - PARENT.RET.INJERTO</option>
                      <option value="DGB - ORAL LIQ.ORD.GOTAS">DGB - ORAL LIQ.ORD.GOTAS</option>
                      <option value="ADR - ORAL S.ORD.GLOB PQ+HOMEO">
                        ADR - ORAL S.ORD.GLOB PQ+HOMEO
                      </option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="stock">
                      Cantidad De Productos Disponible
                    </InputLabel>
                    <TextField
                      type="number"
                      name="stock"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.stock || 0}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="formato">
                      Formato
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="formato"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      defaultValue={"ninguna"}
                      inputProps={{
                        name: "formato",
                        value: product.formato,
                        id: "formato",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="28">28</option>
                      <option value="30">30</option>
                      <option value="35">35</option>
                      <option value="40">40</option>
                      <option value="45">45</option>
                      <option value="50">50</option>
                      <option value="56">56</option>
                      <option value="60">60</option>
                      <option value="80">80</option>
                      <option value="90">90</option>
                      <option value="91">91</option>
                      <option value="100">100</option>
                      <option value="133">133</option>
                      <option value="180">180</option>
                      <option value="200">200</option>
                      <option value="250">250</option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="codigoBarra">
                      Codigo Barra
                    </InputLabel>
                    <TextField
                      name="codigoBarra"
                      value={product.codigoBarra}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="precio">
                      Precio Del Producto
                    </InputLabel>
                    <TextField
                      type="precio"
                      name="precio"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.precio || 0}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="precioOferta">
                      Precio Con Oferta
                    </InputLabel>
                    <TextField
                      type="number"
                      name="precioOferta"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.precioOferta || 0}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="cpp">
                      Costo Promedio Ponderado
                    </InputLabel>
                    <TextField
                      name="cpp"
                      value={getCpp(product.prices)}
                      type="number"
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="fechaVencimiento">
                      Fecha Vencimiento
                    </InputLabel>
                    <TextField
                      name="fechaVencimiento"
                      value={product.fechaVencimiento}
                      type="date"
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item md={6} xl={6}>
                  <Box sx={{ minWidth: "100%" }}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Control Legal
                    </InputLabel>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={(e) => handleChange(e)}
                        name="controlLegal"
                        fullWidth
                        defaultValue={"ninguna"}
                        inputProps={{
                          name: "controlLegal",
                          value: product.controlLegal,
                          id: "uncontrolled-native",
                        }}
                      >
                        <option value={"ninguna"}>Ninguna</option>
                        <option value={"sicotropico"}>Sicotropico</option>
                        <option value={"estupefaciente"}>Estupefacientes</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Impuesto Extra
                    </InputLabel>
                    <NativeSelect
                      name="impuestoExtra"
                      onChange={(e) => handleChange(e)}
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      defaultValue={"ninguna"}
                      inputProps={{
                        name: "impuestoExtra",
                        value: product.impuestoExtra,
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value={"10"}>
                        Bebidas analcoholicas y minerales con edulcorante 10%
                      </option>
                      <option value={"18"}>
                        Bebidas analcoholicas y minerales con elevado contenido de azucares 18%
                      </option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item style={check} xs={12} md={6} xl={6}>
                  <SoftBox>
                    <input
                      name="petitorioMin"
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                      checked={product.petitorioMin}
                      value="1"
                    />{" "}
                    Peritorio Minimo
                  </SoftBox>
                  <SoftBox>
                    <input
                      name="refrigerado"
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                      checked={product.refrigerado}
                      value="1"
                    />{" "}
                    Refrigerado
                  </SoftBox>
                  <SoftBox>
                    <input
                      name="generico"
                      checked={product.generico}
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                      value="1"
                    />{" "}
                    Generico
                  </SoftBox>
                  {product.activo === false || product.activo === true ? (
                    <SoftBox>
                      <input
                        name="activo"
                        type="checkbox"
                        onChange={(e) => handleCheckChange(e)}
                        checked={product.activo}
                      />{" "}
                      Activo
                    </SoftBox>
                  ) : null}
                </Grid>
              </Grid>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  style={{ float: "right" }}
                >
                  Guardar
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default EditProduct;
