import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@mui/material";

const ImageList = ({ list, moveFileLeft, moveFileRight, remove }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: "10px",
        border: "1px solid black",
        margin: "5px",
        backgroundColor: "white",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      {list.map((element, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <img src={element.file} style={{ width: "100px" }} alt="Preview" />
          <div style={{ position: "relative" }}>
            <Icon
              onClick={() => {
                moveFileLeft(i);
              }}
              style={{ cursor: "pointer" }}
            >
              chevron_left
            </Icon>
            <Icon
              onClick={() => {
                moveFileRight(i);
              }}
              style={{ cursor: "pointer" }}
            >
              chevron_right
            </Icon>
          </div>
          <Icon
            style={{
              position: "absolute",
              top: "0px",
              right: "-5px",
            }}
            onClick={() => remove(element.id)}
          >
            cancel
          </Icon>
        </div>
      ))}
    </div>
  );
};
ImageList.propTypes = {
  list: PropTypes.array,
  moveFileLeft: PropTypes.func,
  moveFileRight: PropTypes.func,
  remove: PropTypes.func,
};
export default ImageList;
