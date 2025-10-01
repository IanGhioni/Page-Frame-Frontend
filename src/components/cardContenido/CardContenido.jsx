import "./contenido.css";
import { BiMoviePlay } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import RatingReadOnly from "../rating/RatingReadOnly";
import img404 from "../../assets/image-404.png";

const CardContenido = ({ contenido }) => {
   const navigate = useNavigate();

   return (
      <div className="card-contenido-container">
         <div className="contenido-card">
            <div className="contenido-imagen">
               <img
                  onClick={() => navigate(`/contenido/${contenido.id}`)}
                  src={contenido.imagen}
                  onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = img404;
                  }}
                  onLoad={(e) => {
                     const img = e.target;
                     if (img.naturalWidth <= 90 || img.naturalHeight <= 90) {
                        img.src = img404;
                     }
                  }}
               />
            </div>
            <div className="contenido-info">
               <h2
                  className="contenido-titulo"
                  onClick={() => navigate(`/contenido/${contenido.id}`)}
               >
                  {contenido.titulo}
               </h2>
               <p className="contenido-autor">de {contenido.autores}</p>
               <p className="contenido-publicacion">
                  Publicado en {contenido.publicacion}
               </p>
               <div className="contenido-rating">
                  <RatingReadOnly
                     value={contenido.ratingAverage}
                     sx={{
                        color: "#ff00c8ff", // Cambia el color de las estrellas
                        fontSize: "2rem", // Cambia el tamaño
                     }}
                  />

                  <span className="contenido-rating-text">
                     {contenido.ratingAverage.toFixed(2)} -{" "}
                     {contenido.ratingCount} reseñas
                  </span>
               </div>
            </div>
            
         </div>
         <div className="icon-imagen-list">
               {contenido.isbn ? (
                  <TbBooks className="icon-list" />
               ) : (
                  <BiMoviePlay className="icon-list" />
               )}
            </div>
      </div>
   );
};

export default CardContenido;
