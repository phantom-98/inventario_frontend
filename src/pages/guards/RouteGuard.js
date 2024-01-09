import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import checkUserPermissions from "./guardProfileHelper";
import { useEffect } from "react";

const RouteGuard = ({profileTypes,Component}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    console.log(user.profile);
    const isAllowed = checkUserPermissions(user.profile.type,profileTypes)
    
    if(isAllowed){
        return <>{Component}</>
    }else {
        useEffect(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario sin accesos',
            })
            navigate(-1)
        },[])
        
    }
}

RouteGuard.propTypes = {
    Component : PropTypes.element,
    profileTypes : PropTypes.array
};

export default RouteGuard