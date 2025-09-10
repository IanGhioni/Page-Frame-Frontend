import axios from "axios";

const base_url = 'http://localhost:8080'

const explorarContenidos = (pagina) => axios.get(base_url+"/contenido/explorarContenido?nroPagina="+pagina+"&tamanioPagina=12")
const loginUser = (body) => axios.post(`${base_url}/auth/login`, body)
const registerUser = (body) => axios.post(`${base_url}/auth/register`, body)

export default {
    explorarContenidos,
    loginUser,
    registerUser
}