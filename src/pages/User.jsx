import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default User;
