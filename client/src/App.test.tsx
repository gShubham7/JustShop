import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("Vite to be in document", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/dashboard/i)).toHaveLength(3);
  });
});
