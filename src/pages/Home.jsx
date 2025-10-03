import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "../components/navBar/NavBar";
import { Paginator } from "primereact/paginator";
import { useNavigate } from "react-router-dom";
import "../components/paginator.css";
import "./BuscarContenido.css";
import CardContenido from "../components/cardContenido/CardContenido";
import ScrollCard from "../components/scrollCard/ScrollCard";
import API from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
   const [loading, setLoading] = useState(true);
   const [pageDTO, setPageDTO] = useState({
      resultados: [],
      numeroDePagina: 1,
      totalDePaginas: 1,
      totalDeElementos: 0,
   });

   useEffect(() => {
      API.explorarContenidos(0)
         .then((response) => {
            setPageDTO(response.data);
            setLoading(false);
         })
         .catch(() => {
            console.error("Error al cargar los contenidos");
         });
   }, []);

   const [isFetching, setIsFetching] = useState(false);
   const fetchData = () => {
      if (pageDTO.numeroDePagina < pageDTO.totalDePaginas ||
         isFetching
      ) {
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
               console.error("Error al cargar más contenidos");
            });
      }
   };

   return (
      <div className="container">
         <Navbar />
         {loading ? (
            <div className="loading-container">
               <h2>Cargando resultados...</h2>
            </div>
         ) : pageDTO.resultados && pageDTO.resultados.length > 0 ? (
            <>
               <InfiniteScroll
                  dataLength={pageDTO.resultados.length}
                  next={fetchData}
                  hasMore={pageDTO.numeroDePagina < pageDTO.totalDePaginas}
                  loader={<h4>Cargando más contenidos...</h4>}
                  endMessage={
                     <p style={{ textAlign: "center" }}>
                        <b>Scrolleaste todo!!</b>
                     </p>
                  }
               >
                  <div className="scroll-container">
                     {pageDTO.resultados.map((contenido) => (
                        <div key={contenido.id} className="scroll-card">
                           <ScrollCard contenido={contenido} />
                        </div>
                     ))}
                  </div>
               </InfiniteScroll>
            </>
         ) : (
            <div>
               <h2>No hay nada en la base o algo raro paso </h2>
            </div>
         )}
      </div>
   );
};

export default Home;
