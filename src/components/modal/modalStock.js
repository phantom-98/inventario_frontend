import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import borders from "assets/theme/base/borders";
import input from "./../../assets/theme/components/form/input";
import clienteAxios from "../../config/axios";
import { useDispatch } from "react-redux";
import { succesSwal, errorSwal } from "config/helpers.js";
import { loadingAction } from "actions/helperActions";
import DatePiker from "components/DatePicker/datePiker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TitleModal = {
  marginBottom: 20,
};

const BotonExel = {

  color: "#00cc00",
  border: "1px solid",
  height: "35px",
  width: "130px",
};
const Botones = {
  float: "right",
};

const BotonCancelar = {
  marginRight: 0,
  color: "#cc0000",
  border: "1px solid",
  height: "30px",
  width: "130px",
  marginTop: 10,
};
const BotonCargar = {
  marginRight: 5,
  color: "#0066ff",
  border: "1px solid",
  height: "30px",
  width: "130px",
  marginTop: 10,
};

export default function NestedModalStock() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    location.href = `${process.env.REACT_APP_INVENTARIO_API_URL}product/downloadStockDate?startAt=${valueAt.startAt}&endAt=${valueAt.endAt}`
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSync = () => {
    window.open(`${process.env.REACT_APP_INVENTARIO_API_URL}product/syncProductsStock`, "_blank");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [valueAt, setValueAt] = useState({startAt:"2024-08-01", endAt:"2024-08-30"})

  const onDateChange = (e)=>{
    setValueAt(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
   
      <Button style={BotonExel} onClick={handleOpen}>
        <strong>Stock Fecha</strong>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 700, height: 280 }}>
          <h2 style={TitleModal} id="parent-modal-title">
           Escoge Rango de Fecha para el Archivo
          </h2>
          <br />
          <div style={{}}>

          <DatePiker value={valueAt} handleDateChange={onDateChange}/>
          </div>
          <br />
          <div style={Botones}>
            <Button style={BotonCargar} onClick={() => handleSubmit()}>
              {" "}
              Descargar{" "}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
