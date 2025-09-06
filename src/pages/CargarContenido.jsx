import { useState } from "react";
import api from '../service/axiosInstance';
import '../pages/CargarContenido.css'
//import { toast, ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const CargarContenido = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    imagen: "",
    titulo: "",
    autores: "",
    largo: "",
    publicacion: "",
    categoria: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const crearContenido = async () => {
    try {
      await api.post("/contenido", formData);
      toast.success("Se cargó el contenido exitosamente");
    } catch (e) {
      toast.error("Error al cargar el contenido");
      console.error(e);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
            }
          }}>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo de contenido</label>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    placeholder="Tipo de contenido"
                    required
                >
                <option value="">Seleccionar</option>
                <option value="libro">Libro</option>
                <option value="pelicula">Película</option>
                </select>
            </div>

            <div className="form-group">
              <label>ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  disabled={formData.tipo === "pelicula"}
                  placeholder={
                    formData.tipo === "pelicula"
                      ? "No aplica para películas"
                      : "ISBN"
                  }
                />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título"
                required
              />
            </div>

            <div className="form-group">
              <label>Autor/a o Director/a</label>
              <input
                type="text"
                name="autores"
                value={formData.autores}
                onChange={handleChange}
                placeholder="Autor/a o Director/a"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Largo</label>
              <input
                type="text"
                name="largo"
                value={formData.largo}
                onChange={handleChange}
                placeholder="Cantidad de páginas o minutos"
                required
              />
            </div>

            <div className="form-group">
              <label>Año publicación</label>
              <input
                type="number"
                name="publicacion"
                value={formData.publicacion}
                onChange={handleChange}
                placeholder="Año. Ej: 2024"
                min="1450"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Géneros (separados por comas)</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              placeholder="Géneros"
              required
            />
          </div>

          <div className="form-group">
            <label>Link a portada</label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="URL de la imagen"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" onClick={crearContenido}>
            Publicar contenido
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CargarContenido;