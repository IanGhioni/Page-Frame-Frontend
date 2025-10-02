import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import API from "../../service/api";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import "./Rating.css";

const RatingGenerator = ({
   contenidoId,
   reviews,
   token,
   goToLogin,
   onRefresh,
   setOnRefresh,
   esPelicula,
   writeReview,
}) => {
   const [value, setValue] = useState(0);
   const [shouldSendReview, setShouldSendReview] = useState(false);

   useEffect(() => {
      if (token && reviews) {
         const userReviews = reviews.filter(
            (r) => String(r.usuarioId) === String(localStorage.getItem("id"))
         );
         const lastReview =
            userReviews.length > 0 ? userReviews[userReviews.length - 1] : null;
         setValue(lastReview ? lastReview.valoracion : 0);
         setIsEditing(false);
         setReadOnly(lastReview ? true : false);
      }
   }, [reviews, token]);

   useEffect(() => {
      if (shouldSendReview) {
         if (!token) {
            goToLogin();
            setShouldSendReview(false);
            return;
         }
         API.valorarContenido(contenidoId, value, localStorage.getItem("id"))
            .then(() => {
               setOnRefresh(!onRefresh);
               setReadOnly(true);
            })
            .catch(() => {
               console.error("☠ Error al enviar la reseña ☠");
            });
         setShouldSendReview(false);

         if (!consumido) {
            const nombreLista = esPelicula ? "VISTO" : "LEIDO";
            API.agregarALista(
               localStorage.getItem("id"),
               contenidoId,
               nombreLista
            )
               .then(() => {
                  setOnRefresh(!onRefresh);
               })
               .catch(() => goToLogin());
         }
      }
   }, [shouldSendReview, value, token, contenidoId, goToLogin]);

   const deleteReview = () => {
      if (!token) {
         goToLogin();
         return;
      }
      API.eliminarRating(contenidoId, localStorage.getItem("id"))
         .then(() => {
            setOnRefresh(!onRefresh);
            setReadOnly(false);
         })
         .catch(() => {
            console.error("☠ Error al eliminar la reseña ☠");
         });
   };

   const [consumido, setConsumido] = useState(false);

   useEffect(() => {
      const idUsuario = localStorage.getItem("id");
      if (!idUsuario) return;
      API.getUsuarioPorId(idUsuario)
         .then((response) => {
            const contenido = response.data.contenidos.find(
               (c) => String(c.contenidoId) === String(contenidoId)
            );
            setConsumido(
               contenido
                  ? contenido.estado === "LEIDO" || contenido.estado === "VISTO"
                  : false
            );
         })
         .catch(() => setConsumido(false));
   }, [contenidoId, onRefresh]);


   const [readOnly, setReadOnly] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

   const handleEdit = () => {
      if (!token) {
         goToLogin();
         return;
      }
      setReadOnly(!readOnly);
      setIsEditing(!isEditing);
   };
   
   const [hasWrittenReview, setHasWrittenReview] = useState(false);

   return (
      <>
      <div className="rating-container">
         <div className="rating-background">
            <Rating
            name="simple-controlled"
            value={value}
            precision={0.5}
            onChange={(_, newValue) => {
               setValue(newValue ?? value);
               setShouldSendReview(true);
            }}
            size="large"
            readOnly={readOnly}
         />
         </div>
         
         {token && value !== 0 && (
            <div className="rating-actions">
               <TbEditCircle
                  className={ "editRating-icon " + (isEditing ? "editRating-icon-active" : "")}
                  onClick={handleEdit}
               />
               <HiOutlineTrash 
                  className="deleteRating-icon"
                  onClick={() => {
                     setValue(0);
                     deleteReview();
                  }}/>
            </div>
         )}
   
      </div>
      {isEditing && (
            <h4 className="rating-instruction">
               Cambios sin guardar...
            </h4>
         )}
      {!hasWrittenReview &&  value !== 0 && (
         <h4 className="rating-suggestion" onClick={writeReview}>Escribir una review!</h4>
      ) }
      </>
   );
};

export default RatingGenerator;
