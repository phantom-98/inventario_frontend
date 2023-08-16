import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import NestedModal from "components/modal/modalExel";
import DatePiker from "components/DatePicker/datePiker";
import moment from "moment";
import { useState } from "react";

function ListHeader ({url, label, buttonText, mode, filter}) {
    const currentDate = moment();
    const firstDayOfMonth = currentDate.clone().startOf('month');
    const lastdayMonth = currentDate.clone().endOf('month');

    const [valuePos, setValuePos] = useState({
        startAt: firstDayOfMonth.format("YYYY-MM-DD"),
        endAt: lastdayMonth.format("YYYY-MM-DD")
    });

    const handleDateChangePos = (event) => {
        setValuePos((prevUserInfo) => ({
            ...prevUserInfo,    // Copy previous state
            [event.target.name]: event.target.value, // Update only firstName property
        }));
    };

    const [valueWeb, setValueWeb] = useState({
        startAt: firstDayOfMonth.format("YYYY-MM-DD"),
        endAt: lastdayMonth.format("YYYY-MM-DD")
    });

    const handleDateChangeWeb = (event) => {
        setValueWeb((prevUserInfo) => ({
            ...prevUserInfo,    // Copy previous state
            [event.target.name]: event.target.value, // Update only firstName property
        }));
    };

    

    const goUrl = (url)=>{
        window.open(url , '_blank');
    }

    let extraButtons=""

    if(mode == "downloadWeb"){
        extraButtons =
        <>
        <DatePiker value={valueWeb} handleDateChange={handleDateChangeWeb}/>
        <SoftButton variant="outlined" onClick={()=>filter(valueWeb)} color="info" size="small">Filtrar</SoftButton>
        <SoftButton variant="outlined" onClick={()=>location.reload()} color="info" size="small">Borrar</SoftButton>
        <SoftButton variant="outlined" onClick={()=>location.href = `${process.env.REACT_APP_INVENTARIO_API_URL}sale/excelWeb/${valueWeb.startAt}/${valueWeb.endAt}`} color="info" size="small">Descargar Ventas</SoftButton>
        
        </>
    }else if(mode == "downloadPos"){
        extraButtons =
        <>
        <DatePiker value={valuePos} handleDateChange={handleDateChangePos} />
        <SoftButton variant="outlined" onClick={()=>filter(valuePos)} color="info" size="small">Filtrar</SoftButton>
        <SoftButton variant="outlined" onClick={()=>location.reload()} color="info" size="small">Borrar</SoftButton>
        <SoftButton variant="outlined" onClick={()=>location.href = `${process.env.REACT_APP_INVENTARIO_API_URL}sale/excelPos/${valuePos.startAt}/${valuePos.endAt}`} color="info" size="small">Descargar Ventas</SoftButton>
        </>
    }
    

    const navigate = useNavigate();
    return (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">{label}</SoftTypography>
            {extraButtons}

            
        </SoftBox>
    )
}

ListHeader.propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    buttonText:PropTypes.string,
    mode:PropTypes.string,
    filter: PropTypes.func
};

export default ListHeader;