import API from "../service/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const [getRegisterData, setRegisterData] = useState(null);
   const [error, setError] = useState("");

   const goToPage = (page) => {
      navigate(page);
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token != null) {
         navigate("/user");
      }
      const registerUser = (username, email, password) => {
         API.registerUser({ username: username, email: email, password: password })
            .then((response) => {
               localStorage.setItem("token", response.data.token);
               localStorage.setItem("username", username);
               setError("");
               toast("Register completed");
               setTimeout(() => {
                  goToPage("/user");
               }, 3000);
            })
            .catch((err) => {
               setError(err.response.data.title);
               toast("Register failed");
            });
      };
      if (getRegisterData) {
         registerUser(username, email, password);
      }

      setRegisterData();
   }, [getRegisterData]);

  return (
      <div className="formcontainer">
        <h3>Register</h3>
        <span>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Ingresar nombre de usuario'
            required
          />
        </span>
        <span>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresar email de usuario"
              required
            />
        </span>
      <span>
        <label>Password</label>
        <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresar contraseña"
              required
            />
      </span>
      <span className='err'>
          {error}
      </span>
      <button className='btn' type="button"
        onClick={ () => setRegisterData({username, email, password})}>
        Create account
      </button>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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
  }

export default Register;
