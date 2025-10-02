import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import API from "../../service/api";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import "./Rating.css";
import "../deletePopup.css";

const RatingGenerator = ({
   contenidoId,
   reviews,
   token,
   goToLogin,
   onRefresh,
   esPelicula,
   writeReview,
   hasWrittenReview,
   leidoOVisto,
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
               onRefresh();
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
                  onRefresh();
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
            onRefresh();
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

   const [showPopup, setShowPopup] = useState(false);
   
   const handleClosePopup = () => setShowPopup(false);

   const handleDelete = () => {
      setValue(0)
      deleteReview();
      setShowPopup(false);

   };

   const handleRatingChange = (_, newValue) => {
      setValue(newValue ?? value);
      setShouldSendReview(true);
      if (hasWrittenReview) {
         window.location.reload();
      } else {
         onRefresh();
      }
   };

   return (
      <>
         <div className="rating-container">
            <div className="rating-background">
               <Rating
                  name="simple-controlled"
                  value={value}
                  precision={0.5}
                  onChange={handleRatingChange}
                  size="large"
                  readOnly={readOnly}
               />
            </div>

            {token && value !== 0 && (
               <div className="rating-actions">
                  <TbEditCircle
                     className={
                        "editRating-icon " +
                        (isEditing ? "editRating-icon-active" : "")
                     }
                     onClick={handleEdit}
                  />
                  <HiOutlineTrash
                     className="deleteRating-icon"
                     onClick={() => {
                        setShowPopup(true);
                     }}
                  />
               </div>
            )}
         </div>
         {isEditing && (
            <h4 className="rating-instruction">Cambios sin guardar...</h4>
         )}
         {!hasWrittenReview && value !== 0 && (
            <h4 className="rating-suggestion" onClick={writeReview}>
               Escribir una review!
            </h4>
         )}
         {leidoOVisto && value == 0 && (
            <h4 className="rating-suggestion">
               Valora este contenido!
            </h4>
         )}
         {showPopup && (
            <div className="overlay" onClick={handleClosePopup}>
            <div className="delete-popup">
               <h2 className="delete-popup-message">¿Estás seguro de que quieres eliminar tu valoracion?</h2>
               {hasWrittenReview && (
                  <h3 className="delete-popup-submessage">Esto tambien eliminara tu reseña.</h3>
               )}
               <div className="delete-popup-buttons">
               <button className="delete-cancel-button" onClick={handleClosePopup}>Cancelar</button>
               <button className="delete-confirm-button" onClick={handleDelete}>Eliminar</button>
               </div>
            </div>
            </div>
         )}
      </>
   );
};

export default RatingGenerator;
