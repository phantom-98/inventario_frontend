import axios from 'axios'
import { useSelector } from "react-redux";
const token = localStorage.getItem("token") 
//const user = useSelector(state => state.user)
//console.log(user)
console.log(token)

const clienteAxios = axios.create({
    baseURL:'http://localhost:4000/v1/',
    headers: {
        'x-token': token
      }
})

clienteAxios.interceptors.response.use((response) => response, (error) => {
    if(error.response.data.msg == "error en el token"){
        location.href = "/"
    }
});


export default clienteAxios