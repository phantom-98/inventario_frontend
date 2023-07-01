import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import { useSoftUIController, setLayout } from "context";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
function DashboardLayout({ children }) {

    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav } = controller;
    const { pathname } = useLocation();

    const open = useSelector(state => state.helper.loading)
    

    useEffect(() => {
        setLayout(dispatch, "dashboard");
    }, [pathname]);

    return (
        <SoftBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
            p: 3,
            position: "relative",

            [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.standard,
            }),
            },
        })}
        >
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
        {children}
        </SoftBox>
    );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
children: PropTypes.node.isRequired,
};

export default DashboardLayout;
