import API from "../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./loginandregister.css";

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState(
      localStorage.getItem("username") || ""
   );
   const [password, setPassword] = useState(
      localStorage.getItem("password") || ""
   );
   const navigate = useNavigate();
   const failToLogin = () =>
      toast.error("Usuario o contraseña invalidos", {
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

   const [error, setError] = useState("");
   const handleLogin = () => {
   if (username.trim() === "" || password.trim() === "") {
      setError("Por favor completa todos los campos");
      return;
   }
   setError("");
   postLogin(username, password);
};

   function postLogin(username, password) {
      API.loginUser({ username: username, password: password })
         .then((response) => {
            localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem("username", username);
            navigate("/");
         })
         .catch((err) => {
            setError(err.response.data.title);
            failToLogin();
         });
   }

   return (
      <div className="form-container">
         <h1 className="form-title">Login</h1>
         <div className="form-group">
            <label className="form-label">Username</label>
            <input
               className="form-input"
               type="username"
               name="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Username"
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
         </div>

         <span className="err">{error}</span>
         <button
            className="submit-btn"
            type="button"
            onClick={handleLogin}
         >
            Iniciar sesion
         </button>
         <h3 className="redirect-text" onClick={() => navigate("/register")}>
            No tienes una cuenta?{" "}
            <span className="redirect-link" onClick={() => navigate("/register")} >Registrate!</span>
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

export default Login;
