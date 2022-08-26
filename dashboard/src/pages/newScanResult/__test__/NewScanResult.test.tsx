import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { rest } from "msw";
import "@testing-library/jest-dom";
import { setupServer } from "msw/lib/node";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
//components
import NewScanResult from "../NewScanResult";

const server = setupServer(
  rest.post("/results", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "A result is retrieved",
        data: {
          _id: "63075d9f8a429ffd3565683b",
          status: "Success",
          repositoryName: "404 not found",
          findings: [
            {
              location: {
                positions: {
                  begin: {
                    line: 10,
                  },
                },
                path: "connectors/golang/go",
              },
              metadata: {
                description: "TLS Security",
                severity: "HIGH",
              },
              type: "SAST",
              ruleId: "G402",
              _id: "63075d9f8a429ffd3565683c",
            },
            {
              location: {
                positions: {
                  begin: {
                    line: null,
                  },
                },
                path: "",
              },
              metadata: {
                description: "",
                severity: "",
              },
              type: "",
              ruleId: "",
              _id: "63075d9f8a429ffd3565683d",
            },
          ],
          finishedAt: "2022-08-25T11:31:43.777Z",
          __v: 0,
        },
      })
    );
  })
);

afterEach(cleanup);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("renders without crashing", () => {
  it("render NewScanResult page", () => {
    const root = document.createElement("div");
    createRoot(root).render(<NewScanResult />);
  });

  it("render cancel button correctly", () => {
    render(<NewScanResult />);
    expect(screen.getByTestId("cancelBtn")).toHaveTextContent(/cancel/i);
  });

  it("render add button correctly", () => {
    render(<NewScanResult />);
    expect(screen.getByTestId("addBtn")).toHaveTextContent(/add new scan/i);
  });

  it("render and get the list of result with this id", async () => {
    render(
      <MemoryRouter initialEntries={["/new"]}>
        <NewScanResult />
      </MemoryRouter>
    );

    //click the submit button
    fireEvent.click(screen.getByText(/add new scan/i));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getByText(/add new scan/i));

    // // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/add new scan/i)).not.toBeInTheDocument();

    //click the cancel button
    fireEvent.click(screen.getByText(/cancel/i));
    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
  });
});
