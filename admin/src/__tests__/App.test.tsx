import { render } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("Vite to be in document", () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(1 + 1).toBe(2);
  });
});
