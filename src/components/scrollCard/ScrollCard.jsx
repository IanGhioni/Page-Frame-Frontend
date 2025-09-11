import { BiMoviePlay } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "./ScrollCard.css";
const ScrollCard = ({ contenido }) => {

   const navigate = useNavigate();
   const handleClick = () => {
      navigate(`/contenido/${contenido.id}`);
   };

const truncatedTitle =
    contenido.titulo.length > 40
        ? contenido.titulo.slice(0, 40) + "..."
        : contenido.titulo;

   return (
      <>
         <div className="scroll-card-back">
            <img
               className="scroll-card-img"
               src={contenido.imagen}
               alt={contenido.titulo + " cover"}
               onClick={handleClick}
            />
            <div className="scroll-card-cutout">
              {contenido.isbn ? (
                <TbBooks className="scroll-card-icon" />
              ) : (
                <BiMoviePlay className="scroll-card-icon" />
              )}
            </div>
         </div>
         <h2 className="scroll-card-title" onClick={handleClick}>
            {truncatedTitle}
         </h2>
         <p className="scroll-card-author">{contenido.autores}</p>
      </>
   );
};

export default ScrollCard;
