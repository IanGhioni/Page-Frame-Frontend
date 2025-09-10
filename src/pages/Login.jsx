
import API from "../service/api";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const navigate = useNavigate();
  const failToLogin = () => toast("Login failed");
  const [error, setError] = useState("");

  function postLogin(name, password) {
    API.loginUser({ username: name, password: password })
      .then((response) => {
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("name", response.data.name);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.title);
        failToLogin();
      });
  }

  return (
      <div className="formcontainer">
        <h3>Login</h3>
          <span>
            <label>Username</label>
            <input
              type="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </span>
          <div></div>
          <span>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </span>
          <span className='err'>
          {error}
          </span>
          <button className="btn" type="button" onClick={() => postLogin(username, password)}>
            Login
          </button>
        <a href="/register">Create new Account</a>
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
  }

export default Login;