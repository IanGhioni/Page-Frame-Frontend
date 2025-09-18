import axios from "axios";

const base_url = 'http://localhost:8080'

const explorarContenidos = (pagina) => axios.get(base_url+"/contenido/explorarContenido?nroPagina="+pagina+"&tamanioPagina=12")
const loginUser = (body) => axios.post(`${base_url}/auth/login`, body)
const registerUser = (body) => axios.post(`${base_url}/auth/register`, body)
const agregarALista = (idUser, idContenido, nombreLista) => axios.post(`${base_url}/usuario/${idUser}/agregar/${idContenido}/aLista/${nombreLista}`)
const getPorUsername = (username) => axios.get(`${base_url}/usuario/${username}`)

export default {
    explorarContenidos,
    loginUser,
    registerUser,
    agregarALista,
    getPorUsername
}