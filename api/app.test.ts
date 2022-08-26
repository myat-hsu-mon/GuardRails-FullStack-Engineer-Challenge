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

  it("PUT api/v1/results/63085939434fe7b8cff208be --> return updated result{}", () => {
    return request(app)
      .put("/api/v1/results/63085939434fe7b8cff208be")
      .send({
        repositoryName: "Update Testing for Educational Platform",
      })
      .expect(201)
      .expect("Content-Type", /json/i)
      .then(function (res: {
        body: { data: any; success: string; message: string };
      }) {
        const { data, success, message } = res.body;
        expect(success).toBe(true);
        expect(message).toBe("A result is updated");
        expect(data).not.toEqual(expect.objectContaining({ name: "test" }));
        expect(data).toBeTruthy();
      });
  });

  it("PUT api/v1/results/6 --> return 400 bad request mongoose id cast error", () => {
    return request(app)
      .put("/api/v1/results/6")
      .send({
        repositoryName: "Update Testing for Educational Platform",
      })
      .expect(400)
      .expect("Content-Type", /json/i)
      .then(function (res: {
        body: { error: any; success: string; message: string };
      }) {
        const { error, success } = res.body;
        expect(success).toBe(false);
        expect(error).toBeTruthy();
      });
  });

  it("PUT api/v1/results/630749ac8a429ffd356566c5 --> return 404 not found with this id", () => {
    return request(app)
      .put("/api/v1/results/630749ac8a429ffd356566c5")
      .send({
        repositoryName: "404 not found",
      })
      .expect(404)
      .expect("Content-Type", /json/i)
      .then(function (res: {
        body: { error: any; success: string; message: string };
      }) {
        const { error, success, message } = res.body;
        expect(success).toBe(false);
        expect(message).toEqual("No result found with this id");
        expect(error).toBeTruthy();
      });
  });
});

it("GET api/v1/results/63085939434fe7b8cff208be --> return result{}", () => {
  return request(app)
    .get("/api/v1/results/63085939434fe7b8cff208be")
    .expect(200)
    .expect("Content-Type", /json/i)
    .then(function (res: {
      body: { data: any; success: string; message: string };
    }) {
      const { data, success, message } = res.body;
      expect(success).toBe(true);
      expect(message).toBe("A result is retrieved");
      expect(data).not.toEqual(expect.objectContaining({ greet: "hello" }));
      expect(data).toBeTruthy();
    });
});
