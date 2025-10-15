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
const eliminarRating = (idContenido, idUser) => axios.delete(`${base_url}/contenido/${idContenido}/eliminarValoracion/${idUser}`)
const getListasPersonalizadas = (idUser) => axios.get(`${base_url}/usuario/${idUser}/listas`)
const agregarAListaPersonalizada = (idUser, idContenido, nombreLista) => axios.post(`${base_url}/usuario/${idUser}/agregar/${idContenido}/aListaPersonalizada/${nombreLista}`)
const getListasPersonalizada = (idUser, nombreLista) => axios.get(`${base_url}/usuario/${idUser}/getListaPersonalizada/${nombreLista}`)
const getContenidosDeListaPersonalizada = (idUser, nombreLista) => axios.get(`${base_url}/usuario/${idUser}/getContenidoDeListaPersonalizada/${nombreLista}`)
const eliminarListaPersonalizada = (idUser, nombreLista) => axios.delete(`${base_url}/usuario/${idUser}/eliminar/listaPersonalizada/${nombreLista}`)
const eliminarContenidoDeListaPersonalizada = (idUser, idContenido, nombreLista) => axios.delete(`${base_url}/usuario/${idUser}/eliminar/${idContenido}/DeListaPersonalizada/${nombreLista}`)
const buscarContenidoPorAutor = (nombre, nroPagina, tamañoPagina) => axios.get(`${base_url}/contenido/searchAutores?nombre=${nombre}&nroPagina=${nroPagina}&tamanioPagina=${tamañoPagina}`)
const escribirReview = (contenidoId, userId, body) => axios.post(`${base_url}/contenido/escribirReview/${contenidoId}/${userId}`, body)
const eliminarReview = (contenidoId, userId) => axios.delete(`${base_url}/contenido/${contenidoId}/eliminarReview/${userId}`)
const buscarPorNombreLibros = (nombre, pagina, cantidad) => axios.get(`${base_url}/contenido/search/libros?nombre=${nombre}&nroPagina=${pagina}&tamanioPagina=${cantidad}`)
const buscarPorNombrePeliculas = (nombre, pagina, cantidad) => axios.get(`${base_url}/contenido/search/peliculas?nombre=${nombre}&nroPagina=${pagina}&tamanioPagina=${cantidad}`)
const buscarPorAutoresLibros = (nombre, pagina, cantidad) => axios.get(`${base_url}/contenido/searchAutores/libros?nombre=${nombre}&nroPagina=${pagina}&tamanioPagina=${cantidad}`)
const buscarPorAutoresPeliculas = (nombre, pagina, cantidad) => axios.get(`${base_url}/contenido/searchAutores/peliculas?nombre=${nombre}&nroPagina=${pagina}&tamanioPagina=${cantidad}`)
const editarReview = (contenidoId, userId, body) => axios.put(`${base_url}/contenido/escribirReview/${contenidoId}/${userId}`, body)

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
    eliminarRating,
    getListasPersonalizadas,
    agregarAListaPersonalizada,
    getContenidosDeListaPersonalizada,
    eliminarListaPersonalizada,
    eliminarContenidoDeListaPersonalizada,
    buscarContenidoPorAutor,
    escribirReview,
    eliminarReview,
    buscarPorNombreLibros,
    buscarPorNombrePeliculas,
    buscarPorAutoresLibros,
    buscarPorAutoresPeliculas,
    editarReview,
    getListasPersonalizada
}