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
import API from "../service/api";
import { useNavigate } from "react-router-dom";
import ReviewGenerator from "../components/ReviewGenerator";

const PaginaDeContenido = () => {
   const params = useParams();
   const [contenido, setContenido] = useState(null);
   const [error, setError] = useState(false);
   const [value, setValue] = useState(0);
   const [shouldSendReview, setShouldSendReview] = useState(false);
   const [onRefresh, setOnRefresh] = useState(false);
   const [userReview, setUserReview] = useState(false);

   const navigate = useNavigate();
   const goToLogin = () => navigate("/login");
   const token = localStorage.getItem("token");

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
      if (token !== null && contenido) {
         const userReviews = contenido.reviews.filter(
            (r) => String(r.usuarioId) === String(localStorage.getItem("id"))
         );
         setUserReview(userReviews ? userReviews.length > 0 : false);
         const lastReview =
            userReviews.length > 0 ? userReviews[userReviews.length - 1] : null;
         setValue(lastReview ? lastReview.valoracion : 0);
      }
   };

   useEffect(() => {
      fetchData();
   }, [onRefresh]);

   useEffect(() => {
      setValoracionUsuario();
   }, [contenido, onRefresh]);

   useEffect(() => {
      if (shouldSendReview) {
         if (token == null) {
            goToLogin();
            setShouldSendReview(false);
            return;
         }
         console.log("Enviar reseña:  ✨✨✨", value);
         API.valorarContenido(params.id, value, localStorage.getItem("id"))
            .then(() => {
               console.log("Reseña enviada con éxito 🐱‍🏍");
            })
            .catch(() => {
               console.error("Error al enviar la reseña ☠");
            });
         setShouldSendReview(false);
      }
   }, [shouldSendReview, value, token]);

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
                           onRefresh={onRefresh}
                           setOnRefresh={setOnRefresh}
                           tieneReview={userReview}
                        />
                        <ReviewGenerator
                           contenidoId={contenido.id}
                           reviews={contenido.reviews}
                           token={token}
                           goToLogin={goToLogin}
                           onRefresh={onRefresh}
                           setOnRefresh={setOnRefresh}
                           esPelicula={contenido.isbn == ""}
                        />
                     </div>
                     <div>
                        <div className="container-header-titulo-icon">
                           <div className="container-header-central">
                              <p className="header-titulo">
                                 {contenido.titulo}
                              </p>
                              <p className="header-autores">
                                 de {contenido.autores}
                              </p>
                              <p className="header-generos">
                                 Géneros: {contenido.categoria}
                              </p>
                              <div className="container-puntaje">
                                 <RatingReadOnly
                                    value={contenido.ratingAverage}
                                 />
                                 <p className="header-puntaje">
                                    {contenido.ratingAverage.toFixed(2)}
                                 </p>
                                 <p className="header-reseñas">
                                    {" "}
                                    de {contenido.ratingCount} reseñas
                                 </p>
                              </div>
                              <p className="header-publicacion">
                                 Publicado en el año {contenido.publicacion}
                              </p>
                              {contenido.isbn === "" ? (
                                 <p className="header-largo">
                                    {" "}
                                    Duracion: {contenido.largo} minutos
                                 </p>
                              ) : (
                                 <p className="header-largo">
                                    {contenido.largo} paginas
                                 </p>
                              )}
                           </div>
                           <img src={icon()} className="icon" />
                        </div>
                        <div className="div-descripcion">
                           <h4 className="titulo-descripcion">Descripcion:</h4>
                           <p>{contenido.descripcion}</p>
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
