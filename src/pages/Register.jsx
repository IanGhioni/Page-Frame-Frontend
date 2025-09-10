import API from "../service/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const [getRegisterData, setRegisterData] = useState(null);
   const [error, setError] = useState("");

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
      setRegisterData({ username, email, password });
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token != null) {
         navigate("/");
      }
      const registerUser = (username, email, password) => {
         API.registerUser({
            username: username,
            email: email,
            password: password,
         })
            .then((response) => {
               localStorage.setItem("token", response.data.token);
               localStorage.setItem("username", username);
               setError("");
               toast("Register completed");
               setTimeout(() => {
                  goToPage("/");
               }, 3000);
            })
            .catch((err) => {
               setError(err.response.data.title);
               toast.error("Username ya en uso!", {
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
         registerUser(username, email, password);
      }

      setRegisterData();
   }, [getRegisterData]);

   const [isLong, setIsLong] = useState(false);
   const [hasNumbers, setHasNumbers] = useState(false);
   const [hasSymbols, setHasSymbols] = useState(false);
   const [hasUpperCase, setHasUppercase] = useState(false);
   const [hasLowerCase, setHasLowwercase] = useState(false);

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
      setIsLong(password.length >= 8);
      setHasNumbers(/[0-9]/.test(password));
      setHasSymbols(/[^A-Za-z0-9]/.test(password));
      setHasUppercase(/[A-Z]/.test(password));
      setHasLowwercase(/[a-z]/.test(password));
   }, [password]);

   function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }

   return (
      <div className="form-container">
         <h1 className="form-title">Register</h1>
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
               />
               <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="password-icon"
               >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
               </span>
            </div>
            <div>
               <ul className="password-requirements">
                  <li className={isLong ? "valid" : "invalid"}>
                     {isLong ? "✔" : "✘"} Al menos 8 caracteres
                  </li>
                  <li className={hasNumbers ? "valid" : "invalid"}>
                     {hasNumbers ? "✔" : "✘"} Al menos un número
                  </li>
                  <li className={hasSymbols ? "valid" : "invalid"}>
                     {hasSymbols ? "✔" : "✘"} Al menos un símbolo
                  </li>
                  <li className={hasUpperCase ? "valid" : "invalid"}>
                     {hasUpperCase ? "✔" : "✘"} Al menos una letra mayúscula
                  </li>
                  <li className={hasLowerCase ? "valid" : "invalid"}>
                     {hasLowerCase ? "✔" : "✘"} Al menos una letra minúscula
                  </li>
               </ul>
            </div>
         </div>
         <span className="err">{error}</span>
         <button className="submit-btn" type="button" onClick={handleRegister}>
            Create account
         </button>
         <h3 className="redirect-text" onClick={() => navigate("/register")}>
            Ya tienes una cuenta?
            <span className="register-link"> Inicia sesión!</span>
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
   );
};

export default Register;
