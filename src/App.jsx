import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from './service/axiosInstance';
import CargarContenido from './pages/CargarContenido';

function App() {
  const [pelibro, setPelibro] = useState("");

  const tryConnection = async () => {
    await api.get("/contenido/100").then((response) => setPelibro(response.data));
  };

  useEffect(() => {
    tryConnection();
  }, []);

  console.log(pelibro);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cargarContenido" element={<CargarContenido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;