import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/axiosInstance";
import "../pages/CargarContenido.css";
import "../pages/form.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoBackButton from "../components/GoBackButton/GoBackButton";

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
   const navigate = useNavigate();

   const prevenirPeliculaConISBN = (name, value) => {
      if (name === "tipo" && value === "pelicula") {
         setFormData((prev) => ({
            ...prev,
            tipo: value,
            isbn: "",
         }));
         return;
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      prevenirPeliculaConISBN(name, value);

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const validarData = () => {
      if (
         !formData.tipo ||
         (formData.tipo === "libro" && !formData.isbn) ||
         !formData.titulo ||
         !formData.autores ||
         !formData.largo ||
         !formData.publicacion ||
         !formData.categoria ||
         !formData.imagen ||
         !formData.descripcion
      ) {
         toast.error("Por favor completa todos los campos obligatorios");
         return false;
      }
      return true;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validarData()) return;
      crearContenido();
   };

   const blanquearFormulario = () => {
      setFormData({
         isbn: "",
         imagen: "",
         titulo: "",
         autores: "",
         largo: "",
         publicacion: "",
         categoria: "",
         descripcion: "",
         tipo: "",
      });
   };

   const crearContenido = async () => {
      try {
         await api
            .post("/contenido", formData)
            .then((response) => navigate(`/contenido/${response.data.id}`));
         toast.success("Se cargó el contenido exitosamente");
         blanquearFormulario();
      } catch (e) {
         console.error(e);
         toast.error("Error al cargar el contenido");
      }
   };

   return (
      <div className="background-pf">
         <GoBackButton />
         <div className="heart-pf"></div>
         <div className="star-pf"></div>
         <div className="form-container">
            <form
               className="form-content"
               onSubmit={handleSubmit}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                  }
               }}
            >
               <div className="form-row">
                  <div className="form-group">
                     <label className="form-label">Tipo de contenido</label>
                     <div className="select-wrapper">
                        <select
                           className="form-input select"
                           name="tipo"
                           value={formData.tipo}
                           onChange={handleChange}
                           placeholder="Tipo de contenido"
                           required
                        >
                           <option className="select-option" value="">
                              Seleccionar
                           </option>
                           <option className="select-option" value="libro">
                              Libro
                           </option>
                           <option className="select-option" value="pelicula">
                              Película
                           </option>
                        </select>
                        <span className="select-arrow">▼</span>
                     </div>
                  </div>

                  <div className="form-group">
                     <label className="form-label">ISBN</label>
                     <input
                        className="form-input"
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
                     <label className="form-label">Título</label>
                     <input
                        className="form-input"
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                     />
                  </div>

                  <div className="form-group">
                     <label className="form-label">Autor/a o Director/a</label>
                     <input
                        className="form-input"
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
                     <label className="form-label">Largo</label>
                     <input
                        className="form-input"
                        type="number"
                        name="largo"
                        value={formData.largo}
                        onChange={handleChange}
                        placeholder="Cantidad de páginas o minutos"
                        required
                     />
                  </div>

                  <div className="form-group">
                     <label className="form-label">Año publicación</label>
                     <input
                        className="form-input"
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

               <div className="form-group-long">
                  <label className="form-label">
                     Géneros (separados por comas)
                  </label>
                  <input
                     className="form-input-long"
                     type="text"
                     name="categoria"
                     value={formData.categoria}
                     onChange={handleChange}
                     placeholder="Géneros"
                     required
                  />
               </div>

               <div className="form-group-long">
                  <label className="form-label">Link a portada</label>
                  <input
                     className="form-input-long"
                     type="url"
                     name="imagen"
                     value={formData.imagen}
                     onChange={handleChange}
                     placeholder="URL de la imagen"
                     required
                  />
               </div>

               <div className="form-group-long">
                  <label className="form-label">Descripción</label>
                  <textarea
                     className="form-input-text"
                     name="descripcion"
                     value={formData.descripcion}
                     onChange={handleChange}
                     placeholder="Descripción"
                     rows="4"
                     required
                  ></textarea>
               </div>

               <button type="submit" className="submit-btn">
                  Publicar contenido
               </button>
            </form>
         </div>
         <ToastContainer position="top-right" autoClose={3000} />
      </div>
   );
};

export default CargarContenido;
