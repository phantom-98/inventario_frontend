import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import checkUserPermissions from "./guardProfileHelper";
import { useEffect } from "react";

const RouteGuard = ({profileTypes,component}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const isAllowed = checkUserPermissions(user.profile.type,profileTypes)
    
    if(isAllowed){
        return <>{component}</>
    }else {
        useEffect(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario sin accesos',
            })
            navigate("/inventario")
        },[])
        
    }
}

RouteGuard.propTypes = {
    component : PropTypes.element,
    profileTypes : PropTypes.array
};

export default RouteGuard