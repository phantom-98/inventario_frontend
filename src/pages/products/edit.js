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
import { insertarPuntos, dateFormat, replaceDigits } from "../../config/helpers";
import { getCpp, getCpp2 } from "../../config/helpers";
import { laboratories } from "../../config/labs.js";
import { subcat } from "../../config/subcat.js";
import { MenuItem, Select, TextareaAutosize } from "@mui/material";
import CustomQuill from "components/RichTextEditor";
const check = {
  display: "flex",
  justifyContent: "between",
  flexWrap: "wrap",
  gap: 5,
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
    name: "",
    laboratorio: "",
    subcategory_id: "ninguna",
    consumption_typology: "ninguna",
    laboratory_id: "ninguna",
    format: "ninguna",
    stock: 0,
    price: 0,
    offer_price: 0,
    cpp: 0,
    margen_precio: 0,
    margen_precioOferta: 0,
  });
  const [prices, setPrices] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [canSave, setCanSave] = useState(true);
  const [priceValidationError, setpriceValidationError] = useState(false);
  const [offerPriceValidationError, setofferPriceValidationError] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleQuillChange = (name, content) => {
    // Update the state with the new content
    setProduct((prevState) => ({
      ...prevState,
      [name]: content,
    }));
    // You can also use editor.getContents() or editor.getText() to get the content
  };
  const handleMargenChange = (e, type) => {
    const percentage = parseFloat(e.target.value);
    if (!product.cpp) {
      setProduct((prevState) => ({
        ...prevState,
        [type + "_margin"]: percentage,
      }));
    } else {
      const prices = Math.round((product.cpp / (1 - percentage / 100)) * 1.19);
      const formatedPrice = replaceDigits(prices);

      if (percentage < 0) {
        if (type === "price") {
          setpriceValidationError(true);
        } else {
          setofferPriceValidationError(true);
        }
        setCanSave(false);
      } else if (type !== "price") {
        if (percentage > product.price_margin) {
          setofferPriceValidationError(true);
          setCanSave(false);
        } else {
          setofferPriceValidationError(false);
          setCanSave(true);
        }
      } else {
        if (percentage < product.offer_price_margin) {
          setpriceValidationError(true);
          setCanSave(false);
        } else {
          setpriceValidationError(false);
          setCanSave(true);
        }
      }

      setProduct((prevState) => ({
        ...prevState,
        [type + "_margin"]: percentage,
        [type]: formatedPrice,
      }));
    }
  };
  const handlePriceChange = (e, type) => {
    const price = parseFloat(e.target.value);
    if (!product.cpp) {
      setProduct((prevState) => ({
        ...prevState,

        [type]: price,
      }));
    } else {
      const margin = Math.round(((price / (1 + 0.19) - product.cpp) / (price / (1 + 0.19))) * 100);
      if (margin < 0) {
        if (type === "price") {
          setpriceValidationError(true);
        } else {
          setofferPriceValidationError(true);
        }
        setCanSave(false);
      } else if (type !== "price") {
        if (price > product.price) {
          setCanSave(false);
          setofferPriceValidationError(true);
        } else {
          setofferPriceValidationError(false);
          setCanSave(true);
        }
      } else {
        if (price < product.offer_price) {
          setpriceValidationError(true);
          setCanSave(false);
        } else {
          setpriceValidationError(false);
          setCanSave(true);
        }
      }

      setProduct((prevState) => ({
        ...prevState,
        [type + "_margin"]: margin,
        [type]: price,
      }));
    }
  };
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
    const subCategories = await clienteAxios.get("subcategory");
    let catData = subCategories.data;
    const labs = await clienteAxios.get("laboratory");
    let labsData = labs.data;
    const locations = await clienteAxios.get("location");
    let prodsLocation = locations.data;
    if (respData.cpp) {
      respData.price_margin = Math.round(
        ((respData.price / (1 + 0.19) - respData.cpp) / (respData.price / (1 + 0.19))) * 100
      );
      if (respData.offer_price) {
        respData.offer_price_margin = Math.round(
          ((respData.offer_price / (1 + 0.19) - respData.cpp) /
            (respData.offer_price / (1 + 0.19))) *
            100
        );
      }
    }
    /* let tempRows = respData.prices.map((r) => {
      return [dateFormat(r.createdAt), r.qty, `$ ${insertarPuntos(r.price)}`];
    });

    setRows(tempRows); */

    setProduct(respData);
    setSubCategories(catData);
    setLaboratories(labsData);
    setLocations(prodsLocation);
  };

  useEffect(() => {
    getData();
  }, []);

  /* const onSubmitPrices = (data) => {
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
  }; */

  const onSubmit = (data) => {
    //handleOpen()
    console.log(product)
    const { price_margin, offer_price_margin, ...auxProduct } = product;
    clienteAxios
      .put("product/sku/" + id, auxProduct)
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
    console.log(e)
    const { name, value, type } = e.target;
    if (type === "number") {
      setProduct((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log(product);
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
    const name = e.target.name || e.target.getAttribute("data-name");

    console.log(name);

    setProduct((prevState) => ({
      ...prevState,
      [name]: !product[name],
    }));
  };

  const options = {
    filterType: "checkbox",
  };
  const handleSelectChange = (e) => {
    // Update the state with the new content
    const aux = e.target.value;
    setProduct((prevState) => ({
      ...prevState,
      location_product: [...aux],
    }));
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
                  <InputLabel variant="standard" htmlFor="Sku">
                    Ubicacion
                  </InputLabel>
                  <SoftBox mb={2} onClick={() => setOpenDropDown(!openDropDown)}>
                    <Select
                      id="Ubicacion"
                      value={product.location_product || []}
                      onChange={handleSelectChange}
                      multiple
                      open={openDropDown}
                      style={{ cursor: "pointer" }}
                    >
                      {locations.map((e) => (
                        <MenuItem value={e.id} key={e.id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="nombre">
                      Nombre Del Producto
                    </InputLabel>
                    <TextField
                      name="name"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.name || ""}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="codigoBarra">
                      Codigo de Barras
                    </InputLabel>
                    <TextField
                      name="barcode"
                      value={product.barcode || ""}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="cpp">
                      Dias de Proteccion
                    </InputLabel>
                    <TextField
                      name="days_protection"
                      type="number"
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={product.days_protection || ""}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                      inputProps={{
                        name: "days_protection",
                        id: "days_protection",
                      }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="subcategory">
                      Subcategoría
                    </InputLabel>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={(e) => handleChange(e)}
                        name="subcategory"
                        fullWidth
                        inputProps={{
                          name: "subcategory_id",
                          value: product.subcategory_id || "ninguna",
                          id: "subcategory_id",
                        }}
                      >
                        <option value={"ninguna"}>Ninguna</option>
                        {subCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="laboratorio">
                      Laboratorio
                    </InputLabel>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={(e) => handleChange(e)}
                        name="laboratory_id"
                        fullWidth
                        inputProps={{
                          name: "laboratory_id",
                          value: product.laboratory_id || "ninguna",
                          id: "laboratory_id",
                        }}
                      >
                        <option value={"ninguna"}>Ninguna</option>
                        {laboratories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                      Tipologia De Consumo
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="consumption_typology"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      inputProps={{
                        name: "consumption_typology",
                        value: product.consumption_typology || "ninguna",
                        id: "consumption_typology",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="ABA_ORAL_S_ORD_GRAGEAS">ABA - ORAL S.ORD.GRAGEAS</option>
                      <option value="AAA_ORAL_S_ORD_TABLETAS">AAA - ORAL S.ORD. TABLETAS</option>
                      <option value="TYQ_VAGINAL_PESARIO_MEC_C_S">
                        TYQ - VAGINAL PESARIO MEC C/S
                      </option>
                      <option value="JWN_OTROS_SIST_EMPL_TRANSDER">
                        JWN - OTROS SIST.EMPL TRANSDER
                      </option>
                      <option value="GMD_PARENT_RET_AMP_I_M_">GMD - PARENT.RET.AMP I.M.</option>
                      <option value="ABC_ORAL_S_ORD_GRAG_RECUB_">
                        ABC - ORAL S.ORD.GRAG.RECUB.
                      </option>
                      <option value="GNE_PARENT_RET__JER_PREC_SC">
                        GNE - PARENT.RET. JER PREC SC
                      </option>
                      <option value="GND_PARENT_RET_JER_PRECAR_IM">
                        GND - PARENT.RET.JER.PRECAR.IM
                      </option>
                      <option value="TYR_VAGINAL_D_I_U">TYR - VAGINAL D.I.U.</option>
                      <option value="TVA_VAGINAL_GEL_SOL">TVA - VAGINAL GEL/SOL</option>
                      <option value="TTA_VAGINAL_CREMA_NO_ESPEC">
                        TTA - VAGINAL CREMA NO ESPEC.
                      </option>
                      <option value="TGW_VAGINAL_JAB_LIQD_LAV">TGW - VAGINAL JAB LIQD/LAV</option>
                      <option value="ACA_ORAL_S_ORD_CAPSULAS">ACA - ORAL S.ORD.CAPSULAS</option>
                      <option value="TLS_VAGINAL_SUPOSITORIOS">TLS - VAGINAL SUPOSITORIOS</option>
                      <option value="TGS_VAGINAL_LOCIONES">TGS - VAGINAL LOCIONES</option>
                      <option value="DEP_ORAL_LIQ_ORD_POLVO_DOSIS">
                        DEP - ORAL LIQ.ORD.POLVO DOSIS
                      </option>
                      <option value="GPD_PARENT_RET_VIALES_I_M">
                        GPD - PARENT.RET.VIALES I.M.
                      </option>
                      <option value="TWY_VAGINAL_OTR_APOSIT_MEDIC">
                        TWY - VAGINAL OTR APOSIT MEDIC
                      </option>
                      <option value="FMA_PARENT_ORD_AMPOLLAS">FMA - PARENT.ORD.AMPOLLAS</option>
                      <option value="DGA_ORAL_LIQ_ORD_LIQUIDOS">DGA - ORAL LIQ.ORD.LIQUIDOS</option>
                      <option value="GYV_PARENT_RET_INJERTO">GYV - PARENT.RET.INJERTO</option>
                      <option value="DGB_ORAL_LIQ_ORD_GOTAS">DGB - ORAL LIQ.ORD.GOTAS</option>
                      <option value="ADR_ORAL_S_ORD_GLOB_PQ_HOMEO">
                        ADR - ORAL S.ORD.GLOB PQ+HOMEO
                      </option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                      Tipo de receta
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="recipe_type"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      inputProps={{
                        name: "recipe_type",
                        value: product.recipe_type || "ninguna",
                        id: "recipe_type",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="Venta Directa">Venta Directa</option>
                      <option value="Receta Simple (R)">Receta Simple (R)</option>
                      <option value="Receta Simple Obligatoria (RO)">
                        Receta Simple Obligatoria (RO)
                      </option>
                      <option value="Receta Retenida (RR)">Receta Retenida (RR)</option>
                      <option value="Receta Cheque (RCH)">Receta Cheque (RCH)</option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                      Estado
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="state_of_matter"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      inputProps={{
                        name: "state_of_matter",
                        value: product.state_of_matter || "ninguna",
                        id: "state_of_matter",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="Solido">Solido</option>
                      <option value="Liquido">Liquido</option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="stock">
                      Stock Disponible
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
                      name="format"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      inputProps={{
                        name: "format",
                        value: product.format || "ninguna",
                        id: "format",
                      }}
                    >
                      <option value={"ninguna"}>Ninguna</option>
                      <option value="FORMAT_1">1</option>
                      <option value="FORMAT_2">2</option>
                      <option value="FORMAT_3">3</option>
                      <option value="FORMAT_3_5">3.5</option>
                      <option value="FORMAT_4">4</option>
                      <option value="FORMAT_5">5</option>
                      <option value="FORMAT_6">6</option>
                      <option value="FORMAT_7">7</option>
                      <option value="FORMAT_8">8</option>
                      <option value="FORMAT_10">10</option>
                      <option value="FORMAT_12">12</option>
                      <option value="FORMAT_14">14</option>
                      <option value="FORMAT_15">15</option>
                      <option value="FORMAT_16">16</option>
                      <option value="FORMAT_20">20</option>
                      <option value="FORMAT_21">21</option>
                      <option value="FORMAT_24">24</option>
                      <option value="FORMAT_25">25</option>
                      <option value="FORMAT_28">28</option>
                      <option value="FORMAT_30">30</option>
                      <option value="FORMAT_35">35</option>
                      <option value="FORMAT_40">40</option>
                      <option value="FORMAT_45">45</option>
                      <option value="FORMAT_50">50</option>
                      <option value="FORMAT_56">56</option>
                      <option value="FORMAT_60">60</option>
                      <option value="FORMAT_80">80</option>
                      <option value="FORMAT_90">90</option>
                      <option value="FORMAT_91">91</option>
                      <option value="FORMAT_100">100</option>
                      <option value="FORMAT_133">133</option>
                      <option value="FORMAT_180">180</option>
                      <option value="FORMAT_200">200</option>
                      <option value="FORMAT_250">250</option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="tipologia_consumo">
                      Formato Unidad
                    </InputLabel>
                    <NativeSelect
                      onChange={(e) => handleChange(e)}
                      name="unit_format"
                      sx={{ input: { color: "white", width: "100%" } }}
                      fullWidth
                      inputProps={{
                        name: "unit_format",
                        value: product.unit_format || "cada comprimido",
                        id: "unit_format",
                      }}
                    >
                      <option value="cada comprimido">cada comprimido</option>
                    </NativeSelect>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="precio">
                      Precio Del Producto
                    </InputLabel>
                    <TextField
                      type="number"
                      name="price"
                      error={priceValidationError}
                      helperText={priceValidationError ? "precio invalido*" : ""}
                      fullWidth
                      onChange={(e) => handlePriceChange(e, "price")}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.price || 0}
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
                      name="offer_price"
                      fullWidth
                      error={offerPriceValidationError}
                      helperText={offerPriceValidationError ? "precio oferta invalido*" : ""}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.offer_price || 0}
                      onChange={(e) => handlePriceChange(e, "offer_price")}
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="precio">
                      Margen % Precio Lista
                    </InputLabel>
                    <TextField
                      name="margen precio lista"
                      type="number"
                      onChange={(e) => handleMargenChange(e, "price")}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                      inputProps={{
                        name: "margen precio lista",
                        id: "margen precio lista",
                        value: product.price_margin || 0,
                      }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <SoftBox mb={2}>
                    <InputLabel variant="standard" htmlFor="precio">
                      Margen % Precio Oferta
                    </InputLabel>
                    <TextField
                      name="margen precio oferta"
                      type="number"
                      onChange={(e) => handleMargenChange(e, "offer_price")}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                      inputProps={{
                        name: "margen precio oferta",
                        id: "margen precio oferta",
                        value: product.offer_price_margin || 0,
                      }}
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
                      value={product.cpp || 0}
                      type="number"
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                      inputProps={{
                        readOnly: true,
                      }}
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
                      value={product.fechaVencimiento || ""}
                      type="date"
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ paddingTop: "0.15rem" }}
                    />
                  </SoftBox>
                </Grid>

                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Descripcion
                  </InputLabel>
                  <SoftBox mb={2}>
                    <CustomQuill
                      name="description"
                      value={product.description}
                      onChange={handleQuillChange}
                    />
                  </SoftBox>
                </Grid>

                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Ficha Tecnica
                  </InputLabel>
                  <SoftBox mb={2}>
                    <CustomQuill
                      name="data_sheet"
                      value={product.data_sheet}
                      onChange={handleQuillChange}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Composicion
                  </InputLabel>
                  <SoftBox mb={2}>
                    <CustomQuill
                      name="compound"
                      value={product.compound || ""}
                      onChange={handleQuillChange}
                    />
                  </SoftBox>
                </Grid>

                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Beneficios
                  </InputLabel>
                  <SoftBox mb={2}>
                    <CustomQuill
                      name="benefits"
                      value={product.benefits}
                      onChange={handleQuillChange}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Meta titulo
                  </InputLabel>
                  <TextField
                      name="meta_title"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.meta_title || ""}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
               </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Meta Descripcion
                  </InputLabel>
                  <TextField
                      name="meta_description"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={product.meta_description || ""}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingTop: "0.15rem" }}
                    />
                </Grid>

                <Grid item style={check} xs={12} md={6} xl={6}>
                  <SoftBox>
                    <div
                      data-name="is_generic"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_generic ? "#000C66" : "lightgray",
                        color: product.is_generic ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 9px",
                        cursor: "pointer",
                      }}
                    >
                      Generico
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="active"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.active ? "#000C66" : "lightgray",
                        color: product.active ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 9px",
                        cursor: "pointer",
                      }}
                    >
                      Activo
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_offer"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_offer ? "#000C66" : "lightgray",
                        color: product.is_offer ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 9px",
                        cursor: "pointer",
                      }}
                    >
                      Oferta
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_indexable"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_indexable ? "#000C66" : "lightgray",
                        color: product.is_indexable ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Indexable
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_medicine"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_medicine ? "#000C66" : "lightgray",
                        color: product.is_medicine ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Medicina
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_bioequivalent"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_bioequivalent ? "#000C66" : "lightgray",
                        color: product.is_bioequivalent ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Bioequivalente
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="outstanding"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.outstanding ? "#000C66" : "lightgray",
                        color: product.outstanding ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Destacado
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_immediate"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_immediate ? "#000C66" : "lightgray",
                        color: product.is_immediate ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Inmediato
                    </div>
                  </SoftBox>
                  <SoftBox>
                    <div
                      data-name="is_cenabast"
                      onClick={(e) => handleCheckChange(e)}
                      style={{
                        backgroundColor: product.is_cenabast ? "#000C66" : "lightgray",
                        color: product.is_cenabast ? "white" : "",
                        borderRadius: "15px",
                        padding: "0 7px",
                        cursor: "pointer",
                      }}
                    >
                      Cenabast
                    </div>
                  </SoftBox>
                </Grid>
              </Grid>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  style={{ float: "right" }}
                  disabled={!canSave}
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
