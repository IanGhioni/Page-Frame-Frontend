import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../service/api";
import "./user.css";
import Navbar from "../components/navBar/NavBar";
import { getFotoPerfil } from "../FotoPerfilMapper";

const User = () => {
   const navigate = useNavigate();
   const [listas, setListas] = useState([]);

   const logout = () => {
      localStorage.clear();
      navigate("/");
   };

   const irALista = (nombreLista) => {
      navigate(`/user/lista/${nombreLista}`);
   };

   const fotoPerfil = getFotoPerfil(localStorage.getItem("fotoPerfil"));

   const fetchListas = () => {
      const idUser = localStorage.getItem("id");
      API.verLista(idUser)
         .then((response) => {
            console.log(`Listas del usuario:`, response.data);
            setListas(response.data);
         })
         .catch((error) => {
            console.error(`Error al obtener la lista`, error);
         });
   };

   useEffect(() => {
      fetchListas();
   }, []);

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
         {listas && listas.length > 0 && listas.map((lista, idx) => (
            <button key={idx} onClick={() => irALista(lista.nombre)}>
               {lista.nombre}
            </button>
         ))}

      </div>
   );
};

export default User;
