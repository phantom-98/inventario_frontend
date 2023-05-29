
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
    if(rowsData.rowsData[0]){
        columns = Object.keys(rowsData.rowsData[0])
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
