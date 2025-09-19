import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar";
import { useParams } from "react-router-dom";
import { buscarPorId } from "../service/contenido";
import { Image } from "primereact/image";
import "./PaginaDeContenido.css";
import bookIcon from "../assets/book-icon.svg";
import movieIcon from "../assets/movie-icon-small.svg";
import RatingReadOnly from "../components/rating/RatingReadOnly";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import AgregarAListas from "../components/AgregarAListas";
import { Rating } from "@mui/material";
import API from "../service/api";
import { useNavigate } from "react-router-dom";

const PaginaDeContenido = () => {
   const params = useParams();
   const [contenido, setContenido] = useState(null);
   const [error, setError] = useState(false);
   const [value, setValue] = useState(0);
   const navigate = useNavigate();
   const goToLogin = () => navigate("/login");

   const icon = () => {
      if (contenido.isbn == "") {
         return movieIcon;
      } else {
         return bookIcon;
      }
   };

   const fetchData = async () => {
      try {
         const c = await buscarPorId(params.id);
         setContenido(c);
      } catch (error) {
         setError(true);
      }
   };

   const setValoracionUsuario = () => {
   if (localStorage.getItem("token") !== null && contenido) {
      // Filtra todas las reviews del usuario actual
      const userReviews = contenido.reviews.filter(
         (r) => String(r.usuarioId) === String(localStorage.getItem("id"))
      );
      // Toma la última review (puedes cambiar la lógica si necesitas la más alta, etc.)
      const lastReview = userReviews.length > 0 ? userReviews[userReviews.length - 1] : null;
      setValue(lastReview ? lastReview.valoracion : 0);
   }
};

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      setValoracionUsuario();
   }, [contenido]);

   useEffect(() => {
      if (localStorage.getItem("token") !== null) {
         if (value !== 0) {
            console.log("Enviar reseña:  ✨✨✨", value);
            API.valorarContenido(params.id, value, localStorage.getItem("id"))
               .then(() => {
                  console.log("Reseña enviada con éxito 🐱‍🏍");
               })
               .catch(() => {
                  console.error("Error al enviar la reseña ☠");
               });
         }
      } else {
         goToLogin();
      }
   }, [value]);

   return (
      <div className="container">
         <GoBackButton />
         {error ? (
            <div>
               <Navbar />
               <div className="error-container">
                  <h2>Ocurrió un error al cargar este contenido</h2>
                  <p>Por favor, intentá nuevamente más tarde.</p>
               </div>
            </div>
         ) : contenido ? (
            <div>
               <Navbar />
               <div className="container-contenido">
                  <div className="container-header">
                     <div className="container-img">
                        <Image
                           src={contenido.imagen}
                           alt="Logo de pelicula"
                           width="200"
                           preview
                           onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                 "https://www.shutterstock.com/image-vector/404-error-icon-vector-symbol-260nw-1545236357.jpg";
                           }}
                           onLoad={(e) => {
                              const img = e.target;
                              if (
                                 img.naturalWidth <= 90 &&
                                 img.naturalHeight <= 90
                              ) {
                                 img.src =
                                    "https://www.shutterstock.com/image-vector/404-error-icon-vector-symbol-260nw-1545236357.jpg";
                              }
                           }}
                        />
                        <AgregarAListas
                           idContenido={contenido.id}
                           esPelicula={contenido.isbn == ""}
                        />
                        <Rating
                           name="simple-controlled"
                           value={value}
                           precision={0.5}
                           onChange={(event, newValue) => {
                              setValue(newValue);
                           }}
                           size="large"
                        />
                     </div>

                     <div>
                        <div className="container-header-titulo-icon">
                           <div className="container-header-central">
                              <text className="header-titulo">
                                 {contenido.titulo}
                              </text>
                              <text className="header-autores">
                                 de {contenido.autores}
                              </text>
                              <text className="header-generos">
                                 Géneros: {contenido.categoria}
                              </text>
                              <div className="container-puntaje">
                                 <RatingReadOnly
                                    value={contenido.ratingAverage}
                                 />
                                 <text className="header-puntaje">
                                    {contenido.ratingAverage}
                                 </text>
                                 <text className="header-reseñas">
                                    {" "}
                                    de {contenido.ratingCount} reseñas
                                 </text>
                              </div>
                              <text className="header-publicacion">
                                 Publicado en el año {contenido.publicacion}
                              </text>
                              {contenido.isbn === "" ? (
                                 <text className="header-largo">
                                    {" "}
                                    Duracion: {contenido.largo} minutos
                                 </text>
                              ) : (
                                 <text className="header-largo">
                                    {contenido.largo} paginas
                                 </text>
                              )}
                           </div>
                           <img src={icon()} className="icon" />
                        </div>
                        <div className="div-descripcion">
                           <h4 className="titulo-descripcion">Descripcion:</h4>
                           <t>{contenido.descripcion}</t>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <>Cargando</>
         )}
      </div>
   );
};

export default PaginaDeContenido;
