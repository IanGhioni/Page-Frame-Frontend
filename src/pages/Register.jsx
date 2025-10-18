import API from "../service/api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PageAndFrameBanner from "../components/PageAndFrameBanner";
import { FaRegStar, FaStar } from "react-icons/fa";
import rana from "../assets/fotos_perfil/rana.svg";
import gato from "../assets/fotos_perfil/gato.svg";
import panda from "../assets/fotos_perfil/panda.svg";
import mariposa from "../assets/fotos_perfil/mariposa.svg";
import vaquita from "../assets/fotos_perfil/vaquita.svg";
import perro from "../assets/fotos_perfil/perro.svg";
import ballena from "../assets/fotos_perfil/ballena.svg";

import "./loginandregister.css";

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [fotoPerfil, setFotoPerfil] = useState("rana");
   const navigate = useNavigate();
   const [getRegisterData, setRegisterData] = useState(null);
   const [error, setError] = useState("");

   const [htmlContent, setHtmlContent] = useState("");

   useEffect(() => {
      fetch("/PAGEANDFRAME.html")
         .then((response) => response.text())
         .then((data) => setHtmlContent(data))
         .catch((error) =>
            console.error("Error al cargar el archivo HTML:", error)
         );
   }, []);

   const goToPage = (page) => {
      navigate(page);
   };

   const handleRegister = () => {
      if (
         username.trim() === "" ||
         email.trim() === "" ||
         password.trim() === ""
      ) {
         setError("Por favor completa todos los campos");
         return;
      }
      if (!isValidEmail(email)) {
         setError("El email no es valido");
         return;
      }
      if (!isPasswordSecure(password)) {
         setError("La contraseña no es lo suficientemente segura");
         return;
      }
      setError("");
      setRegisterData({ username, email, password, fotoPerfil });
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token != null) {
         navigate("/");
      }
      const registerUser = (username, email, password, fotoPerfil) => {
         API.registerUser({
            username: username,
            email: email,
            password: password,
            fotoPerfil: fotoPerfil,
         })
            .then((response) => {
               localStorage.setItem("token", response.data.token);
               localStorage.setItem("username", username);
               localStorage.setItem("fotoPerfil", fotoPerfil);
               API.getPorUsername(localStorage.getItem("username")).then(
                  (res) => {
                     localStorage.setItem("id", res.data.id);
                  }
               );
               setError("");
               toast("Register completed");
               setTimeout(() => {
                  goToPage("/");
               }, 2000);
            })
            .catch((err) => {
               setError(err.response.data.title);
               toast.error("Username o email ya en uso!", {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
               });
            });
      };
      if (getRegisterData) {
         registerUser(username, email, password, fotoPerfil);
      }

      setRegisterData();
   }, [getRegisterData]);

   const [passwordFocused, setPasswordFocused] = useState(false);
   const [isLong, setIsLong] = useState(false);
   const [hasNumbers, setHasNumbers] = useState(false);
   const [hasSymbols, setHasSymbols] = useState(false);
   const [hasUpperCase, setHasUppercase] = useState(false);
   const [hasLowerCase, setHasLowwercase] = useState(false);

   useEffect(() => {
      setIsLong(password.length >= 8);
      setHasNumbers(/[0-9]/.test(password));
      setHasSymbols(/[^A-Za-z0-9]/.test(password));
      setHasUppercase(/[A-Z]/.test(password));
      setHasLowwercase(/[a-z]/.test(password));
   }, [password]);

   function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }

   function isPasswordSecure(password) {
      return (
         password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password) &&
         /[^A-Za-z0-9]/.test(password)
      );
   }

   useEffect(() => {
      if (
         error === "La contraseña no es lo suficientemente segura" &&
         isPasswordSecure(password)
      ) {
         setError("");
      }
   }, [password, error]);

   return (
      <div className="background-pf">
         <div className="container">
            <div className="heart-pf"></div>
            <div className="star-pf"></div>
            <PageAndFrameBanner />
            <div className="form-container login-register register">
               <h1 className="form-title">Register</h1>
               <div className="all-inputs">
                  <div className="form-group">
                     <label className="form-label">Nombre de usuario</label>
                     <input
                        className="form-input"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresar nombre de usuario"
                        required
                     />
                  </div>
                  <div className="form-group">
                     <label className="form-label">Email</label>
                     <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresar email de usuario"
                        required
                     />
                  </div>
                  <div className="form-group">
                     <label className="form-label">Password</label>
                     <div className="password-container">
                        <input
                           className="form-input password"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Password"
                           required
                           onFocus={() => setPasswordFocused(true)}
                           onBlur={() => setPasswordFocused(false)}
                        />
                        <span
                           onClick={() => setShowPassword((prev) => !prev)}
                           className="password-icon"
                        >
                           {showPassword ? (
                              <IoEyeOff className="icon-eye" />
                           ) : (
                              <IoEye className="icon-eye" />
                           )}
                        </span>
                     </div>
                     {passwordFocused && !isPasswordSecure(password) && (
                        <div className="password-requirements-container">
                           <div className="password-requirements">
                              <p
                                 className={
                                    "pass-req " + (isLong ? "valid" : "invalid")
                                 }
                              >
                                 {isLong ? <FaStar /> : <FaRegStar />} Al menos
                                 8 caracteres
                              </p>
                              <p
                                 className={
                                    "pass-req " +
                                    (hasNumbers ? "valid" : "invalid")
                                 }
                              >
                                 {hasNumbers ? <FaStar /> : <FaRegStar />} Al
                                 menos un número
                              </p>
                              <p
                                 className={
                                    "pass-req " +
                                    (hasSymbols ? "valid" : "invalid")
                                 }
                              >
                                 {hasSymbols ? <FaStar /> : <FaRegStar />} Al
                                 menos un símbolo
                              </p>
                              <p
                                 className={
                                    "pass-req " +
                                    (hasUpperCase ? "valid" : "invalid")
                                 }
                              >
                                 {hasUpperCase ? <FaStar /> : <FaRegStar />} Al
                                 menos una letra mayúscula
                              </p>
                              <p
                                 className={
                                    "pass-req " +
                                    (hasLowerCase ? "valid" : "invalid")
                                 }
                              >
                                 {hasLowerCase ? <FaStar /> : <FaRegStar />} Al
                                 menos una letra minúscula
                              </p>
                           </div>
                        </div>
                     )}
                     <FotoPerfilSelector
                        fotoPerfil={fotoPerfil}
                        setFotoPerfil={setFotoPerfil}
                     />
                  </div>
               </div>
               <span className="err">{error}</span>
               <button
                  className="login-register-btn"
                  type="button"
                  onClick={handleRegister}
               >
                  Crear cuenta
               </button>
               <h3 className="redirect-text" onClick={() => navigate("/login")}>
                  Ya tienes una cuenta?{" "}
                  <span
                     className="redirect-link"
                     onClick={() => navigate("/login")}
                  >
                     Inicia sesión!
                  </span>
               </h3>
               <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Bounce}
               />
            </div>
         </div>
      </div>
   );
};

const perfilOptions = [
   { value: "rana", img: rana },
   { value: "gato", img: gato },
   { value: "panda", img: panda },
   { value: "mariposa", img: mariposa },
   { value: "vaquita", img: vaquita },
   { value: "perro", img: perro },
   { value: "ballena", img: ballena },
];
const FotoPerfilSelector = ({ fotoPerfil, setFotoPerfil }) => {
   const scrollRef = useRef();

   const scroll = (direction) => {
      const container = scrollRef.current;
      const scrollAmount = 220;
      container.scrollBy({
         left: scrollAmount * direction,
         behavior: "smooth",
      });
   };

   return (
      <div className="foto-perfil-selector-container">
         <button className="scroll-button left" onClick={() => scroll(-1)}>
            &#10094;
         </button>
         <div className="foto-perfil-scroll" ref={scrollRef}>
            {perfilOptions.map((option) => (
               <div
                  key={option.value}
                  className={`foto-perfil-option${
                     fotoPerfil === option.value ? " selected" : ""
                  }`}
                  onClick={() => setFotoPerfil(option.value)}
               >
                  <div className="foto-perfil-shadow"></div>
                  <img
                     src={option.img}
                     alt={option.value}
                     className="foto-perfil-img"
                  />
               </div>
            ))}
         </div>
         <button className="scroll-button right" onClick={() => scroll(1)}>
            &#10095;
         </button>
      </div>
   );
};

export default Register;
