import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
function MyDropzone({ files, onChange }) {
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
        <img key={i} src={element.preview} style={{ width: "100px" }} alt="Preview" />
      ))}
      {files.length == 0 && <div>Arrastre o seleccione archivos</div>}
    </div>
  );
}
MyDropzone.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
};

export default MyDropzone;
