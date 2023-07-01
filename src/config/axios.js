import axios from 'axios'

const token = localStorage.getItem("token")

const clienteAxios = axios.create({
    baseURL:'http://206.189.239.87:4000/v1/',
    headers: {
        'x-token': token
      }
})

export default clienteAxios
