import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CargarContenido from './pages/CargarContenido';
import BuscarContenido from './pages/BuscarContenido';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Register from './pages/Register';


import PaginaDeContenido from './pages/PaginaDeContenido';
import User from './pages/User';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/cargarContenido" element={<CargarContenido />} />
        <Route path="/buscarContenido/:titulo/:pagina" element={<BuscarContenido />}/>
        <Route path='/contenido/:id' element={<PaginaDeContenido />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;