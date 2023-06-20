import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";


const muiOptions = {
    filterType: 'checkbox',
    textLabels: {
      body: {
        noMatch: "Sorry, no matching records found",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por Pagina:",
        displayRows: "de",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    }
};

const columnsFunc = (rows, edit) =>{
    let actionTemp = {
    
        name: "Action",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <SoftButton variant="text" color="dark" onClick={(e) => edit(tableMeta.rowData[0])}>
                    <Icon>edit</Icon>
                </SoftButton>
                <SoftButton variant="text" color="error">
                    <Icon>delete</Icon>
                </SoftButton>
              </>
            );
          }
        }
    };

    rows.push(actionTemp)
    return rows
      
}

export {
    muiOptions,
    columnsFunc
}