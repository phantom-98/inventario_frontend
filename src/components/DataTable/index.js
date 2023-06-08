
import { useState, useMemo } from "react";

import MUIDataTable from "mui-datatables";

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

function DataTableComponent(rowsData) {
    let columns = []
    let data = []
    console.log(rowsData.rowsData)
    if(rowsData.rowsData){
        columns = Object.keys(rowsData.rowsData)
        data = rowsData.rowsData.map( d => Object.values(d));
    }
    
    const options = {
      filterType: 'checkbox',
    };
    
    return (
        <MUIDataTable
           
            data={data}
            columns={columns}
            options={options}
        />
    );
}

export default DataTableComponent;
