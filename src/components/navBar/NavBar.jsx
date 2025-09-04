
import './Navbar.css';
import { useState } from 'react';
import buscarPorNombre from '../../service/contenido';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/buscarContenido/"+nombre+"/0")
    };

    return (
        <nav className="navbar">
        <div className="navbar-left"></div>

        <div className="navbar-center">
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Buscar..."
            />
            <button type="submit">Buscar</button>
            </form>
        </div>

        <div className="navbar-right"></div>
        </nav>
    );
};

export default Navbar;