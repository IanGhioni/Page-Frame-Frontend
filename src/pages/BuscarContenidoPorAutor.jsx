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
    const [filtrarLibros, setFiltrarLibros] = useState(null)
    const [filtrarPelis, setFiltrarPelis] = useState(null)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            console.log("params.peli: " + params.peli)
            console.log("params.libro: " + params.libro)
            var res;
            if (params.libro == "true") {
                console.log("ENTRO A BUSCAR POR LIBRO")
                res = await api.buscarPorAutoresLibros(params.nombre, params.pagina, rows);
                setFiltrarLibros("true")
                setFiltrarPelis("false")
            } else if (params.peli == "true") {
                console.log("ENTRO A BUSCAR POR PELI")
                res = await api.buscarPorAutoresPeliculas(params.nombre, params.pagina, rows);
                setFiltrarLibros("false")
                setFiltrarPelis("true")
            } else {
                res = await api.buscarContenidoPorAutor(params.nombre, params.pagina, rows);
                setFiltrarLibros("false")
                setFiltrarPelis("false")
            }
            console.log(res.data)
            setDataPagina(res.data);
            setFirst(res.data.numeroDePagina * rows);
        } catch (err) {
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.nombre, params.pagina, params.libro, params.peli]);

    const onPageChange = (event) => {
        const newPage = event.page;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true)
        navigate(`/buscarPorAutor/${params.nombre}/${newPage}/${filtrarLibros}/${filtrarPelis}`);
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
                <div className="contenido-filtrado-div">
                    <div className="filtrado-div">
                        <h3>Filtrar por</h3>
                        <div>
                        <button className={`boton-filtro ${filtrarLibros === "true" ? "boton-activo" : ""}`}
                                onClick={() => {if (params.libro == "true") navigate(`/buscarPorAutor/${params.nombre}/0/false/false`);
                                                else navigate(`/buscarPorAutor/${params.nombre}/0/true/false`);
                        }}>Libros</button>
                        <button className={`boton-filtro ${filtrarPelis === "true" ? "boton-activo" : ""}`}
                                onClick={() => {if (params.peli == "true") navigate(`/buscarPorAutor/${params.nombre}/0/false/false`)
                                                else navigate(`/buscarPorAutor/${params.nombre}/0/false/true`);}}>Peliculas</button>
                        </div>
                    </div>
                <div>
                {dataPagina.resultados.map((contenido) => (
                <div key={contenido.id}>
                    <CardContenido contenido={contenido} />
                </div>
                ))}
                </div>
                </div>

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
