import axios from "axios";

const base_url = 'http://localhost:8080/contenido'

const explorarContenidos = (pagina) => axios.get(base_url+"/explorarContenido?nroPagina="+pagina+"&tamanioPagina=12")

export default {
    explorarContenidos
}