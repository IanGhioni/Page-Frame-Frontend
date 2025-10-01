import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navBar/NavBar";
import { Paginator } from "primereact/paginator";
import { useNavigate } from "react-router-dom";
import "../components/paginator.css"
import "./BuscarContenido.css"
import CardContenido from "../components/cardContenido/CardContenido";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import api from "../service/api";


const BuscarContenidoPorAutor = () => {
    const params = useParams();
    const [dataPagina, setDataPagina] = useState({});
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows] = useState(12);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true); 
            const res = (await api.buscarContenidoPorAutor(params.nombre, params.pagina, rows)).data;
            setDataPagina(res);
            setFirst(res.numeroDePagina * rows); 
        } catch (err) {
            console.error("Error al buscar:", err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.titulo, params.pagina]);

    const onPageChange = (event) => {
        const newPage = event.page;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true)
        navigate(`/buscarPorAutor/${params.nombre}/${newPage}`);
    };
    
    return (
        <div className="container">
            <GoBackButton />
            <Navbar />
            {loading ? (
            <div className="loading-container">
                <h2>Cargando resultados...</h2>
            </div>
            ) :
            dataPagina.resultados && dataPagina.resultados.length > 0 ? (
            <>
                <div>
                    <div className="container-titulo">
                        <h2 className="buscador-titulo">Resultados de buscar "{params.nombre}"</h2>
                        <button onClick={() => { navigate("/cargarContenido"); setLoading(true)}}>Cargar contenido</button>
                    </div>
                {dataPagina.resultados.map((contenido) => (
                <div key={contenido.id}>
                    <CardContenido contenido={contenido} />
                </div>
                ))}

                <div className="paginado-container">
                    <h3>Cantidad total de paginas: {dataPagina.totalDePaginas}</h3>
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
                <h2>No se encontraron resultados</h2>
                <button onClick={() => navigate("/cargarContenido")}>Cargar contenido</button>
            </div>
            )}
            
        </div>
    );

};

export default BuscarContenidoPorAutor;
