/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from '@mui/material/Tooltip';

function Bill({ nombre, rutEmisor, montoTotal, documento, fecha, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
     
    
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {nombre}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              
            </SoftBox>
            <SoftButton variant="text" color="dark">
                <Tooltip title="Ver PDF">
                    <RemoveRedEyeIcon/>
                </Tooltip>
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
                Root Del Emisor:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {rutEmisor}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
                Monto Total:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {montoTotal}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
                Tipo De Documento:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
                {documento}
            </SoftTypography>
            </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          Fecha:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {fecha}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
    nombre: PropTypes.string.isRequired,
    rutEmisor: PropTypes.string.isRequired,
    montoTotal: PropTypes.string.isRequired,
    documento: PropTypes.string.isRequired,
    fecha: PropTypes.bool,
  noGutter: PropTypes.bool,
};

export default Bill;
