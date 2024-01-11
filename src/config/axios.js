import axios from 'axios'
const token = localStorage.getItem("token") 

const clienteAxios = axios.create({
    baseURL:process.env.REACT_APP_INVENTARIO_API_URL,
    headers: {
        'x-token': token
      }
})

clienteAxios.interceptors.response.use((response) => response, (error) => {
    console.log(error.code)

    //todo change for prod
    //todo manejar errores de api
	if(error.code == "ERR_BAD_REQUEST"){
        location.href = "/"
    }
    if(error.response.data.msg == "error en el token"){
        location.href = "/"
    }
});


export default clienteAxios
