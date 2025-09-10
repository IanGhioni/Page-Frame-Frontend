import API from "../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState(
      localStorage.getItem("username") || ""
   );
   const [password, setPassword] = useState(
      localStorage.getItem("password") || ""
   );
   const navigate = useNavigate();
   const failToLogin = () => toast("Login failed");
   const [error, setError] = useState("");

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
            <label className="form-label" >Password</label>
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
            onClick={() => postLogin(username, password)}
         >
            Iniciar sesion
         </button>
         <h3 className="redirect-text" onClick={() => navigate("/register")}>
            No tienes una cuenta? <span className="register-link">Registrate!</span>
         </h3>
         <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </div>
   );
};

export default Login;
