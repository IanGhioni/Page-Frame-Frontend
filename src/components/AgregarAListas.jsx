import { useState, useEffect } from "react";
import API from "../service/api";
import "./AgregarALista.css";
import { useNavigate } from "react-router-dom";

const AgregarAListas = ({
   idContenido,
   esPelicula,
   onRefresh,
   setOnRefresh,
   tieneReview
}) => {
   const listaOpcionesLibro = ["LEIDO", "QUIERO LEER"];
   const listaOpcionesPelicula = ["VISTO", "QUIERO VER"];
   const [showPopup, setShowPopup] = useState(false);
   const [listaActual, setListaActual] = useState(null);

   const handleAgregarClick = () => setShowPopup(true);
   const handleClosePopup = () => setShowPopup(false);
   const navigate = useNavigate();
   const goToLogin = () => navigate("/login");

   useEffect(() => {
      const idUsuario = localStorage.getItem("id");
      if (!idUsuario) return;

      API.getUsuarioPorId(idUsuario)
         .then((response) => {
            // Busca el contenido por id
            const contenido = response.data.contenidos.find(
               (c) => String(c.contenidoId) === String(idContenido)
            );
            setListaActual(contenido ? contenido.estado : null);
         })
         .catch((err) => {
            setListaActual(null);
         });
         
   }, [idContenido, onRefresh]);

   const handleAgregarALista = (nombreLista) => {
      API.agregarALista(localStorage.getItem("id"), idContenido, nombreLista)
         .then(() => {
            setListaActual(nombreLista);
            setShowPopup(false);
            setOnRefresh(!onRefresh);
         })
         .catch(() => goToLogin());
   };

   const handleQuitarDeLista = () => {
      tieneReview && alert("No puedes quitar el contenido de la lista si ya has dejado una reseña");
      if (tieneReview) return;
      API.eliminarContenidoDeLista(localStorage.getItem("id"), idContenido)
         .then(() => {
            setListaActual(null);
            setShowPopup(false);
            console.log("Contenido eliminado de la lista: 🗑️", idContenido);
            setOnRefresh(!onRefresh);
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
               <h1 onClick={handleClosePopup} className="popup-cancel-button">
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
