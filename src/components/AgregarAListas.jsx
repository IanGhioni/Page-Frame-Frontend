import { useState, useEffect } from "react";
import API from "../service/api";
import "./AgregarALista.css";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";

const AgregarAListas = ({
   idContenido,
   esPelicula,
   onRefresh,
   tieneReview,
   setLeidoOVisto,
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
            const contenido = response.data.contenidos.find(
               (c) => String(c.contenidoId) === String(idContenido)
            );
            const contenidoP = response.data.contenidoPersonalizado.find((l) =>
               l.contenidos.find((c) => String(c.id) === String(idContenido))
            );
            setListaActual(
               contenido
                  ? contenido.estado
                  : contenidoP
                  ? "En lista personalizada"
                  : null
            );
            if (contenido && (contenido.estado === "LEIDO" || contenido.estado === "VISTO")) {
               setLeidoOVisto(true);
            }
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
            onRefresh();
         })
         .catch(() => goToLogin());
   };

   const handleAgregarAListaPersonalizada = (nombreLista) => {
      API.agregarAListaPersonalizada(
         localStorage.getItem("id"),
         idContenido,
         nombreLista
      )
         .then(() => {
            setListaActual(nombreLista);
            setShowPopup(false);
            onRefresh();
         })
         .catch(() => goToLogin());
   };

   const handleQuitarDeLista = () => {
      tieneReview &&
         alert(
            "No puedes quitar el contenido de la lista si ya has dejado una reseña"
         );
      if (tieneReview) return;
      API.eliminarContenidoDeLista(localStorage.getItem("id"), idContenido)
         .then(() => {
            setListaActual(null);
            setShowPopup(false);
            onRefresh();
         })
         .catch(() => alert("Error al quitar el contenido de la lista "));
   };

   const opciones = esPelicula ? listaOpcionesPelicula : listaOpcionesLibro;

   return (
      <>
         <button onClick={handleAgregarClick} className="button-agregarALista">
            <div></div>
            {listaActual ? `${listaActual}` : "Agregar a lista"}
            <FaAngleDown className="icon-agregarALista" />
         </button>
         {showPopup && (
            <PopUpAgregarALista
               showPopup={showPopup}
               handleClosePopup={handleClosePopup}
               opciones={opciones}
               handleAgregarALista={handleAgregarALista}
               listasPersonalizadas={listasPersonalizadas}
               handleAgregarAListaPersonalizada={
                  handleAgregarAListaPersonalizada
               }
               idContenido={idContenido}
               navigate={navigate}
               goToLogin={goToLogin}
               listaActual={listaActual}
               handleQuitarDeLista={handleQuitarDeLista}
               tieneReview={tieneReview}
            />
         )}
      </>
   );
};

const PopUpAgregarALista = ({
   handleClosePopup,
   opciones,
   handleAgregarALista,
   listasPersonalizadas,
   handleAgregarAListaPersonalizada,
   idContenido,
   navigate,
   goToLogin,
   listaActual,
   handleQuitarDeLista,
}) => {
   return (
      <div className="overlay" onClick={handleClosePopup}>
         <div className="popup-agregarALista">
            <div className="popup-agregar-content">
               <IoIosClose
                  onClick={handleClosePopup}
                  className="popup-cancel-button"
               />
               <h1 className="popup-title">Selecciona una lista</h1>
               <div className="popup-default-options">
                  {opciones.map((opcion) => (
                     <button
                        key={opcion}
                        onClick={() => handleAgregarALista(opcion)}
                        className={ "popup-button " + (listaActual === opcion ? "popup-button-actual" : "") }
                     >
                        {opcion}
                     </button>
                  ))}
                  {listaActual && (
                     <HiOutlineTrash onClick={handleQuitarDeLista} className="popup-delete-button" />
               )}
               </div>

               {listasPersonalizadas.length > 0 && (
                  <>
                  <h2 className="popup-subtitle">Mis listas:</h2>
                  <div className="popup-options">
                     {listasPersonalizadas.map((lista) => (
                        <button
                           key={lista.id}
                           onClick={() =>
                              handleAgregarAListaPersonalizada(lista.nombre)
                           }
                           className="popup-button popup-button-personalizada"
                        >
                           {lista.nombre}
                        </button>
                     ))}
                  </div>
                  </>
                  
               )}
               <div
                  onClick={() =>
                     localStorage.getItem("id")
                        ? navigate("/crearLista", {
                             state: { contenido: idContenido },
                          })
                        : goToLogin()
                  }
                  className="popup-crear-button"
               >  
                  <span className="popup-crear-plus"> + </span>
                  <h2 className="popup-crear-title"> Crear nueva lista</h2>
               </div>
               
            </div>
         </div>
      </div>
   );
};

export default AgregarAListas;
