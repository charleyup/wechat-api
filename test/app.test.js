import app from "../src/app.js";
import request from "supertest";

describe("#test koa app", () => {
    let server = app.listen(9900);

    after( done => {
        server.close(done);
    });

    it("test GET /", async () => {
        const res = await request(server).get("/api").expect("Hello World!");
    });

    it("test GET 404", async () => {
        const res = await request(server).get("/ajkdjajdla").expect(404);
    });

});
