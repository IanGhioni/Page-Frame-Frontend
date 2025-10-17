import Navbar from "../components/navBar/NavBar";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import "./ExplorarGeneros.css";
import { useNavigate } from "react-router-dom";

const generosDisponibles = [
   "action",
   "adventure",
   "animation",
   "science fiction",
   "comedy",
   "crime",
   "documentary",
   "drama",
   "family",
   "fantasy",
   "fiction",
   "history",
   "LGBTQIA+",
   "mystery",
   "non fiction",
   "romance",
   "horror",
   "thriller",
];

const ExplorarGeneros = () => {
   const navigate = useNavigate();

   return (
      <div>
         <GoBackButton />
         <Navbar />
         
         <div className="explorar-generos">
            <h2 className="explorar-generos-titulo">
               Explorar distintos géneros!
            </h2>
            <div className="explorar-generos-container">
               <div className="generos-lista">
                  {generosDisponibles.map((genero) => (
                     <button key={genero} className="genero-boton" onClick={() => navigate(`/explorar/${genero}`)}>
                        {genero}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
export default ExplorarGeneros;
