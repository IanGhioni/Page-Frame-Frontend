import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from './service/axiosInstance';
import CargarContenido from './pages/CargarContenido';
import BuscarContenido from './pages/BuscarContenido';

import BaseLayout from './BaseLayout';
import PaginaDeContenido from './pages/PaginaDeContenido';

function App() {
  const [pelibro, setPelibro] = useState("");

  useEffect(() => {
  }, []);

  console.log(pelibro);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout/>}></Route>
        <Route path="/cargarContenido" element={<CargarContenido />} />
        <Route path="/buscarContenido/:titulo/:pagina" element={<BuscarContenido />}/>
        <Route path='/contenido/:id' element={<PaginaDeContenido />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;