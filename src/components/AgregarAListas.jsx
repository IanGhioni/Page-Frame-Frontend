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
   const [listasPersonalizadas, setListasPersonalizadas] = useState([]);

   const handleAgregarClick = () => {
      setShowPopup(true);
      cargarListasPersonalizadas();
   };   
   const handleClosePopup = () => setShowPopup(false);
   const navigate = useNavigate();
   const goToLogin = () => navigate("/login");

   const cargarListasPersonalizadas = () => {
      const idUsuario = localStorage.getItem("id");
      if (!idUsuario) return;
      API.getListasPersonalizadas(idUsuario)
         .then((response) => {
            setListasPersonalizadas(response.data); 
         })
         .catch(() => setListasPersonalizadas([]));
   };

   useEffect(() => {
      const idUsuario = localStorage.getItem("id");
      if (!idUsuario) return;

      API.getUsuarioPorId(idUsuario)
         .then((response) => {
            // Busca el contenido por id en listas comunes (NO personalizadas!!!!)
            console.log(response.data)
            const contenido = response.data.contenidos.find(
               (c) => String(c.contenidoId) === String(idContenido)
            );
            console.log(response.data.contenidoPersonalizado)
            const contenidoP = response.data.contenidoPersonalizado.find(
               (l) => l.contenidos.find((c) => String(c.id) === String(idContenido))
            );
            setListaActual(contenido ? contenido.estado : (contenidoP ? "Personalizada" : null));
            console.log(contenidoP + "🙌")
         })
         .catch(() => {
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

      const handleAgregarAListaPersonalizada = (nombreLista) => {
      API.agregarAListaPersonalizada(localStorage.getItem("id"), idContenido, nombreLista)
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
               {listasPersonalizadas.length > 0 && (
                  <div className="popup-options">
                     {listasPersonalizadas.map((lista) => (
                        <button
                           key={lista.id}
                           onClick={() => handleAgregarAListaPersonalizada(lista.nombre)}
                           className="popup-button"
                        >
                           {lista.nombre}
                        </button>
                     ))}
                  </div>
               )}
               <button
                  onClick={() => localStorage.getItem("id") ? navigate("/crearLista", { state: { contenido: idContenido } }) : goToLogin()}
                  className="popup-button popup-crear-button"
               > + Crear lista
               </button>
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