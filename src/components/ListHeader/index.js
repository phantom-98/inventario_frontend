import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import NestedModal from "components/modal/modalExel";
import NestedModalRop from "components/modal/modalExelRop";
import DatePiker from "components/DatePicker/datePiker";
function ListHeader ({url, label, buttonText, mode}) {

    const goUrl = (url)=>{
        window.open(url , '_blank');
    }

    let extraButtons=""

    if(mode == "excelModal"){
        extraButtons = <NestedModal/>
    }else if(mode == "rop"){
        extraButtons = <>
            <NestedModalRop/>
            <SoftButton variant="outlined" onClick={()=>location.href ="http://159.203.98.65:4000/v1/product/downloadRop" } color="info" size="small">{buttonText}</SoftButton>
        </>
    }
    else if(mode == "downloadWeb"){
        extraButtons =
        <>
        <DatePiker/>
        <SoftButton variant="outlined" onClick={()=>location.href = "http://206.189.239.87:4000/v1/sale/excelWeb"} color="info" size="small">Descargar Ventas</SoftButton>
        
        </>
    }else if(mode == "datePicker"){
        extraButtons = <DatePiker/>
    }else if(mode == "downloadPos"){
        extraButtons =
        <>
         <DatePiker/>
        <SoftButton variant="outlined" onClick={()=>location.href = "http://206.189.239.87:4000/v1/sale/excelPos"} color="info" size="small">Descargar Ventas</SoftButton>
        </>
    }else if(mode == "AbasRecep"){
       // extraButtons += <SoftButton variant="outlined" onClick={()=>goUrl("http://206.189.239.87:4000/v1/factura/receivedDte")} color="info" size="small">Descargar Todas</SoftButton>
        extraButtons = <>
                    <SoftButton variant="outlined" onClick={()=>goUrl("http://206.189.239.87:4000/v1/factura/exportFromExcel/Pagada")} color="dark" size="small">Descargar Pagadas</SoftButton>
                    <SoftButton variant="outlined" onClick={()=>goUrl("http://206.189.239.87:4000/v1/factura/exportFromExcel/No_Pagada")} color="dark" size="small">Descargar No Pagadas</SoftButton>
                    <SoftButton variant="outlined" onClick={()=>goUrl("http://206.189.239.87:4000/v1/factura/exportFromExcel/Todas")} color="dark" size="small">Descargar Todas</SoftButton>
                    <SoftButton variant="outlined" onClick={()=>goUrl("http://206.189.239.87:4000/v1/factura/receivedDte")} color="info" size="small">Actualizar</SoftButton> 
            </> 
    }

    //TODO view logic

    const navigate = useNavigate();
    return (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">{label}</SoftTypography>
            {extraButtons}
            {
                mode == "rop" 
                    ?<></>
                    : mode !== "AbasRecep"
                        ? <SoftButton variant="outlined" onClick={()=>navigate(url)} color="info" size="small">{buttonText}</SoftButton>
                        : ""
                
            }
            
            
        </SoftBox>
    )
}

ListHeader.propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    buttonText:PropTypes.string,
    mode:PropTypes.string,
};

export default ListHeader;