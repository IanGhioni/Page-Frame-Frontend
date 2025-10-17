import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navBar/NavBar";
import { Paginator } from "primereact/paginator";
import { useNavigate } from "react-router-dom";
import "../components/paginator.css";
import "./BuscarContenido.css";
import CardContenido from "../components/cardContenido/CardContenido";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import API from "../service/api";

const Explorar = () => {
   const params = useParams();
   const [dataPagina, setDataPagina] = useState({});
   const [loading, setLoading] = useState(false);
   const [first, setFirst] = useState(0);
   const rows = 12;
   const navigate = useNavigate();
   const genero = `, ${params.genero}`;


   const onPageChange = async (event) => {
      setLoading(true);
      const newPage = event.page;
      navigate(
         `/explorar/${params.genero}/${newPage}`
      );
      setLoading(false);
   };

   useEffect(() => {
      setLoading(true);
      API.explorarGenero(genero, params.pagina, rows)
         .then((response) => {
            setDataPagina(response.data);
            setFirst(response.data.numeroDePagina * rows);
         })
         .catch((err) => {
            console.error("Error al explorar por genero:", err);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);


   return (
      <div className="container">
         <GoBackButton />
         <Navbar />
         {loading ? (
            <div className="loading-container">
               <h2>Cargando resultados...</h2>
            </div>
         ) : dataPagina.resultados && dataPagina.resultados.length > 0 ? (
            <>
               <div>
                  <div className="container-titulo">
                     <h2 className="buscador-titulo">
                        Contenido de <span className="resaltado">{params.genero}</span>
                     </h2>
                  </div>
                  
                  {dataPagina.resultados.map((contenido) => (
                     <div key={contenido.id}>
                        <CardContenido contenido={contenido} />
                     </div>
                  ))}

                  <div className="paginado-container">
                     <h3>
                        Cantidad total de paginas: {dataPagina.totalDePaginas}
                     </h3>
                     {dataPagina.totalDePaginas == 1 ? (
                        <></>
                     ) : (
                        <Paginator
                           first={first}
                           rows={rows}
                           totalRecords={dataPagina.totalDeElementos || 0}
                           onPageChange={onPageChange}
                        />
                     )}
                  </div>
               </div>
            </>
         ) : (
            <div>
               <h2>No hay titulos de este genero</h2>
            </div>
         )}
      </div>
   );
};

export default Explorar;
