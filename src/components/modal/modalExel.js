import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import borders from 'assets/theme/base/borders';
import input from './../../assets/theme/components/form/input';
import clienteAxios from '../../config/axios';
import { useDispatch } from "react-redux";
import {succesSwal, errorSwal} from 'config/helpers.js'
import { loadingAction } from "actions/helperActions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TitleModal ={
    marginBottom: 20,

};

const BotonExel={
    
    marginLeft: 530,
    color: '#00cc00',
    border: '1px solid',
    height: '35px',
    width: '130px',
    
};
const Botones={
    float: 'right',
}

const BotonCancelar={
   
    marginRight: 0,
    color: '#cc0000',
    border: '1px solid',
    height: '30px',
    width: '130px',
    marginTop: 10,
}
const BotonCargar={
   
    marginRight: 5,
    color: '#0066ff',
    border: '1px solid',
    height: '30px',
    width: '130px',
    marginTop: 10,
}

export default function NestedModal() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    handleClose()
    dispatch(loadingAction())
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    clienteAxios.post('product/import', formData, {headers:{ "Content-Type":"multipart/form-data"}}).then(resp =>{
        console.log(resp)
        dispatch(loadingAction())
        succesSwal()
        
    })
    .catch((e)=>{
        dispatch(loadingAction())
        console.log(e);
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={BotonExel} onClick={handleOpen}><strong>Carga Masiva</strong></Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 700, height: 280 }}>
          <h2 style={TitleModal} id="parent-modal-title">Carga un Excel</h2>
          <br/>
          <input type="file" className='form-control' onChange={(e) => setFile(e.target.files[0])}/>
          <br/>
          <div style={Botones} >
            <Button style={BotonCargar} onClick={(e) => handleFileUpload(e)}> Cargar </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
  }