import { expect, use } from "chai";
import chaiHttp from 'chai-http';
import { app, server } from "./index";
import schema from './schema.json';

const chai = use(chaiHttp);
describe("API", () => {
    describe("GET /survey", () => {
        it("returns first page", (done: Mocha.Done) => {
            chai.request(app).get("/survey").end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property("questions").which.is.an("array");
                expect(res.body).to.have.property("pageId").which.is.a("string");
                done();
            });
        });
    });

    describe("POST /survey", () => {
        //TODO
    });

});

after((done: Mocha.Done) => {

    server.close((err) => { done(); });

});