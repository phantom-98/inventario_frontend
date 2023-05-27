/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";
import NotificationItem from "examples/Items/NotificationItem";
import Menu from "@mui/material/Menu";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';
import {deleteSwal} from 'config/helpers.js'


function Author({ name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
     
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium" color="secondary">
          {name}
        </SoftTypography>

      </SoftBox>
    </SoftBox>
  );
}

function deleteRow(item) {
	deleteSwal("stores/"+item.uid)
}

const tableData = (data, edit)=>{
	

	

	return {
		columns: [
			{ name: "nombre", align: "left" },
			{ name: "direccion", align: "left" },
			{ name: "telefono", align: "center" },
			{ name: "estado", align: "center" },
			{ name: "action", align: "center" },
		],
		rows: data.map(d=>{
			let status = d.status ? "Activo" : "Inactivo"
			let statusColor = d.status ? "success" : "danger"
			return {
				nombre: <Author name={d.name} />,
				direccion: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
									{d.address}
							</SoftTypography>,
				telefono: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.phone}
					</SoftTypography>
				),
				estado: (
					<SoftBadge variant="gradient" badgeContent={status} color={statusColor} size="xs" container />
				
				),
				action: (
					<>
						<Stack direction="row" spacing={1}>
							<IconButton aria-label="edit" onClick={()=>edit(d)}>
								<CreateIcon />
							</IconButton>
							<IconButton aria-label="delete" onClick={()=>deleteRow(d.uid)}>
								<DeleteIcon />
							</IconButton>

						</Stack>
						
					</>
				)
			}
		})
	
	};
}



export default tableData;
