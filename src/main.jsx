import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './components/navBar/NavBar.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <NavBar/>
    <App />
  </StrictMode>,
)
