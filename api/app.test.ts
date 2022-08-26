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
});
