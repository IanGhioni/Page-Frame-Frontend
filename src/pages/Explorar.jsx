import { useParams } from "react-router-dom";
import Navbar from "../components/navBar/NavBar";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import API from "../service/api";
import { useEffect } from "react";

const Explorar = () => {
   const { genero } = useParams();

   return (
      <div>
         <GoBackButton />
         <Navbar />
         <h1>Explorar {genero}</h1>
      </div>
   );
};
export default Explorar;
