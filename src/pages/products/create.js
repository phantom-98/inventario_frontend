import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTiendas } from "../../actions/storeActions";

import clienteAxios from "config/axios";

import { succesSwal, errorSwal } from "config/helpers.js";
import { useNavigate } from "react-router-dom";
import { formSchema } from "./formSchema.js";
import FormComponent from "components/Form";
import ListHeader from "components/ListHeader";
import Grid from "@mui/material/Grid";
import SoftButton from "components/SoftButton";
import TextField from "@mui/material/TextField";
import TextArea from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { laboratories } from "../../config/labs.js";
import { subcat } from "../../config/subcat.js";
import CustomQuill from "components/RichTextEditor";
import MyDropzone from "components/DropZone";
import axios from "axios";
import { Chip, Icon, MenuItem, OutlinedInput, Select } from "@mui/material";
const check = {
  display: "flex",
  justifyContent: "between",
  flexWrap: "wrap",
  gap: 5,
  padding: 30,
};

function create() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    active: false,
    consumption_typology: "ABA_ORAL_S_ORD_GRAGEAS",
    unit_format: "cada comprimido",
    is_bioequivalent: false,
    is_generic: false,
    offer_price: 0,
    location_product: [],
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  //console.log(value);
  //console.log(product.location_product);
  const getData = async () => {
    const subCategories = await clienteAxios.get("subcategory");
    let catData = subCategories.data;
    const labs = await clienteAxios.get("laboratory");
    let labsData = labs.data;
    const locations = await clienteAxios.get("location");
    let prodsLocation = locations.data;
    setSubCategories(catData);
    setLaboratories(labsData);
    setLocations(prodsLocation);
  };

  useEffect(() => {
    getData();
  }, []);
  const customImgHanlder = (files) => {
    const mappedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Update state with the new files
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const moveFileRight = (dragIndex, event) => {
    // Prevent the Dropzone's onClick from being triggered
    event.stopPropagation();

    const dragFile = uploadedFiles[dragIndex];
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex + 1, 0, dragFile); // Insert the file at its new position
    setUploadedFiles(updatedFiles); // Update the state with the new files array
  };
  const moveFileLeft = (dragIndex, event) => {
    // Prevent the Dropzone's onClick from being triggered
    event.stopPropagation();

    const dragFile = uploadedFiles[dragIndex];
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex - 1, 0, dragFile); // Insert the file at its new position
    setUploadedFiles(updatedFiles); // Update the state with the new files array
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    for (const key in product) {
      if (Array.isArray(product[key])) {
        product[key].forEach((item) => {
          bodyFormData.append(key, item);
        });
      } else {
        bodyFormData.append(key, product[key]);
      }
    }
    for (let index = 0; index < uploadedFiles.length; index++) {
      bodyFormData.append("files", uploadedFiles[index]);
    }
    //bodyFormData.append("files", uploadedFiles ?? null);
    //axios.post("http://localhost:4000/v1/product", bodyFormData).then((resp) => console.log("yes"));
    clienteAxios
      .post("product", bodyFormData)
      .then((resp) => {
        console.log(resp.data.status)
        if(resp.data.status == false){
          errorSwal('Producto no creado');

        }else{
          succesSwal();
          navigate(`/inventario`);
        }
        
      })
      .catch((e) => {
        errorSwal(e.response.data.msg);
      });
  };
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
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

  const handleQuillChange = (name, content) => {
    // Update the state with the new content
    setProduct((prevState) => ({
      ...prevState,
      [name]: content,
    }));
    // You can also use editor.getContents() or editor.getText() to get the content
  };
  const getNameForLocation = (id) => {
    const exists = locations.find((obj) => {
      return obj.id === id;
    });

    if (exists) return exists.name;
    return "";
  };
  const handleSelectChange = (e) => {
    // Update the state with the new content

    e.stopPropagation();
    const aux = e.target.value;
    setProduct((prevState) => ({
      ...prevState,
      ["location_product"]: aux,
    }));
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
  const clearImg = () => setUploadedFiles([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox py={3} component="form" role="form" onSubmit={onSubmit}>
          <SoftBox p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Sku
                </InputLabel>
                <SoftBox mb={2}>
                  <TextField
                    inputProps={{
                      name: "sku",
                      id: "Sku",
                    }}
                    name="sku"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Ubicacion
                </InputLabel>
                <SoftBox mb={2} onClick={() => setOpen(!open)}>
                  <Select
                    open={open}
                    multiple
                    style={{ cursor: "pointer" }}
                    value={product.location_product}
                    onChange={handleSelectChange}
                  >
                    {locations.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
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
                    onChange={(e) => handleChange(e)}
                    style={{ paddingTop: "0.15rem" }}
                    required
                    inputProps={{
                      name: "name",
                      id: "name",
                    }}
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
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "barcode",
                      id: "barcode",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Imagen
                  <Icon onClick={clearImg} style={{ marginLeft: "5px", cursor: "pointer" }}>
                    delete
                  </Icon>
                </InputLabel>
                <SoftBox mb={2}>
                  <MyDropzone
                    files={uploadedFiles}
                    onChange={customImgHanlder}
                    moveFileLeft={moveFileLeft}
                    moveFileRight={moveFileRight}
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
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Subcategoría
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="subcategory_id"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "subcategory_id",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {subCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </NativeSelect>
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={3} xl={3}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="laboratorio">
                    Laboratorio
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="laboratory_id"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "laboratory_id",
                      id: "laboratory_id",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {laboratories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </NativeSelect>
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
                    defaultValue={"ABA_ORAL_S_ORD_GRAGEAS"}
                    inputProps={{
                      name: "consumption_typology",
                      id: "consumption_typology",
                    }}
                  >
                    <option value="ABA_ORAL_S_ORD_GRAGEAS">ABA - ORAL S.ORD.GRAGEAS</option>
                    <option value="AAA_ORAL_S_ORD_TABLETAS">AAA - ORAL S.ORD. TABLETAS</option>
                    <option value="TYQ_VAGINAL_PESARIO_MEC_C_S">
                      TYQ - VAGINAL PESARIO MEC C/S
                    </option>
                    <option value="JWN_OTROS_SIST_EMPL_TRANSDER">
                      JWN - OTROS SIST.EMPL TRANSDER
                    </option>
                    <option value="GMD_PARENT_RET_AMP_I_M_">GMD - PARENT.RET.AMP I.M.</option>
                    <option value="ABC_ORAL_S_ORD_GRAG_RECUB_">ABC - ORAL S.ORD.GRAG.RECUB.</option>
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
                    <option value="GPD_PARENT_RET_VIALES_I_M">GPD - PARENT.RET.VIALES I.M.</option>
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
              <Grid item xs={12} md={3} xl={3}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="tipologia_consumo">
                    Tipo de receta
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="recipe_type"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "recipe_type",
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
              <Grid item xs={12} md={3} xl={3}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="tipologia_consumo">
                    Estado
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="state_of_matter"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "state_of_matter",
                      id: "state_of_matter",
                    }}
                  >
                    <option value={"ninguna"}>Ninguna</option>
                    <option value="Solido">Solido</option>
                    <option value="Liquido">Liquido</option>
                  </NativeSelect>
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={3} xl={3}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="stock">
                    Stock Disponible
                  </InputLabel>
                  <TextField
                    name="stock"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    inputProps={{
                      name: "stock",
                      id: "stock",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="formato">
                    Formato
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="format"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "format",
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
                  <InputLabel variant="standard" htmlFor="precio">
                    Precio Del Producto
                  </InputLabel>
                  <TextField
                    name="price"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "price",
                      id: "price",
                      required: true,
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="precioOferta">
                    Precio Con Oferta
                  </InputLabel>
                  <TextField
                    name="offer_price"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "offer_price",
                      id: "offer_price",
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
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "cpp",
                      id: "cpp",
                    }}
                  />
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
                    defaultValue={"cada comprimido"}
                    inputProps={{
                      name: "unit_format",
                      id: "unit_format",
                    }}
                  >
                    <option value="cada comprimido">cada comprimido</option>
                  </NativeSelect>
                </SoftBox>
              </Grid>
              {/* <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="fechaVencimiento">
                    Fecha Vencimiento
                  </InputLabel>
                  <TextField
                    name="fechaVencimiento"
                    type="date"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "fechaVencimiento",
                      id: "fechaVencimiento",
                    }}
                  />
                </SoftBox>
              </Grid> */}
              {/* <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="controlLegal">
                    Control Legal
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="controlLegal"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "controlLegal",
                      id: "controlLegal",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    <option value="sicotropico">Sicotropico</option>
                    <option value="estupefaciente">Estupefacientes</option>
                  </NativeSelect>
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="impuestoExtra">
                    Impuesto Extra
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="impuestoExtra"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "impuestoExtra",
                      id: "impuestoExtra",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    <option value="10">
                      Bebidas analcoholicas y minerales con edulcorante 10%
                    </option>
                    <option value="18">
                      Bebidas analcoholicas y minerales con elevado contenido de azucares 18%
                    </option>
                  </NativeSelect>
                </SoftBox>
              </Grid> */}

              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Descripcion
                </InputLabel>
                <SoftBox mb={2}>
                  <CustomQuill name="description" onChange={handleQuillChange} />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Ficha Tecnica
                </InputLabel>
                <SoftBox mb={2}>
                  <CustomQuill name="data_sheet" onChange={handleQuillChange} />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Composicion
                </InputLabel>
                <SoftBox mb={2}>
                  <CustomQuill name="compound" onChange={handleQuillChange} />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel variant="standard" htmlFor="Sku">
                  Beneficios
                </InputLabel>
                <SoftBox mb={2}>
                  <CustomQuill name="benefits" onChange={handleQuillChange} />
                </SoftBox>
              </Grid>
              
              <Grid item style={check} xs={12} md={6} xl={6}>
                {/* <SoftBox>
                  <div
                    data-name="petitorioMin"
                    onClick={(e) => handleCheckChange(e)}
                    style={{
                      backgroundColor: product.petitorioMin ? "#000C66" : "lightgray",
                      color: product.petitorioMin ? "white" : "",
                      borderRadius: "15px",
                      padding: "0 7px",
                      cursor: "pointer",
                    }}
                  >
                    Pet. Minimo
                  </div>
                </SoftBox>
                <SoftBox>
                  <div
                    data-name="refrigerado"
                    onClick={(e) => handleCheckChange(e)}
                    style={{
                      backgroundColor: product.refrigerado ? "#000C66" : "lightgray",
                      color: product.refrigerado ? "white" : "",
                      borderRadius: "15px",
                      padding: "0 7px",
                      cursor: "pointer",
                    }}
                  >
                    Refrigerado
                  </div>
                </SoftBox> */}
                <SoftBox>
                  <div
                    data-name="is_generic"
                    onClick={(e) => handleCheckChange(e)}
                    style={{
                      backgroundColor: product.is_generic ? "#000C66" : "lightgray",
                      color: product.is_generic ? "white" : "",
                      borderRadius: "15px",
                      padding: "0 7px",
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
                      padding: "0 7px",
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
                      padding: "0 7px",
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
              <Grid item xs={12} md={3} xl={3} />
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
            </Grid>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default create;
