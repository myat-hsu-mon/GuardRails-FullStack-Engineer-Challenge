import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
//components
import Home from "../Home";
import Routes from "../../../routes";

describe("renders without crashing", () => {
  it("render Home page", () => {
    const root = document.createElement("div");
    createRoot(root).render(<Home />);
  });

  it("Go to /results page when clicking a button", () => {
    render(<Routes />, { wrapper: BrowserRouter });
    expect(screen.getByText(/security first/i)).toBeInTheDocument();
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/get started/i));
    expect(screen.queryByText(/get started/i)).not.toBeInTheDocument();
  });
});
