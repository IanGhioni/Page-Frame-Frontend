import { Outlet } from "react-router-dom";
import Navbar from "./components/navBar/NavBar";

export default function BaseLayout(){
    return(
        <>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </>
            
    );
}