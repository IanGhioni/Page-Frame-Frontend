import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar";
import { useParams } from "react-router-dom";
import { buscarPorId } from "../service/contenido";
import { Image } from "primereact/image";
import "./PaginaDeContenido.css";
import RatingReadOnly from "../components/rating/RatingReadOnly";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import AgregarAListas from "../components/AgregarAListas";
import API from "../service/api";
import { useNavigate } from "react-router-dom";
import RatingGenerator from "../components/rating/RatingGenerator";
import img404 from "../assets/image-404.png";
import { HiOutlineTrash } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { TbBooks, TbEditCircle } from "react-icons/tb";
import { getFotoPerfil } from "../FotoPerfilMapper";
import { ToastContainer, toast, Bounce } from "react-toastify";

const PaginaDeContenido = () => {
   const params = useParams();
   const [contenido, setContenido] = useState(null);
   const [error, setError] = useState(false);
   const [value, setValue] = useState(0);
   const [shouldSendReview, setShouldSendReview] = useState(false);
   const [onRefresh, setOnRefresh] = useState(false);
   const [userReview, setUserReview] = useState(false);
   const [reviewTexto, setReviewTexto] = useState("");

   const navigate = useNavigate();
   const goToLogin = () => navigate("/login");
   const token = localStorage.getItem("token");

   const fetchData = async () => {
      try {
         const c = await buscarPorId(params.id);
         setContenido(c);
      } catch {
         setError(true);
      }
   };

   const setValoracionUsuario = () => {
      if (token !== null && contenido) {
         const userReviews = contenido.reviews.filter(
            (r) => String(r.usuarioId) === String(localStorage.getItem("id"))
         );
         setUserReview(userReviews ? userReviews.length > 0 : false);
         setReviewTexto(userReviews[userReviews.length - 1] || { texto: "" });

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
         API.valorarContenido(params.id, value, localStorage.getItem("id"))
            .then(() => {})
            .catch(() => {
               console.error("Error al enviar la reseña ☠");
            });
         setShouldSendReview(false);
      }
   }, [shouldSendReview, value, token]);

   const [showWriteReview, setShowWriteReview] = useState(false);

   const handleWriteReview = () => {
      if (!token) {
         goToLogin();
         return;
      }
      setShowWriteReview(true);
   };
   const handleRefresh = () => {
      setOnRefresh(!onRefresh);
   };

   const [leidoOVisto, setLeidoOVisto] = useState(false);

   return (
      <div className="container-pagina-contenido">
         <GoBackButton />
         {error ? (
            <div className="error-container">
               <img
                  src="/src/assets/404-contenido.png"
                  alt=" Contenido no encontrado"
                  className="error-image"
               />
            </div>
         ) : contenido ? (
            <div>
               <Navbar />
               <div className="container-contenido">
                  <div className="container-img">
                     <div className="contenido-image-back">
                        <Image
                           src={contenido.imagen}
                           alt="Logo de pelicula"
                           width="200"
                           preview
                           onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = img404;
                           }}
                           onLoad={(e) => {
                              const img = e.target;
                              if (
                                 img.naturalWidth <= 90 ||
                                 img.naturalHeight <= 90
                              ) {
                                 img.src = img404;
                              }
                           }}
                        />
                     </div>

                     <AgregarAListas
                        idContenido={contenido.id}
                        esPelicula={contenido.isbn == ""}
                        onRefresh={handleRefresh}
                        tieneReview={userReview}
                        setLeidoOVisto={setLeidoOVisto}
                     />
                     <RatingGenerator
                        contenidoId={contenido.id}
                        reviews={contenido.reviews}
                        token={token}
                        goToLogin={goToLogin}
                        onRefresh={handleRefresh}
                        esPelicula={contenido.isbn == ""}
                        writeReview={handleWriteReview}
                        hasWrittenReview={reviewTexto.texto}
                        leidoOVisto={leidoOVisto}
                     />
                  </div>
                  <div className="container-contenido-info">
                     <div className="container-info">
                        <div className="container-paper-clip" />
                        <div className="container-info-header">
                           <h1 className="header-titulo">{contenido.titulo}</h1>
                           <h2 className="header-autores">
                              de {contenido.autores}
                           </h2>
                        </div>
                        <div className="container-seccion-icon">
                           <div className="header-seccion-generos-puntaje">
                              <p className="header-generos">
                                 Géneros: {contenido.categoria}
                              </p>
                              <div className="container-puntaje">
                                 <RatingReadOnly
                                    value={contenido.ratingAverage}
                                    className="header-estrellas"
                                 />
                                 <p className="header-puntaje">
                                    {contenido.ratingAverage.toFixed(2)}
                                 </p>
                                 <p className="header-reseñas">
                                    {""}
                                    de {contenido.ratingCount} reseñas
                                 </p>
                              </div>
                              <div className="container-publicacion-largo">
                                 <p className="header-publicacion">
                                    Publicado en el año {contenido.publicacion}
                                 </p>
                                 <p>{" - "}</p>
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
                           </div>
                           <div className="tipo-contenido">
                              {contenido.isbn ? (
                                 <TbBooks className="tipo-contenido-icon" />
                              ) : (
                                 <BiMoviePlay className="tipo-contenido-icon" />
                              )}
                           </div>
                        </div>
                        <div className="container-descripcion">
                           <h2 className="titulo-descripcion">Descripcion:</h2>
                           <p className="descripcion-texto">
                              {contenido.descripcion}
                           </p>
                        </div>
                        {showWriteReview && (
                           <WriteReview
                              onClose={() => setShowWriteReview(false)}
                              contenidoId={contenido.id}
                              onRefresh={handleRefresh}
                           />
                        )}
                        {reviewTexto.texto && (
                           <ReviewDeUsuario
                              review={reviewTexto}
                              onRefresh={handleRefresh}
                           />
                        )}
                     </div>
                     <div className="container-contenido-bottom" />
                  </div>
               </div>
            </div>
         ) : (
            <div>Cargando...</div>
         )}
      </div>
   );
};

const ReviewDeUsuario = ({ review, onRefresh }) => {
   const fotoPerfil = getFotoPerfil(review.userPhoto);
   const [showModal, setShowModal] = useState(false);


   const handleDelete = () => {
      API.eliminarReview(review.contenidoId, localStorage.getItem("id"))
         .then(() => {
            onRefresh();
         })
         .catch((error) => {
            console.error("Error al eliminar reseña", error);
         });
   };
   


   return (
      <div className="user-review-container">
         <p className="user-review-content">{review.texto}</p>
         <div className="user-review-footer">
            <img
               src={fotoPerfil}
               alt="Foto de perfil"
               className="user-review-avatar"
            />
            <h3 className="user-review-author">{review.username}</h3>

            <h3 className="user-review-date">
               {review.fecha.split("-").reverse().join("/")}, {review.hora}hs
            </h3>
            <RatingReadOnly
               className="user-review-rating"
               value={review.valoracion}
            />
            <div className="user-review-buttons">
               {/* <TbEditCircle className="user-review-edit" /> */}
               <HiOutlineTrash className="user-review-delete" onClick={() => setShowModal(true)}/>
            </div>
         </div>
         {showModal && (
               <div className="overlay" onClick={() => setShowModal(false)}>
                  <div className="delete-popup">
                     <h2 className="delete-popup-message">¿Seguro que quieres eliminar tu review?</h2>
                     <div className="delete-popup-buttons">
                        <button className="delete-cancel-button" onClick={() => setShowModal(false)}>Cancelar</button>
                        <button className="delete-confirm-button"  onClick={handleDelete}>Eliminar</button>
                     </div>
                  </div>
               </div>
            )}
      </div>
      
   );
};

const WriteReview = ({ onClose, contenidoId, onRefresh }) => {
   const [reviewText, setReviewText] = useState("");

   const handleSubmit = () => {
      if (!reviewText.trim()) {
         toast.error("El texto de la reseña no puede estar vacío");
         return;
      }

      if (reviewText.length >= 255) {
         toast.error("El texto de la reseña es demasiado largo");
         return;
      }

      API.escribirReview(contenidoId, localStorage.getItem("id"), {
         text: reviewText,
      })
         .then(() => {
            console.log("Reseña enviada con éxito 🐱‍🏍");
            onRefresh();
            onClose();
         })
         .catch((error) => {
            console.error("Error al enviar reseña", error);
            toast.error("Hubo un error al enviar tu reseña");
         });
   };

   return (
      <div className="write-review-popup">
         <div className="write-review-content">
            <textarea
               className="form-input-text write-review-textarea"
               value={reviewText}
               onChange={(e) => setReviewText(e.target.value)}
               placeholder="Escribe tu reseña aquí..."
               rows={6}
            ></textarea>
            <div className="write-review-buttons">
               <button className="write-review-cancel" onClick={onClose}>
                  Cancelar
               </button>
               <button className="write-review-submit" onClick={handleSubmit}>
                  Enviar
               </button>
            </div>
         </div>
         <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Bounce}
            />
      </div>
   );
};

export default PaginaDeContenido;
