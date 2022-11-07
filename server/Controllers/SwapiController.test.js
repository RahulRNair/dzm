// import * as mod from ".";
const axios = require("axios");
jest.mock("axios", () => jest.fn());
const request = require("supertest");
const baseURL = "http://localhost:3000/api";

describe("GET /peoples", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/peoples");
        expect(response.statusCode).toBe(200);
    });
    it("should return all peoples", async () => {
        const response = await request(baseURL).get("/peoples");
        expect(response.body.results.length >= 1).toBe(true);
    });
    it("should return single people details", async () => {
        const response = await request(baseURL).get("/peoples/1");
        expect(response.body.url === "https://swapi.dev/api/people/1/").toBe(
            true
        );
        expect(response.body.name.length >= 1).toBe(true);
    });
    it("should return error", async () => {
        const response = await request(baseURL).get("/peoples/10000");
        expect(response.statusCode).toBe(500);
    });
});

describe("GET /planets", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/planets");
        expect(response.statusCode).toBe(200);
    });
    it("should return all planets", async () => {
        const response = await request(baseURL).get("/planets");
        expect(response.body.results.length >= 1).toBe(true);
    });
    it("should return single planet details", async () => {
        const response = await request(baseURL).get("/planets/1");
        expect(response.body.url === "https://swapi.dev/api/planets/1/").toBe(
            true
        );
        expect(response.body.name.length >= 1).toBe(true);
    });
    it("should return error", async () => {
        const response = await request(baseURL).get("/planets/10000");
        expect(response.statusCode).toBe(500);
    });
});

describe("GET /starships", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/starships");
        expect(response.statusCode).toBe(200);
    });
    it("should return all starships", async () => {
        const response = await request(baseURL).get("/starships");
        expect(response.body.results.length >= 1).toBe(true);
    });
    it("should return single starships details", async () => {
        const response = await request(baseURL).get("/starships/2");
        expect(response.body.url === "https://swapi.dev/api/starships/2/").toBe(
            true
        );
        expect(response.body.name.length >= 1).toBe(true);
    });
    it("should return error", async () => {
        const response = await request(baseURL).get("/starships/100000");
        expect(response.statusCode).toBe(500);
    });
});
