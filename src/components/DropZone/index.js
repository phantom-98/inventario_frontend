import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { Icon } from "@mui/material";
function MyDropzone({ files, onChange, moveFileLeft, moveFileRight }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid #eee",
        fontSize: "15px",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "2px dotted gray",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {files.map((element, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={element.preview} style={{ width: "100px" }} alt="Preview" />
          <div style={{ position: "relative" }}>
            <Icon
              onClick={(e) => {
                moveFileLeft(i, e);
              }}
            >
              chevron_left
            </Icon>
            <Icon
              onClick={(e) => {
                moveFileRight(i, e);
              }}
            >
              chevron_right
            </Icon>
          </div>
        </div>
      ))}
      {files.length == 0 && <div>Arrastre o seleccione archivos</div>}
    </div>
  );
}
MyDropzone.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
  moveFileLeft: PropTypes.func,
  moveFileRight: PropTypes.func,
};

export default MyDropzone;
