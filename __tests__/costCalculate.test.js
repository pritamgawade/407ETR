const app = require('../src/app');
const request = require("supertest");

const server = app.listen();

afterAll(() => server.close());

describe("calculate charge", () => {
    test("Should calculate total cost if start and end positions are valid", (done) => {
        request(app)
            .post('/calculate')
            .send({
                start_position: "QEW",
                end_position: "Appleby Line"
            })
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Should return error message if start or end position is empty", (done) => {
        request(app)
            .post('/calculate')
            .send({
                start_position: "",
                end_position: ""
            })
            .then((response) => {
                expect(response.status).toBe(404);
                done();
            });
    });

    test("Should return error message if start or end position is numeric value", (done) => {
        request(app)
            .post('/calculate')
            .send({
                start_position: 2,
                end_position: 3
            })
            .then((response) => {
                expect(response.status).toBe(404);
                done();
            });
    });

    test("Should return error message if start and end positions are equal", (done) => {
        request(app)
            .post('/calculate')
            .send({
                start_position: "QEW",
                end_position: "QEW"
            })
            .then((response) => {
                expect(response.status).toBe(404);
                done();
            });
    });

    test("Should return validation message if start or end position is not found", (done) => {
        request(app)
            .post('/calculate')
            .send({
                start_position: "QEW1&&&",
                end_position: "QEW1"
            })
            .then((response) => {
                expect(response.status).toBe(404);
                done();
            });
    });

})
