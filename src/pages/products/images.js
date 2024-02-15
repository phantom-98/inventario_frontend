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
import MyDropzone from "components/DropZone";
import { Icon } from "@mui/material";
import { errorSwal } from "config/helpers";
function ProductImages() {
  const routeParams = useParams();
  const { id } = routeParams;
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    const data = await clienteAxios.get("product/images/" + id);
    let respData = data.data;

    if (respData.length > 0) {
      setImages([...respData]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const customImgHanlder = (files) => {
    const mappedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Update state with the new files
    setUploadedFiles([...uploadedFiles, ...files]);
  };
  const clearImg = () => setUploadedFiles([]);
  const removeImg = async (id) => {
    const resp = await clienteAxios.delete(`product/image/${id}`);
    const data = resp.data;
    setImages([...data]);
  };

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

    setImages(updatedFiles); // Update the state with the new files array
  };
  const moveFileRightLoad = (dragIndex, event) => {
    event.stopPropagation();
    const dragFile = uploadedFiles[dragIndex];
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex + 1, 0, dragFile); // Insert the file at its new position
    setUploadedFiles(updatedFiles); // Update the state with the new files array
  };
  const moveFileLeftLoad = (dragIndex, event) => {
    event.stopPropagation();
    const dragFile = uploadedFiles[dragIndex];
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(dragIndex, 1); // Remove the file from its original position
    updatedFiles.splice(dragIndex - 1, 0, dragFile); // Insert the file at its new position

    setUploadedFiles(updatedFiles); // Update the state with the new files array
  };
  const onSubmit = async () => {
    await clienteAxios.post("product/updateImage", images);
    succesSwal();
  };
  const onSubmit2 = async () => {
    const bodyFormData = new FormData();
    for (let index = 0; index < uploadedFiles.length; index++) {
      bodyFormData.append("files", uploadedFiles[index]);
    }
    //bodyFormData.append("files", uploadedFiles ?? null);
    //axios.post("http://localhost:4000/v1/product", bodyFormData).then((resp) => console.log("yes"));
    clienteAxios
      .post(`product/images/${id}`, bodyFormData)
      .then((resp) => {
        const respdata = resp.data;
        setImages([...respdata]);
        setUploadedFiles([]);
        succesSwal();
      })
      .catch((e) => {
        errorSwal(e.response.data.msg);
      });
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
                  <SoftBox mb={2}>
                    <ImageList
                      list={images}
                      moveFileLeft={moveFileLeft}
                      moveFileRight={moveFileRight}
                      remove={removeImg}
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          <SoftBox mt={2} mb={5} ml={3}>
            <SoftButton type="submit" variant="gradient" color="dark">
              Guardar
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit2)}>
          <SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={6}>
                  <InputLabel variant="standard" htmlFor="Sku">
                    Imagen
                    <Icon onClick={clearImg} style={{ marginLeft: "5px", cursor: "pointer" }}>
                      delete
                    </Icon>
                  </InputLabel>
                  <SoftBox mb={2}>
                    <MyDropzone
                      files={uploadedFiles}
                      onChange={customImgHanlder}
                      moveFileRight={moveFileRightLoad}
                      moveFileLeft={moveFileLeftLoad}
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          <SoftBox mt={2} mb={5} ml={3}>
            <SoftButton type="submit" variant="gradient" color="dark">
              Guardar
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ProductImages;
