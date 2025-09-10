import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "../components/navBar/NavBar";
import { Paginator } from "primereact/paginator";
import { useNavigate } from "react-router-dom";
import "../components/paginator.css";
import "./BuscarContenido.css";
import CardContenido from "../components/cardContenido/CardContenido";
import ScrollCard from "../components/scrollCard/ScrollCard";
import API from "../service/api";

const Home = () => {
   const [loading, setLoading] = useState(true);
   const [pageDTO, setPageDTO] = useState({
      resultados: [],
      numeroDePagina: 1,
      totalDePaginas: 1,
      totalDeElementos: 0,
   });

   const navigate = useNavigate();
   const goToPage = (page) => {
      navigate(page);
   };

   const loader = useRef(null);

   useEffect(() => {
      API.explorarContenidos(1)
         .then((response) => {
            setPageDTO(response.data);
            setLoading(false);
            console.log(response.data);
         })
         .catch(() => {
            console.error("Error al cargar los contenidos");
         });
   }, []);

      const endReached = useCallback(() => {
      if (!loading && pageDTO.numeroDePagina < pageDTO.totalDePaginas) {
         setLoading(true);
         API.explorarContenidos(pageDTO.numeroDePagina + 1)
            .then((response) => {
               setPageDTO((prevPageDTO) => ({
                  ...response.data,
                  resultados: [
                     ...prevPageDTO.resultados,
                     ...response.data.resultados,
                  ],
               }));
            })
            .catch(() => {
               console.error("Error al cargar los contenidos");
            })
            .finally(() => setLoading(false));
      }
   }, [loading, pageDTO]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               endReached();
            }
         },
         { threshold: 0.1 }
      );
      if (loader.current) {
         observer.observe(loader.current);
      }
      return () => {
         if (loader.current) observer.unobserve(loader.current);
      };
   }, [endReached, pageDTO.numeroDePagina, pageDTO.totalDePaginas]);


   return (
      <div>
         <Navbar />
         {loading ? (
            <div className="loading-container">
               <h2>Cargando resultados...</h2>
            </div>
         ) : pageDTO.resultados && pageDTO.resultados.length > 0 ? (
            <>
               <div className="scroll-container">
                  {pageDTO.resultados.map((contenido) => (
                     <div key={contenido.id} className="scroll-card">
                        <ScrollCard contenido={contenido} />
                     </div>
                  ))}
                  <div ref={loader} />
               </div>
            </>
         ) : (
            <div>
               <h2>No hay nada en la base o algo raro paso</h2>
            </div>
         )}
      </div>
   );
};

export default Home;
