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
			{ name: "sku", align: "left" },
			{ name: "cod_barras", align: "left" },
			{ name: "nombre", align: "center" },
			{ name: "laboratorio", align: "center" },
			{ name: "stock", align: "center" },
			{ name: "precio_normal", align: "center" },
			{ name: "precio_oferta", align: "center" },
			{ name: "action", align: "center" },
		],
		rows: data.map(d=>{
			let status = d.status ? "Activo" : "Inactivo"
			let statusColor = d.status ? "success" : "danger"
			
			return {
				sku: <Author name={d.sku} />,
				
				cod_barras: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.codigoBarra}
					</SoftTypography>
				),
				nombre: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.nombre}
					</SoftTypography>
				),
				laboratorio: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.laboratorio}
					</SoftTypography>
				),
				stock: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.stock}
					</SoftTypography>
				),
				precio_normal: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.precio}
					</SoftTypography>
				),
				precio_oferta: (
					<SoftTypography variant="caption" color="secondary" fontWeight="medium">
						{d.precioOferta}
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
