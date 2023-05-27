
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import tableData from "./tabledata";

import SoftButton from "components/SoftButton";
import { useEffect } from "react";

import { getProductos } from "../../actions/productoActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Products() {
    const dispatch = useDispatch();
    let  products = [];
    
    useEffect(()=>{
        dispatch(getProductos());
    },[])
  
    products = useSelector(state => state.productos.productos)
    
    const navigate = useNavigate();

    const edit = (item)=> {
      navigate(`/productos/edit/${item.uid}`);
    }
    const { columns, rows } = tableData(products, edit);
    return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tiendas</SoftTypography>
              <SoftButton variant="outlined" onClick={()=>navigate("/productos/create")} color="info" size="small">Agregar +</SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>

      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Products;
