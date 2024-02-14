import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@mui/material";

const ImageList = ({ list, moveFileLeft, moveFileRight }) => {
  console.log(list);
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
      }}
    >
      {list.map((element, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={element.file} style={{ width: "100px" }} alt="Preview" />
          <div style={{ position: "relative" }}>
            <Icon
              onClick={() => {
                moveFileLeft(i);
              }}
            >
              chevron_left
            </Icon>
            <Icon
              onClick={() => {
                moveFileRight(i);
              }}
            >
              chevron_right
            </Icon>
          </div>
        </div>
      ))}
    </div>
  );

  list.map((element, i) => (
    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src={element.file} style={{ width: "100px" }} alt="Preview" />
      <div>test</div>
      {/* <div style={{ position: "relative" }}>
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
      </div> */}
    </div>
  ));
};
ImageList.propTypes = {
  list: PropTypes.array,
  moveFileLeft: PropTypes.func,
  moveFileRight: PropTypes.func,
};
export default ImageList;
