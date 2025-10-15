import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollCard from "./ScrollCard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
   ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

describe("ScrollCard", () => {
   const contenidoTest = {
      id: 1,
      titulo: "The Lighting Thief",
      autores: "Rick Riordan",
      imagen:
         "https://images.cdn3.buscalibre.com/fit-in/360x360/1a/14/1a145fc0c3f3ec6ff8e9e4d7220a6ef9.jpg",
      isbn: "9780142406296",
   };

   beforeEach(() => {
      mockNavigate.mockClear();
   });

   test("muestra el titulo y la imagen del contenido", () => {
      render(
         <MemoryRouter>
            <ScrollCard contenido={contenidoTest} />
         </MemoryRouter>
      );
      expect(screen.getByText("The Lighting Thief")).toBeInTheDocument();
      expect(
         screen.getByAltText("The Lighting Thief cover")
      ).toBeInTheDocument();
      expect(screen.getByText("Rick Riordan")).toBeInTheDocument();
   });

   test("navega a pag de contenido al hacer click en la tarjeta", () => {
      render(
         <MemoryRouter>
            <ScrollCard contenido={contenidoTest} />
         </MemoryRouter>
      );
      fireEvent.click(screen.getByAltText("The Lighting Thief cover"));
      expect(mockNavigate).toHaveBeenCalledWith("/contenido/1");
   });

   test("navega a pag de contenido al hacer clikc en el titulo", () => {
      render(
         <MemoryRouter>
            <ScrollCard contenido={contenidoTest} />
         </MemoryRouter>
      );
      fireEvent.click(screen.getByText("The Lighting Thief"));
      expect(mockNavigate).toHaveBeenCalledWith("/contenido/1");
   });

});
