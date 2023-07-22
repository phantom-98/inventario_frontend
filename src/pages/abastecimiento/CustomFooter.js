import React from "react";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MuiTablePagination from "@mui/material/TablePagination";
import { withStyles } from "tss-react/mui";
import PropTypes from "prop-types";

const defaultFooterStyles = {
};

class CustomFooter extends React.Component {

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const { count, classes, textLabels, rowsPerPage, page } = this.props;

    const footerStyle = {
      display:'flex', 
      justifyContent: 'flex-end',
      padding: '0px 24px 0px 24px'
    };

    return (
      <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
      
          
            <MuiTablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
              backIconButtonProps={{
                'aria-label': textLabels.previous,
              }}
              nextIconButtonProps={{
                'aria-label': textLabels.next,
              }}
              rowsPerPageOptions={[10,20,100]}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleRowChange}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

}
CustomFooter.propTypes = {
    changeRowsPerPage: PropTypes.any,
    changePage: PropTypes.any,
    count: PropTypes.any,
    textLabels: PropTypes.any,
    rowsPerPage: PropTypes.any,
    page: PropTypes.any,
    classes: PropTypes.any,
  };

export default withStyles(CustomFooter, defaultFooterStyles, { name: "CustomFooter" });