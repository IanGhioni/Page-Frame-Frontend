import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from './service/axiosInstance';
import CargarContenido from './pages/CargarContenido';
import BuscarContenido from './pages/BuscarContenido';

import BaseLayout from './BaseLayout';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;