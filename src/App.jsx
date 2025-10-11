import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CargarContenido from './pages/CargarContenido';
import BuscarContenido from './pages/BuscarContenido';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Register from './pages/Register';
import Lista from './pages/Lista';
import CrearLista from './pages/CrearLista';
import ListaPersonalizada from './pages/ListaPersonalizada';
import BuscarContenidoPorAutor from './pages/BuscarContenidoPorAutor';
import PaginaDeContenido from './pages/PaginaDeContenido';
import User from './pages/User';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/cargarContenido" element={<CargarContenido />} />
        <Route path="/buscarContenido/:titulo/:pagina/:libro/:peli" element={<BuscarContenido />}/>
        <Route path="/buscarPorAutor/:nombre/:pagina/:libro/:peli" element={<BuscarContenidoPorAutor />}/>
        <Route path='/contenido/:id' element={<PaginaDeContenido />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/lista/:nombreLista" element={<Lista />} />
        <Route path="/user/listaPersonalizada/:nombreLista" element={<ListaPersonalizada />} />
        <Route path="/crearLista" element={<CrearLista />}/>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;