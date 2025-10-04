import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/mini-logo.png";
import { getFotoPerfil } from "../../FotoPerfilMapper";
import { Menu } from 'primereact/menu';

const Navbar = () => {
   const [nombre, setNombre] = useState("");
   const [buscarPorNombre, setBuscarPorNombre] = useState(true);
   const [buscarPorAutor, setBuscarPorAutor] = useState(false);
   const navigate = useNavigate();
   const menuLeft = useRef(null);

   const items = [
      {
            label: 'Filtrar busqueda:',
            items: [
               {
                  label: '• Por nombre de contenido',
                  icon: 'pi pi-refresh',
                  className: buscarPorNombre ? "menuitem-activo" : "",
                  command: () => {setBuscarPorAutor(false), setBuscarPorNombre(true)}
               },
               {
                  label: '• Por nombre del escritor/director',
                  icon: 'pi pi-upload',
                  className: buscarPorAutor ? "menuitem-activo" : "",
                  command: () => {setBuscarPorAutor(true), setBuscarPorNombre(false)}
               }
            ]
      }
   ]

   const fotoPerfil = getFotoPerfil(localStorage.getItem("fotoPerfil"));

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (nombre.trim() === "") {
         return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (buscarPorNombre) {
         navigate("/buscarContenido/" + nombre + "/0");
      }
      else {
         navigate("/buscarPorAutor/" + nombre + "/0");
      }
   };

   useEffect(() => {
      const handleScroll = (event) => {
         menuLeft.current.hide(event)
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [])

   
   return (
      <>
         <div className="navbar" onScroll={(event) => {menuLeft.current.toggle(event)}}>
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
               <Menu model={items} popup ref={menuLeft} id="popup_menu_left" popupAlignment="right"/>
               <button className="button-filtrar"
                     onClick={(event) => menuLeft.current.toggle(event)}
                     aria-controls="popup_menu_left" aria-haspopup
               >
                  Filtrar
               </button>
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
                     src={fotoPerfil}
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
