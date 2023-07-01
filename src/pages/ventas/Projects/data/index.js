// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "Fecha", align: "center" },
      { name: "Desde", align: "center" },
      { name: "tipo_de_pago", align: "center" },
      { name: "total", align: "center" },
      { name: "rut", align: "center"}
    ],

    rows: [
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        rut: (
          <SoftTypography width="15rem"textAlign="center">
            11
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        direccion: (
          <SoftTypography width="15rem"textAlign="center">
            cuidad de mexico no. 125
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        direccion: (
          <SoftTypography width="15rem" textAlign="center">
            cuidad de mexico no. 125
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        direccion: (
          <SoftTypography width="15rem"textAlign="center">
            cuidad de mexico no. 125
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        direccion: (
          <SoftTypography width="15rem" textAlign="center">
            cuidad de mexico no. 125
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
      {
        companies: [logoXD, "Soft UI XD Version"],
        Fecha: (
          <SoftBox  display="flex" py={1}>
            2/07/23
          </SoftBox>
        ),
        Desde: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            web
          </SoftTypography>
        ),
        tipo_de_pago: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            debito
          </SoftTypography>
        ),
        direccion: (
          <SoftTypography width="15rem" textAlign="center">
            cuidad de mexico no. 125
          </SoftTypography>
        ),
        total: (
          <SoftTypography textAlign="center">
            $62,560
          </SoftTypography>
        ),
      },
    ],
  };
}
