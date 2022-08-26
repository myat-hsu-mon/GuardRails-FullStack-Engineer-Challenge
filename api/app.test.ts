const request = require("supertest");
const assert = require("assert");
const express = require("express");

const { app } = require("./app");

describe("Results API", () => {
  it("404 Not Found", () => {
    return request(app).get("/").expect(404);
  });

  it("GET api/v1/results --> return results[]", () => {
    return request(app)
      .get("/api/v1/results")
      .expect(200)
      .expect("Content-Type", /json/i)
      .then(function (res: {
        body: { data: any; success: string; message: string };
      }) {
        const { data, success, message } = res.body;
        expect(success).toBe(true);
        expect(message).toBe("All results are retrieved");
        expect(data).not.toEqual(expect.arrayContaining(["hello"]));
        expect(data).toBeTruthy();
      });
  });

  it("POST api/v1/results --> return created result{}", () => {
    return request(app)
      .post("/api/v1/results")
      .send({
        status: "Queued",
        repositoryName: "Testing Result",
        findings: {
          type: "sast",
          ruleId: "G402",
          location: {
            path: "connectors/apigateway.go",
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: "TLS InsecureSkipVerify set true.",
            severity: "HIGH",
          },
        },
        queuedAt: new Date(),
      })
      .expect(201)
      .expect("Content-Type", /json/i)
      .then(function (res: {
        body: { data: any; success: string; message: string };
      }) {
        const { data, success, message } = res.body;
        expect(success).toBe(true);
        expect(message).toBe("A new result is created");
        expect(data).not.toEqual(expect.objectContaining({ name: "test" }));
        expect(data).toBeTruthy();
      });
  });
});
