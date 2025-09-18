import { useNavigate } from "react-router-dom";
import "./user.css";
import Navbar from "../components/navBar/NavBar";
import { useEffect } from "react";
import API from "../service/api";

const User = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

  return (
    <div>
        <Navbar/>
        <img className="profile-pic" src="src\assets\panda-pp.png" alt="Profile" />
        <h2>holis {localStorage.getItem("username")}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default User;
