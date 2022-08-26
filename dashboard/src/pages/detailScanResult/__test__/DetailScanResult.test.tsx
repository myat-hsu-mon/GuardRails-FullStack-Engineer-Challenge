import { rest } from "msw";
import { setupServer } from "msw/node";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
//components
import DetailScanResult from "../DetailScanResult";

const server = setupServer(
  rest.get("/results/63075e2c8a429ffd3565684d", (req, res, ctx) => {
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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("renders without crashing", () => {
  it("render DetailScanPage page", () => {
    const root = document.createElement("div");
    createRoot(root).render(<DetailScanResult />);
  });

  it("render and get the list of result with this id", async () => {
    render(
      <MemoryRouter initialEntries={["/results/63075e2c8a429ffd3565684d"]}>
        <DetailScanResult />
      </MemoryRouter>
    );
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getByText(/home/i));
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
