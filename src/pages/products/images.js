import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import ListHeader from "components/ListHeader";
import ImageList from "./components/ImageList";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import clienteAxios from "config/axios";
import { useForm } from "react-hook-form";
import SoftButton from "components/SoftButton";
import { succesSwal } from "config/helpers";
function ProductImages() {
  const routeParams = useParams();
  const { id } = routeParams;
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(id);
  const getData = async () => {
    const data = await clienteAxios.get("product/images/" + id);
    let respData = data.data;
    console.log(respData);
    if (respData.length > 0) {
      setImages([...respData]);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const moveFileRight = (dragIndex) => {
    const dragFile = images[dragIndex];
    const updatedFiles = [...images];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex + 1, 0, dragFile); // Insert the file at its new position
    setImages(updatedFiles); // Update the state with the new files array
  };
  const moveFileLeft = (dragIndex) => {
    const dragFile = images[dragIndex];
    const updatedFiles = [...images];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex - 1, 0, dragFile); // Insert the file at its new position
    for (let index = 0; index < updatedFiles.length; index++) {
      const element = updatedFiles[index];
      element.position = index + 1;
    }
    setImages(updatedFiles); // Update the state with the new files array
  };
  const onSubmit = async () => {
    await clienteAxios.post("product/updateImage", images);
    succesSwal();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <ListHeader url="/inventario" label="Editar Imagenes" buttonText="Regresar" />
        <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
          <SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Imagenes
                    {/* <Icon onClick={clearImg} style={{ marginLeft: "5px", cursor: "pointer" }}>
                    delete
                  </Icon> */}
                  </InputLabel>
                  <SoftBox mb={2} style={{ backgroundColor: "white" }}>
                    <ImageList
                      list={images}
                      moveFileLeft={moveFileLeft}
                      moveFileRight={moveFileRight}
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="dark" style={{ float: "right" }}>
              Guardar
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ProductImages;
