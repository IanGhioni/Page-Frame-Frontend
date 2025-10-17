import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import "./form.css";
import api from "../service/axiosInstance";

const CrearLista = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      contenidos: [],
      nombre: "",
      descripcion: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validarData()) return;
      if (checkNombre()) {
         toast.error("Ya existe una lista con ese nombre");
         return;
      }
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
      if (!formData.nombre || !formData.descripcion) {
         toast.error("Por favor completa todos los campos obligatorios");
         return false;
      }
      const nombreValido = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ'\s]+$/;
      if (!nombreValido.test(formData.nombre)) {
         toast.error("El nombre de la lista solo puede contener letras o números");
         return false;
      }
      return true;
   };

   const checkNombre = () => {
      const nombresInvalidos = [
         "Visto",
         "Leido",
         "Leído",
         "Quiero Ver",
         "Quiero Leer",
      ];
      return (
         nombresInvalidos.includes(formData.nombre.trim()) ||
         nombresInvalidos.includes(formData.nombre.trim().toLowerCase()) ||
         nombresInvalidos.includes(formData.nombre.trim().toUpperCase())
      );
   };

   const handleCrearLista = async () => {
      const idUsuario = localStorage.getItem("id");
      try {
         await api
            .post(`/usuario/${idUsuario}/crearLista`, formData)
            .then(() => navigate("/user/lista/" + formData.nombre));
         toast.success("Lista creada con éxito");
      } catch (e) {
         handleError(e);
      }
   };

   const handleError = (error) => {
      switch (error.status) {
         case 400:
            toast.error("Ya existe una lista con ese nombre");
            break;
         default:
            toast.error("Error al crear la lista");
      }
   };

   return (
      <div className="background-pf">
         <GoBackButton />
         <div className="heart-pf"></div>
         <div className="star-pf"></div>
         <div className="form-container lista-crear">
            <h1 className="form-title">Crear lista</h1>
            <form
               className="all-inputs"
               onSubmit={handleSubmit}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                  }
               }}
            >
               <div className="form-spacer" />
               <div className="form-group lista-crear-group">
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
               <div className="form-group lista-crear-group">
                  <label className="form-label">Descripción</label>
                  <textarea
                     className="form-input-text"
                     name="descripcion"
                     value={formData.descripcion}
                     onChange={handleChange}
                     placeholder="Descripción de la lista..."
                     rows={4}
                     maxLength={255}
                  ></textarea>
                  <span className="character-count">
                     {formData.descripcion.length}/255
                  </span>
               </div>
               <div className="form-spacer" />
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
