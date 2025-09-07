import "./contenido.css"
import bookIcon from "../../assets/book-icon.svg"
import movieIcon from "../../assets/movie-icon-small.svg"
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import RatingReadOnly from "../rating/RatingReadOnly";

const CardContenido = ({contenido}) => {
    const navigate = useNavigate()
    
    const icon = () => {
        if (contenido.isbn == "") {
            return movieIcon
        } else {
            return bookIcon
        }
    }

    return (
        <div className="contenido-card">
        <div className="contenido-imagen">
            <img
            onClick={() => navigate(`/contenido/${contenido.id}`)}
            src={contenido.imagen}
            />
        </div>
        <div className="contenido-info">
            <h2 className="contenido-titulo" onClick={() => navigate(`/contenido/${contenido.id}`)}>{contenido.titulo}</h2>
            <p className="contenido-autor">de {contenido.autores}</p>
            
            <div className="contenido-rating">
            <RatingReadOnly value={contenido.ratingAverage}/>
            <span className="contenido-rating-text">
                {contenido.ratingAverage} -{" "}
                {contenido.ratingCount} reseñas
            </span>
            
            </div>
            <p className="contenido-publicacion">
            Publicado en {contenido.publicacion}
            </p>
        </div>
        <div className="icon-imagen">
            <img
            src={icon()}>
            </img>
        </div>
        </div>
    );
    };

export default CardContenido