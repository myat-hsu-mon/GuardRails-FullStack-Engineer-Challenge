import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Routes from "..";
//utils
import renderWithRouter from "../../utils/test-utils";

afterEach(cleanup);

describe("Routes should render", () => {
  it("/ route rendering/navigating", () => {
    render(<Routes />, { wrapper: BrowserRouter });
    expect(screen.getByText(/security first/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/get started/i));
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it("/results route rendering/navigating", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/home/i));
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });

  it("/new route rendering/navigating", () => {
    render(
      <MemoryRouter initialEntries={["/new"]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("addBtn"));
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/create new scan result/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/cancel/i));
    expect(screen.getByText(/no scanning results/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/add new scan/i));
    expect(screen.getByText(/create new scan result/i)).toBeInTheDocument();
  });

  it("/404 route rendering/navigating", () => {
    renderWithRouter(<Routes />, { route: "/404" });
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it("/others route rendering/navigating", () => {
    renderWithRouter(<Routes />, { route: "/others" });
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
