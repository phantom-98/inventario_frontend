import axios from 'axios'

const token = localStorage.getItem("token")

const clienteAxios = axios.create({
    baseURL:'http://localhost:4000/v1/',
    headers: {
        'x-token': token
      }
})

export default clienteAxios