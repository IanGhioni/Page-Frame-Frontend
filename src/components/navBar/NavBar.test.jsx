import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./NavBar";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
   ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

describe("Navbar", () => {
   beforeEach(() => {
      mockNavigate.mockClear();
   });

   afterEach(() => {
      localStorage.clear();
   });

   test("hay un logo en el navbar", () => {
      render(
         <MemoryRouter>
            <Navbar />
         </MemoryRouter>
      );
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
   });

   test("hay barrita de bsuqueda", () => {
      render(
         <MemoryRouter>
            <Navbar />
         </MemoryRouter>
      );
      expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
   });

   test("muestra nombre de usuario y foto si hay token", () => {
      localStorage.setItem("token", "123");
      localStorage.setItem("username", "cande");
      localStorage.setItem("fotoPerfil", "panda");
      render(
         <MemoryRouter>
            <Navbar />
         </MemoryRouter>
      );
      expect(screen.getByText("cande")).toBeInTheDocument();
      expect(screen.getByAltText("Profile")).toBeInTheDocument();
      expect(screen.queryByText("Login")).not.toBeInTheDocument();
      expect(screen.queryByText("Register")).not.toBeInTheDocument();
   });

   test("muestra botones Login y Register si NO hay token", () => {
      render(
         <MemoryRouter>
            <Navbar />
         </MemoryRouter>
      );
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
      expect(screen.queryByAltText("Profile")).not.toBeInTheDocument();
   });

    test("navega a home al hacer click en el logo", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        screen.getByAltText("Logo").click();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
    
    test("navega al perfil al hacer click en la foto de perfil", () => {
      localStorage.setItem("token", "123");
      localStorage.setItem("username", "cande");
      localStorage.setItem("fotoPerfil", "panda");
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        screen.getByAltText("Profile").click();
        expect(mockNavigate).toHaveBeenCalledWith("/user");
    });

    test("navega al perfil al hacer click en el username", () => {
      localStorage.setItem("token", "123");
      localStorage.setItem("username", "cande");
      localStorage.setItem("fotoPerfil", "panda");
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        screen.getByText("cande").click();
        expect(mockNavigate).toHaveBeenCalledWith("/user");
    });

    test("navega a login al hacer click en Login", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        screen.getByText("Login").click();
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    test("navega a register al hacer click en Register", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        screen.getByText("Register").click();
        expect(mockNavigate).toHaveBeenCalledWith("/register");
    });

});
