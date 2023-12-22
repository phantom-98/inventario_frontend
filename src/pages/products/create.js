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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { laboratories } from "../../config/labs.js";
import { subcat } from "../../config/subcat.js";

const check = {
  display: "flex",
  justifyContent: "space-around",
  padding: 30,
};

function create() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ activo: false, margen_precio:48 });
  const [isChecked, setIsChecked] = useState(false);
console.log(product);
  const onSubmit = (e) => {
    e.preventDefault();
    
    clienteAxios
      .post("product", product)
      .then((resp) => {
        succesSwal();
        navigate(`/inventario`);
      })
      .catch((e) => {
        errorSwal(e.response.data.msg);
      });
  };
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(product);
  };

  const handleCheckChange = (e) => {
    //setIsChecked(e.target.checked);
    const name = e.target.name || e.target.getAttribute('data-name');
    
    console.log(name);

    setProduct((prevState) => ({
      ...prevState,
      [name]: !product[name]
    }));
  };

  



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
                    type="number"
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
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="nombre">
                    Nombre Del Producto
                  </InputLabel>
                  <TextField
                    name="nombre"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                    style={{ paddingTop: "0.15rem" }}
                    required
                    inputProps={{
                      name: "nombre",
                      id: "nombre",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Subcategoría
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="subcategory"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {subcat.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </NativeSelect>
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="laboratorio">
                    Laboratorio
                  </InputLabel>
                  <NativeSelect
                    onChange={(e) => handleChange(e)}
                    name="laboratorio"
                    sx={{ input: { color: "white", width: "100%" } }}
                    fullWidth
                    required
                    defaultValue={"ninguna"}
                    inputProps={{
                      name: "laboratorio",
                      id: "laboratorio",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {laboratories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </NativeSelect>
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
                      id: "tipologia_consumo",
                    }}
                  >
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
                    <option value="DGA - ORAL LIQ.ORD.LIQUIDOS">DGA - ORAL LIQ.ORD.LIQUIDOS</option>
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
                    name="stock"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    inputProps={{
                      name: "stock",
                      id: "stock",
                    }}
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
                      id: "formato",
                    }}
                  >
                    <option value="" selected="">
                      Sin formato
                    </option>
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
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "codigoBarra",
                      id: "codigoBarra",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SoftBox mb={2}>
                  <InputLabel variant="standard" htmlFor="precio">
                    Precio Del Producto
                  </InputLabel>
                  <TextField
                    name="precio"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "precio",
                      id: "precio",
                      required:true
                      
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
                    name="precioOferta"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "precioOferta",
                      id: "precioOferta",
                    }}
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
                    
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "margen precio lista",
                      id: "margen precio lista",
                      readOnly:true
                      //value: product.margen_precio,
                      
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
                  
                    fullWidth
                    
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    style={{ paddingTop: "0.15rem" }}
                    inputProps={{
                      name: "margen precio oferta",
                      id: "margen precio oferta",
                      readOnly:true
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
                      readOnly: true
                      
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
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
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
              </Grid>
              <Grid item style={check} xs={12} md={6} xl={6}>
                <SoftBox>
                <div data-name="petitorioMin" onClick={(e) => handleCheckChange(e)} style={{backgroundColor: product.petitorioMin ? '#000C66' : 'lightgray',color:product.petitorioMin ?'white' : '' ,borderRadius: '15px', padding: '0 7px',cursor: 'pointer'}}>
                  Pet. Minimo
                  </div>
                </SoftBox>
                <SoftBox>
                <div data-name="refrigerado" onClick={(e) => handleCheckChange(e)} style={{backgroundColor: product.refrigerado ? '#000C66' : 'lightgray',color:product.refrigerado ?'white' : '' ,borderRadius: '15px', padding: '0 7px',cursor: 'pointer'}}>
                  Refrigerado
                  </div>
                </SoftBox>
                <SoftBox>
                <div data-name="generico" onClick={(e) => handleCheckChange(e)} style={{backgroundColor: product.generico ? '#000C66' : 'lightgray',color:product.generico ?'white' : '' ,borderRadius: '15px', padding: '0 7px',cursor: 'pointer'}}>
                  Generico
                  </div>
                </SoftBox>
                <SoftBox>
                <div data-name="activo" onClick={(e) => handleCheckChange(e)} style={{backgroundColor: product.activo ? '#000C66' : 'lightgray',color:product.activo ?'white' : '' ,borderRadius: '15px', padding: '0 7px',cursor: 'pointer'}}>
                  Activo
                  </div>
                </SoftBox>
                <SoftBox >
                  <div data-name="oferta" onClick={(e) => handleCheckChange(e)} style={{backgroundColor: product.oferta ? '#000C66' : 'lightgray',color:product.oferta ?'white' : '' ,borderRadius: '15px', padding: '0 7px',cursor: 'pointer'}}>
                  Oferta
                  </div>
                </SoftBox>
              </Grid>
            </Grid>
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" style={{ float: "right" }}>
                Guardar
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default create;
