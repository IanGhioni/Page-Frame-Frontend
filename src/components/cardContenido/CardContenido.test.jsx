import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardContenido from "./CardContenido";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
   ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

describe("CardContenido", () => {
   beforeEach(() => {
      mockNavigate.mockClear();
   });

   const contenidoTest = {
      id: 1,
      titulo: "The Lighting Thief",
      autores: "Rick Riordan",
      publicacion: "2005",
      imagen:
         "https://images.cdn3.buscalibre.com/fit-in/360x360/1a/14/1a145fc0c3f3ec6ff8e9e4d7220a6ef9.jpg",
      ratingAverage: 4.5,
      ratingCount: "1234567",
      isbn: "9780142406296",
   };

   test("muestra el titulo y la imagen del contenido", () => {
      render(
         <MemoryRouter>
            <CardContenido contenido={contenidoTest} />
         </MemoryRouter>
      );
      expect(screen.getByText("The Lighting Thief")).toBeInTheDocument();
      expect(screen.getByAltText("The Lighting Thief")).toBeInTheDocument();
      expect(screen.getByText("de Rick Riordan")).toBeInTheDocument();
      expect(screen.getByText("Publicado en 2005")).toBeInTheDocument();
      expect(screen.getByText("4.50 - 1234567 reseñas")).toBeInTheDocument();
   });

   test("navega a pag de contenido al hacer click en la tarjeta", () => {
      render(
         <MemoryRouter>
            <CardContenido contenido={contenidoTest} />
         </MemoryRouter>
      );
      screen.getByAltText("The Lighting Thief").click();
      expect(mockNavigate).toHaveBeenCalledWith("/contenido/1");
   });

   test("navega a pag de contenido al hacer click en el titulo", () => {
      render(
         <MemoryRouter>
            <CardContenido contenido={contenidoTest} />
         </MemoryRouter>
      );
      screen.getByText("The Lighting Thief").click();
      expect(mockNavigate).toHaveBeenCalledWith("/contenido/1");
   });
});
