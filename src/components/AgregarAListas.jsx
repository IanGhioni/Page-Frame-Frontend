import { useState, useEffect } from "react";
import API from "../service/api";
import "./AgregarALista.css";

const listaOpcionesLibro = ["LEIDO", "QUIERO LEER"];
const listaOpcionesPelicula = ["VISTO", "QUIERO VER"];

const AgregarAListas = ({ idContenido, esPelicula }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [listaActual, setListaActual] = useState(null);

   const handleAgregarClick = () => setShowPopup(true);
   const handleClosePopup = () => setShowPopup(false);

   useEffect(() => {
      const idUsuario = localStorage.getItem("id");
      if (!idUsuario) return;

      API.getUsuarioPorId(idUsuario)
         .then((response) => {
            // Busca el contenido por id
            console.log("Respuesta de API: 👮‍♀️", response.data);
            const contenido = response.data.contenidos.find(
               (c) => String(c.contenidoId) === String(idContenido)
            );
            setListaActual(contenido ? contenido.estado : null);
            console.log(
               "Contenido encontrado post setear en null: 😛",
               contenido
            );
            console.log(
               "Estado actual del contenido: 😎",
               contenido ? contenido.estado : null
            );
         })
         .catch((err) => {
            console.error("Error al obtener contenidos del usuario:", err);
            setListaActual(null);
         });
   }, [idContenido]);

   const handleAgregarALista = (nombreLista) => {
      API.agregarALista(localStorage.getItem("id"), idContenido, nombreLista)
         .then(() => {
            setListaActual(nombreLista);
            setShowPopup(false);
            console.log("Agregado a la lista: 👼", nombreLista);
         })
         .catch(() => alert("Error al agregar a la lista"));
   };

   const handleQuitarDeLista = () => {
      API.eliminarContenidoDeLista(localStorage.getItem("id"), idContenido)
         .then(() => {
            setListaActual(null);
            setShowPopup(false);
            console.log("Contenido eliminado de la lista: 🗑️", idContenido);
         })
         .catch(() => alert("Error al quitar el contenido de la lista "));
   };

   const opciones = esPelicula ? listaOpcionesPelicula : listaOpcionesLibro;

   return (
      <>
         <button onClick={handleAgregarClick} className="button-agregarALista">
            {listaActual ? `En lista: ${listaActual}` : "Agregar a lista"}
         </button>
         {showPopup && (
            <div className="popup-agregarALista">
               <h1
                  onClick={handleClosePopup}
                  className="popup-cancel-button"
               >
                  x
               </h1>
               <h1 className="popup-title">Selecciona una lista:</h1>
               <div className="popup-options">
                  {opciones.map((opcion) => (
                     <button
                        key={opcion}
                        onClick={() => handleAgregarALista(opcion)}
                        className="popup-button"
                     >
                        {opcion}
                     </button>
                  ))}
               </div>
               {listaActual && (
                  <button
                     onClick={handleQuitarDeLista}
                     className="popup-delete-button"
                  >
                     Quitar de lista
                  </button>
               )}
               
            </div>
         )}
      </>
   );
};

export default AgregarAListas;
