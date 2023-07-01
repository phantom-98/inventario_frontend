import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import NestedModal from "components/modal/modalExel";
import DatePiker from "components/DatePicker/datePiker";
function ListHeader ({url, label, buttonText, mode}) {

    let extraButtons=""

    if(mode == "excelModal"){
        extraButtons = <NestedModal/>
    }else if(mode == "datePicker"){
        extraButtons = <DatePiker/>
    }

    

    const navigate = useNavigate();
    return (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">{label}</SoftTypography>
            {extraButtons}
            <SoftButton variant="outlined" onClick={()=>navigate(url)} color="info" size="small">
                {buttonText}
            </SoftButton>
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