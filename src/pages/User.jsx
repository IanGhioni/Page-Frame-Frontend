import { useNavigate } from "react-router-dom";
import "./user.css";
import Navbar from "../components/navBar/NavBar";

const User = () => {
   const navigate = useNavigate();

   const logout = () => {
      localStorage.clear();
      navigate("/");
   };

   const irALista = (nombreLista) => {
      navigate(`/user/lista/${nombreLista}`);
   };

   return (
      <div>
         <Navbar />
         <img
            className="profile-pic"
            src="src\assets\panda-pp.png"
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
      </div>
   );
};

export default User;
