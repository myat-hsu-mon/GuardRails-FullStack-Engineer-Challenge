import { fireEvent, render } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "Test page", route);

  return {
    fireEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
