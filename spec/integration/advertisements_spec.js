const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

    beforeEach((done) => {
        this.topic;
        sequelize.sync({ force: true }).then((res) => {

            Advertisement.create({
                title: "Ad for Bloc",
                description: "Become a web developer"
            })
                .then((advertisement) => {
                    this.advertisement = advertisement;
                    done();
                })

                .catch((err) => {
                    console.log(err);
                    done();
                });

        });
    });

    describe("GET /advertisements", () => {

        it("should return a status code 200 and all advertisements", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("advertisements");
                expect(body).toContain("Ad for Bloc");
                done();
            });
        });
    });


    describe("GET /advertisements/new", () => {

        it("should render a new advertisement form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });
    });
})