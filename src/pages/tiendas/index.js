
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
import tableData from "./storeTableData";

import SoftButton from "components/SoftButton";
import { useEffect } from "react";

import { getTiendas } from "../../actions/storeActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Tiendas() {
    const dispatch = useDispatch();
    let  stores = [];
    
    useEffect(()=>{
        dispatch(getTiendas());
    },[])
  
    stores = useSelector(state => state.stores.stores)
    const navigate = useNavigate();

    const edit = (item)=> {
		navigate(`/tiendas/edit/${item.uid}`);
	}


    const { columns, rows } = tableData(stores, edit);

    

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tiendas</SoftTypography>
              <SoftButton variant="outlined" onClick={()=>navigate("/tiendas/create")} color="info" size="small">Agregar +</SoftButton>
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

export default Tiendas;
