import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from "@mui/material/Icon";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Tooltip from '@mui/material/Tooltip';
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

const columnsFunc = (rows, edit, onDelete) =>{
    let actionTemp = {
    
        name: "Action",
        options: {
          filter: false,
          sort: false,

          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
               <SoftButton variant="text" color="success" onClick={(e) => location.href = `/inventario/precios/${tableMeta.rowData[0]}`} >
                    <Tooltip title="precios">
                        <AttachMoneyIcon/>
                    </Tooltip>
                </SoftButton>

                <SoftButton variant="text" color="dark" onClick={(e) => edit(tableMeta.rowData[0])}>
                    <Tooltip title="editar">
                        <Icon>edit</Icon>
                    </Tooltip>
                </SoftButton>
                <SoftButton variant="text" color="error"  onClick={(e) => onDelete(tableMeta.rowData[7])} >
                    <Tooltip title="borrar">
                        <Icon>delete</Icon>
                    </Tooltip>
                </SoftButton>
              </>
            );
          }
        }
    };

    rows.push(actionTemp)
    return rows
      
}

const columnsFunc2 = (rows, edit, index, onDelete) =>{
  let actionTemp = {
  
      name: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta)
          return (
            <>
               
                <SoftButton variant="text" color="dark" onClick={(e) => edit(tableMeta.rowData[index])}>
                    <Icon>edit</Icon>
                </SoftButton>
                <SoftButton variant="text" color="error" onClick={(e) => onDelete(tableMeta.rowData[index])} >
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
const columnsFunc3 = (rows, edit, index, onDelete) =>{
    let actionTemp = {
    
        name: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(tableMeta)
            return (
              <>
                 
                  <SoftButton variant="text" color="dark" onClick={(e) => edit(tableMeta.rowData)}>
                      <Icon>edit</Icon>
                  </SoftButton>
                  <SoftButton variant="text" color="error" onClick={(e) => onDelete(tableMeta.rowData)} >
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
    columnsFunc,
    columnsFunc2,
    columnsFunc3
}