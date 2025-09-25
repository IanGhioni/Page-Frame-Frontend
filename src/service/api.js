import axios from "axios";

const base_url = 'http://localhost:8080'

const explorarContenidos = (pagina) => axios.get(base_url+"/contenido/explorarContenido?nroPagina="+pagina+"&tamanioPagina=12")
const loginUser = (body) => axios.post(`${base_url}/auth/login`, body)
const registerUser = (body) => axios.post(`${base_url}/auth/register`, body)
const agregarALista = (idUser, idContenido, nombreLista) => axios.post(`${base_url}/usuario/${idUser}/agregar/${idContenido}/aLista/${nombreLista}`)
const getPorUsername = (username) => axios.get(`${base_url}/usuario/${username}`)
const getUsuarioPorId = (id) => axios.get(`${base_url}/usuario/id/${id}`)
const eliminarContenidoDeLista = (idUser, idContenido) => axios.delete(`${base_url}/usuario/${idUser}/eliminarDeLista/${idContenido}`)
const verLista = (idUser, nombreLista) => axios.get(`${base_url}/usuario/${idUser}/lista/${nombreLista}`)
const valorarContenido = (idContenido, rating, idUser) => axios.post(`${base_url}/contenido/${idContenido}/valorar/${rating}/${idUser}`)
const eliminarReview = (idContenido, idUser) => axios.delete(`${base_url}/contenido/${idContenido}/eliminarValoracion/${idUser}`)
const getListasPersonalizadas = (idUser) => axios.get(`${base_url}/usuario/${idUser}`)
const crearLista = (idUser, nombre, descripcion) => axios.post(`${base_url}/usuario/${idUser}/crear/${nombre}/conDescipcion/${descripcion}`)

export default {
    explorarContenidos,
    loginUser,
    registerUser,
    agregarALista,
    getPorUsername,
    getUsuarioPorId,
    eliminarContenidoDeLista,
    verLista,
    valorarContenido,
    eliminarReview,
    getListasPersonalizadas,
    crearLista
}