import api from "./axiosInstance";
const base_url = "/contenido"

export default function buscarPorNombre(nombre, pagina, cantidad) {
    return api.get(base_url+"/search?nombre="+nombre+"&nroPagina="+pagina+"&tamanioPagina="+cantidad)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response))
}