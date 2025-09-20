import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import API from "../service/api";

const ReviewGenerator = ({ contenidoId, reviews, token, goToLogin }) => {
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
               console.log("Reseña de " + value + " enviada con éxito 🐱‍🏍");
            })
            .catch(() => {
               console.error("Error al enviar la reseña ☠");
            });
         setShouldSendReview(false);
      }
   }, [shouldSendReview, value, token, contenidoId, goToLogin]);

   const deleteReview = () => {
      if (!token) {
         goToLogin();
         return;
      }
      API.eliminarReview(contenidoId, localStorage.getItem("id"))
         .then(() => {
            console.log("Reseña eliminada 🗑🗑");
         })
         .catch(() => {
            console.error("☠ Error al eliminar la reseña ☠");
         });
   };

   return (
      <>
         <Rating
            name="simple-controlled"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
               setValue(newValue ?? value);
               setShouldSendReview(true);
            }}
            size="large"
         />
         {token && value !== 0 && (
            <button
               onClick={() => {
                  setValue(0);
                  deleteReview();
               }}
               style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
               }}
            >
               eliminar reseña
            </button>
         )}
      </>
   );
};

export default ReviewGenerator;
