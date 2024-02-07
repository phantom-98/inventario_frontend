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

function Usuarios() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    dispatch(loadingAction());
    //const data = await clienteAxios.get('users/');
    const data2 = await clienteAxiosAuth.get("/auth");
    console.log(data2.data);
    dispatch(loadingAction());
    let respData = data2.data;
    let tempRows = respData.map((r) => {
      return [r.first_name, r.email, r.profile.type, r.id];
    });
    setRows(tempRows);
  };
  useEffect(() => {
    getData();
  }, []);
  const edit = (item) => {
    navigate(`/usuario/edit/${item}`);
  };
  const onDelete = (item) => {
    /* clienteAxiosAuth.delete(`auth/${item}`).then(() => {
      getData();
    }); */
    errorSwal("No se pueden eliminar usuarios, solo desactivar");
  };
  const columns = columnsFunc2(["Nombre", "Email", "Rol"], edit, 3, onDelete);
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <ListHeader url="/usuarios/create" label="Listado Usuarios" buttonText="Agregar +" />
            <SoftBox>
              <MUIDataTable data={rows} columns={columns} options={muiOptions} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}
export default Usuarios;
