import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadingAction } from "actions/helperActions";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import Card from "@mui/material/Card";
import ListHeader from "components/ListHeader";
import clienteAxios from "config/axios";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { muiOptions, columnsFunc2 } from "components/DataTable/options";
import clienteAxiosAuth from "config/axiosAuth";
import { errorSwal } from "config/helpers";
import { insertarPuntos, dateFormat, itemListWeb, itemListPos } from "../../config/helpers";
function Logs() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    dispatch(loadingAction());
    const data = await clienteAxiosAuth.get("/auth");
    const data2 = await clienteAxios.get("/logs");
    dispatch(loadingAction());
    
    let respData = data2.data.logs;
    let users = data.data
    
    let tempRows = respData.map((r) => {
      let user = users.find(u=> u.id == r.userId)
      return [`${user.first_name} ${user.last_name}`, r.action, dateFormat(r.timestamp), r.newData, r.prevData];
    });
    setRows(tempRows);
  };
  useEffect(() => {
    getData();
  }, []);
  const edit = (item) => {
    
  };
  const onDelete = (item) => {
    /* clienteAxiosAuth.delete(`auth/${item}`).then(() => {
      getData();
    }); */
    errorSwal("No se pueden eliminar usuarios, solo desactivar");
  };
  const columns = ["Usuario", "Accion", "Fecha","Dato Actualizado", "Dato Antiguo"];
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
          <ListHeader label="Listado Logs" buttonText="" />
            <SoftBox>
              <MUIDataTable data={rows} columns={columns} options={muiOptions} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}
export default Logs;
