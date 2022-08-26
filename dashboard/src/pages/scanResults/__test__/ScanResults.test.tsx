import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
//components
import ScanResults from "../ScanResults";

const server = setupServer(
  rest.get("/results", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "All results are retrieved",
        data: [
          {
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
          {
            _id: "63075e2c8a429ffd3565684d",
            status: "Success",
            repositoryName: "https://github.com/myat-hsu-mon/ecommerce",
            findings: [
              {
                location: {
                  positions: {
                    begin: {
                      line: 10,
                    },
                  },
                  path: "connectors/java",
                },
                metadata: {
                  description: "TLS security",
                  severity: "MIDDle",
                },
                type: "SAST",
                ruleId: "G402",
                _id: "63075e2c8a429ffd3565684e",
              },
              {
                location: {
                  positions: {
                    begin: {
                      line: 20,
                    },
                  },
                  path: "connectores/gor",
                },
                metadata: {
                  description: "Scan",
                  severity: "HIGH",
                },
                type: "DAST",
                ruleId: "G402",
                _id: "63075e2c8a429ffd3565684f",
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
                _id: "63075e2c8a429ffd35656850",
              },
            ],
            finishedAt: "2022-08-25T11:34:04.290Z",
            __v: 0,
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ScanResults page should render", () => {
  it("render and get the list of the scanning results", async () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <ScanResults />
      </MemoryRouter>
    );
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getByTestId("table"));
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  it("handles 500 internal server error", async () => {
    server.use(
      rest.get("/results", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Error" }));
      })
    );
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <ScanResults />
      </MemoryRouter>
    );
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getByTestId("message"));
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.getByTestId("message")).toBeInTheDocument();
  });
});
