
import './Navbar.css';
import { useState } from 'react';
import buscarPorNombre from '../../service/contenido';

const Navbar = () => {
const [nombre, setNombre] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await buscarPorNombre(nombre, 1, 10); // ejemplo: página 0, tamaño 10
            console.log("Resultado de la búsqueda:", data);
        } catch (err) {
            console.error("Error en la búsqueda:", err);
        }
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