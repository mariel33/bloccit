const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes: static", () => {

    describe("GET /", () => {
        it("should return status code 200", () => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
            });
        });
    });

    describe('GET /marco', () => {
        it('should return status code 200 and body should contain polo', () => {
            request.get('http://localhost:3000/marco', (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toBe('Polo');
            });
        });
    });
});

