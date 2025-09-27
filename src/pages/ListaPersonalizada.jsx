import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import Navbar from "../components/navBar/NavBar";
import CardContenido from "../components/cardContenido/CardContenido";
import GoBackButton from "../components/GoBackButton/GoBackButton";

const ListaPersonalizada = () => {
   const [loading] = useState(false);
   const { nombreLista } = useParams();
   const idUser = localStorage.getItem("id");
   const [contenidos, setContenidos] = useState([]);

   useEffect(() => {
      console.log("Ver lista:", nombreLista);
      const idUser = localStorage.getItem("id");
      API.getContenidosDeListaPersonalizada(idUser, nombreLista)
         .then((response) => {
            console.log(`Lista ${nombreLista}:`, response);
            setContenidos(response.data);
         })
         .catch((error) => {
            console.error(`Error al obtener la lista ${nombreLista}:`, error);
      });
   }, [nombreLista, idUser]);

   return (
      <div className="container">
         <GoBackButton />
         <Navbar />
         {loading ? (
            <div className="loading-container">
               <h2>Cargando resultados...</h2>
            </div>
         ) : contenidos && contenidos.length > 0 ? (
            <>
               <div>
                  <div className="container-titulo">
                     <h2 className="buscador-titulo">
                        Lista de "{nombreLista}"
                     </h2>
                  </div>
                  {contenidos.map((contenido) => (
                     <div key={contenido.id}>
                        <CardContenido contenido={contenido} />
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div>
               <h1>Esta lista está vacía :(</h1>
            </div>
         )}
      </div>
   );
};

export default ListaPersonalizada;
