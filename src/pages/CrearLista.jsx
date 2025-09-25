import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import "./crearLista.css";
import API from "../service/api";

const CrearLista = () => {
    const [formData, setFormData] = useState({
      nombre: "",
      descripcion: ""
   });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarData()) return;
        handleCrearLista();
    };

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
    };

    const validarData = () => {
      if (
        !formData.nombre ||
        !formData.descripcion
      ) {
        toast.error("Por favor completa todos los campos obligatorios");
        return false;
      }
      return true;
   };

   const handleCrearLista = () => {
    const idUsuario = localStorage.getItem("id");
        API.crearLista(idUsuario, formData.nombre, formData.descripcion)
        .then(() => {
            toast.success("Lista creada con éxito");
            navigate("/user/lista/" + formData.nombre);
        }) 
        .catch((error) => {
            console.error("Error al crear la lista:", error);
            toast.error("Error al crear la lista");
        });
   };

    return (
    <div className="background-pf">
        <GoBackButton />
        <div className="heart-pf"></div>
        <div className="star-pf"></div>
        <div className="form-container">
        <h1 className="form-title">Crear lista</h1>
            <form
                className="form-content"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            >
                <div className="form-group">
                    <label className="form-label">Nombre de la lista</label>
                    <input
                        className="form-input"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la lista..."
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Descripción</label>
                        <textarea
                            className="form-input"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción de la lista..."
                        />
                    </div>
                <button type="submit" className="submit-btn">
                    Crear lista
                </button>
            </form>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
    );
};

export default CrearLista;