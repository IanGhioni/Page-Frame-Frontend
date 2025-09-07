import api from "./axiosInstance";
const base_url = "/contenido"

export function buscarPorNombre(nombre, pagina, cantidad) {
    return api.get(base_url+"/search?nombre="+nombre+"&nroPagina="+pagina+"&tamanioPagina="+cantidad)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response))
}

export function buscarPorId(id) {
    return api.get(base_url+"/"+id)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response))
}