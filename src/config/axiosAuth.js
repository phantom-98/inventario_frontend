import axios from 'axios'
const token = localStorage.getItem("token") 

const clienteAxiosAuth = axios.create({
    baseURL:process.env.REACT_APP_URL,
    headers: {
        'x-token': token
      }
})




export default clienteAxiosAuth