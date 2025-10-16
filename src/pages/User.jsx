import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import "./user.css";
import Navbar from "../components/navBar/NavBar";
import { getFotoPerfil } from "../FotoPerfilMapper";
import API from "../service/api";

const User = () => {
   const navigate = useNavigate();

   const logout = () => {
      localStorage.clear();
      navigate("/");
   };

   const irALista = (nombreLista) => {
      navigate(`/user/lista/${nombreLista}`);
   };

   const irAListaPersonalizada = (nombreLista) => {
      navigate(`/user/listaPersonalizada/${nombreLista}`);
   };

   const [listasPersonalizadas, setListasPersonalizadas] = useState([]);
   const userId = localStorage.getItem("id");

   useEffect(() => {
      async function fetchListas() {
         try {
            const response = await API.getListasPersonalizadas(userId);
            setListasPersonalizadas(response.data);
         } catch (error) {
            console.error(error);
         }
      }
      if (userId) fetchListas();
   }, [userId]);

   const fotoPerfil = getFotoPerfil(localStorage.getItem("fotoPerfil"));


   const [showPopup, setShowPopup] = useState(false);

   const togglePopup = () => {
      setShowPopup(!showPopup);
   };

   return (
      <div>
         <Navbar />
         <div className="profile-container">
            <img className="profile-pic" src={fotoPerfil} alt="Profile" />
            <div className="username-background" alt="username background">
               <h2 className="username-text">
                  {localStorage.getItem("username")}
               </h2>
            </div>
            <div className="list-background">
               <div className="list-capa0">
                  <img
                     src="/src/assets/capa0-top.png"
                     className="capa0-top"
                     alt="Fondo superior"
                  />
                  <img
                     src="/src/assets/capa0-bottom.png"
                     className="capa0-bottom"
                     alt="Fondo inferior"
                  />
               </div>

               <div className="list-container">
                  <button
                     className="list-button"
                     onClick={() => irALista("VISTO")}
                  >
                     VISTO
                  </button>
                  <button
                     className="list-button"
                     onClick={() => irALista("QUIERO VER")}
                  >
                     QUIERO VER
                  </button>
                  <button
                     className="list-button"
                     onClick={() => irALista("LEIDO")}
                  >
                     LEIDO
                  </button>
                  <button
                     className="list-button"
                     onClick={() => irALista("QUIERO LEER")}
                  >
                     QUIERO LEER
                  </button>
                  {listasPersonalizadas.length > 0 &&
                     listasPersonalizadas.map((lista, index) => (
                        <button
                           key={index}
                           className="list-button"
                           onClick={() => irAListaPersonalizada(lista.nombre)}
                        >
                           {lista.nombre}
                        </button>
                     ))}
                  <button
                     onClick={() => navigate("/crearLista")}
                     className="list-button create-list"
                  >
                     + Crear lista
                  </button>
               </div>
            </div>
         </div>
         <div className="settings">
            <IoIosSettings onClick={togglePopup} className="settings-icon"/>
         </div>
         <div className="overflow"></div>
         {showPopup && (
               <div className="overlay" onClick={togglePopup}>
                  <div className="delete-popup">
                     <h2 className="delete-popup-message">¿Estas seguro que quieres cerrar sesión?</h2>
                     <div className="delete-popup-buttons">
                        <button className="delete-cancel-button" onClick={togglePopup}>Cancelar</button>
                        <button className="delete-confirm-button logout"  onClick={logout}>Cerrar Sesion</button>
                     </div>
                  </div>
               </div>
            )}
      </div>
   );
};

export default User;
