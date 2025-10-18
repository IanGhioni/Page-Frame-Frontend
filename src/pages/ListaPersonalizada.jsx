import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../service/api";
import Navbar from "../components/navBar/NavBar";
import CardContenido from "../components/cardContenido/CardContenido";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import "./ListaPersonalizada.css";
import { HiOutlineTrash } from "react-icons/hi";

const ListaPersonalizada = () => {
   const [loading] = useState(false);
   const { nombreLista } = useParams();
   const idUser = localStorage.getItem("id");
   const [contenidos, setContenidos] = useState([]);
   const [showModalContenido, setShowModalContenido] = useState(false);
   const [contenidoAEliminar, setContenidoAEliminar] = useState(null);
   const [descripcion, setDescripcion] = useState("");
   const [showModalLista, setShowModalLista] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      const idUser = localStorage.getItem("id");
      API.getContenidosDeListaPersonalizada(idUser, nombreLista)
         .then((response) => {
            setContenidos(response.data);
         })
         .catch((error) => {
            console.error(`Error al obtener la lista ${nombreLista}:`, error);
         });
      API.getListasPersonalizada(idUser, nombreLista)
         .then((response) => {
            setDescripcion(response.data.descripcion || "");
            console.log("💛" + response.data);
         })
         .catch((error) => {
            console.error(
               `Error al obtener la descripción de la lista ${nombreLista}:`,
               error
            );
         });
   }, [nombreLista, idUser]);

   // Confirmar eliminar lista
   const confirmarEliminarLista = () => {
      setShowModalLista(true);
   };

   const handleEliminarLista = () => {
      API.eliminarListaPersonalizada(idUser, nombreLista)
         .then((response) => {
            navigate("/user");
         })
         .catch((error) => {
            toast.error("Error al eliminar la lista.");
         });
   };

   // Confirmar eliminar contenido
   const confirmarEliminarContenido = (idContenido) => {
      setContenidoAEliminar(idContenido);
      setShowModalContenido(true);
   };

   const handleEliminarContenido = () => {
      if (!contenidoAEliminar) return;
      API.eliminarContenidoDeListaPersonalizada(
         idUser,
         contenidoAEliminar,
         nombreLista
      )
         .then(() => {
            setContenidos((prev) =>
               prev.filter((c) => c.id !== contenidoAEliminar)
            );
            setShowModalContenido(false);
            setContenidoAEliminar(null);
         })
         .catch((error) => {
            toast.error("Error al eliminar el contenido de la lista.");
         });
   };

   return (
      <div className="container">
         <GoBackButton />
         <Navbar />
         {loading ? (
            <div className="loading-container">
               <h2>Cargando resultados...</h2>
            </div>
         ) : contenidos && contenidos.length > 0 ? (
            <>
               <div>
                  <div className="container-titulo">
                     <h2 className="buscador-titulo">
                        Lista de "{nombreLista}"
                     </h2>
                     <button onClick={confirmarEliminarLista}>
                        Eliminar lista
                     </button>
                  </div>
                  <div className="lista-descripcion-container">
                     <p className="lista-descripcion">{descripcion}</p>
                  </div>
                  {contenidos.map((contenido) => (
                     <div key={contenido.id} className="card-list-container">
                        <CardContenido contenido={contenido} />
                        <button
                           onClick={() =>
                              confirmarEliminarContenido(contenido.id)
                           }
                           className="btn-eliminar"
                        >
                           <HiOutlineTrash />
                        </button>
                     </div>
                  ))}
               </div>
               {showModalContenido && (
                  <div
                     className="overlay"
                     onClick={() => setShowModalContenido(false)}
                  >
                     <div className="delete-popup">
                        <h2 className="delete-popup-message">
                           ¿Seguro que quieres eliminar este contenido?
                        </h2>
                        <div className="delete-popup-buttons">
                           <button
                              className="delete-cancel-button"
                              onClick={() => setShowModalContenido(false)}
                           >
                              Cancelar
                           </button>
                           <button
                              className="delete-confirm-button"
                              onClick={handleEliminarContenido}
                           >
                              Eliminar
                           </button>
                        </div>
                     </div>
                  </div>
               )}
               {showModalLista && (
                  <div
                     className="overlay"
                     onClick={() => setShowModalLista(false)}
                  >
                     <div className="delete-popup">
                        <h2 className="delete-popup-message">
                           ¿Seguro que quieres eliminar la lista "{nombreLista}
                           "?
                        </h2>
                        <div className="delete-popup-buttons">
                           <button
                              className="delete-cancel-button"
                              onClick={() => setShowModalLista(false)}
                           >
                              Cancelar
                           </button>
                           <button
                              className="delete-confirm-button"
                              onClick={handleEliminarLista}
                           >
                              Eliminar
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </>
         ) : (
            <div>
               <h2 className="buscador-titulo">Lista de "{nombreLista}"</h2>
               <div className="lista-descripcion-container">
                     <p className="lista-descripcion">{descripcion}</p>
                  </div>
               <h1>Esta lista está vacía :(</h1>
               <button onClick={confirmarEliminarLista}>Eliminar lista</button>
               {showModalLista && (
                  <div
                     className="overlay"
                     onClick={() => setShowModalLista(false)}
                  >
                     <div className="delete-popup">
                        <h2 className="delete-popup-message">
                           ¿Seguro que quieres eliminar la lista "{nombreLista}
                           "?
                        </h2>
                        <div className="delete-popup-buttons">
                           <button
                              className="delete-cancel-button"
                              onClick={() => setShowModalLista(false)}
                           >
                              Cancelar
                           </button>
                           <button
                              className="delete-confirm-button"
                              onClick={handleEliminarLista}
                           >
                              Eliminar
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default ListaPersonalizada;
