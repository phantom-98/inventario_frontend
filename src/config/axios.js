import axios from 'axios'
import { useSelector } from "react-redux";
const token = localStorage.getItem("token") 
//const user = useSelector(state => state.user)
console.log()
console.log(token)

const clienteAxios = axios.create({
    baseURL:process.env.REACT_APP_INVENTARIO_API_URL,
    headers: {
        'x-token': token
      }
})

clienteAxios.interceptors.response.use((response) => response, (error) => {
    console.log(error.code)

    //todo change for prod
   /* if(error.code == "ERR_BAD_REQUEST"){
        location.href = "/"
    }
    if(error.response.data.msg == "error en el token"){
        location.href = "/"
    }*/
});


export default clienteAxios