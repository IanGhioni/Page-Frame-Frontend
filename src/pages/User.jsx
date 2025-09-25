import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

   const [listasPersonalizadas, setListasPersonalizadas] = useState([]);
   const userId = localStorage.getItem("id");
   
   useEffect(() => {
      async function fetchListas() {
         try {
            const response = await API.getListasPersonalizadas(userId);
            console.log(response.data);
            setListasPersonalizadas(response.data);
         } catch (error) {
            console.error(error);
         }
      }
      if (userId) fetchListas();
   }, [userId]);

   const fotoPerfil = getFotoPerfil(localStorage.getItem("fotoPerfil"));

   return (
      <div>
         <Navbar />
         <img
            className="profile-pic"
            src={fotoPerfil}
            alt="Profile"
         />
         <h2>holis {localStorage.getItem("username")}</h2>
         <button
            onClick={logout}
            style={{ backgroundColor: "skyblue", color: "black" }}
         >
            Logout
         </button>
         <button onClick={() => irALista("VISTO")}>VISTO</button>
         <button onClick={() => irALista("QUIERO VER")}>QUIERO VER</button>
         <button onClick={() => irALista("LEIDO")}>LEIDO</button>
         <button onClick={() => irALista("QUIERO LEER")}>QUIERO LEER</button>

         {listasPersonalizadas.length > 0 && listasPersonalizadas.map((lista, index) => (
            <button key={index} onClick={() => irALista(lista.nombre)}>
               {lista.nombre}
            </button>
         ))}
      </div>
   );
};

export default User;
