import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navBar/NavBar";
import buscarPorNombre from "../service/contenido"
import { Paginator } from "primereact/paginator";
import { useNavigate } from "react-router-dom";
import "../components/paginator.css"

const BuscarContenido = () => {
    const params = useParams();
    const [dataPagina, setDataPagina] = useState({});
    const [first, setFirst] = useState(0);
    const [rows] = useState(12);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
        const res = await buscarPorNombre(params.titulo, params.pagina, rows);
        setDataPagina(res);
        setFirst(res.numeroDePagina * rows); // alineamos con paginator
        } catch (err) {
        console.error("Error al buscar:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.titulo, params.pagina]);

    const onPageChange = (event) => {
        const newPage = event.page;
        navigate(`/buscarContenido/${params.titulo}/${newPage}`);
    };

    return (
        <div>
        <Navbar />
        <Paginator
            first={first}
            rows={rows}
            totalRecords={dataPagina.totalDeElementos || 0}
            onPageChange={onPageChange}
        />
        </div>
    );
};

export default BuscarContenido;
