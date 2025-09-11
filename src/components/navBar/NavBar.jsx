import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/mini-logo.png";
import profile from "../../assets/panda-pp.png";

const Navbar = () => {
   const [nombre, setNombre] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (nombre.trim() === "") {
         return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/buscarContenido/" + nombre + "/0");
   };

   

   return (
      <>
         <div className="navbar">
            <img
               className="navbar-logo"
               src={logo}
               alt="Logo"
               onClick={() => navigate("/")}
            />
            <div className="navbar-search">
               <form className="navbar-searchbar" onSubmit={handleSubmit}>
                  <input
                     className="input-busqueda"
                     type="text"
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                     placeholder="Buscar..."
                     required={true}
                  />
                  <button type="submit" className="navbar-search-button">
                     <IoSearch />
                  </button>
               </form>
            </div>
            {localStorage.getItem("token") ? (
               <div className="navbar-user">
                  <h3
                     className="navbar-accion"
                     onClick={() => navigate("/user")}
                  >
                     {localStorage.getItem("username")}
                  </h3>
                  <img
                     className="navbar-pic"
                     onClick={() => navigate("/user")}
                     src={profile}
                     alt="Profile"
                  />
               </div>
            ) : (
               <div className="navbar-user">
                  <h3
                     className="navbar-accion"
                     onClick={() => navigate("/login")}
                  >
                     Login
                  </h3>
                  <h3
                     className="navbar-accion"
                     onClick={() => navigate("/register")}
                  >
                     Register
                  </h3>
               </div>
            )}
         </div>
      </>
   );
};

export default Navbar;
