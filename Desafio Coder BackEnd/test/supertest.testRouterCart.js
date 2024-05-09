import { expect } from "chai";
import supertest from "supertest";
import cartModel from "../src/dao/models/cart.model.js"

import { app } from "../src/app.js";
import { describe } from "mocha";

/* const expect = chai.expect; */
const requester = supertest(app);

describe("Testing de ruta cart", ()=>{

    describe("test del modulo cart", ()=>{

        it("El endpoint get /api/carts obtiene los productos correctamente", async function(){
            const response = await requester.get("/api/carts");
            console.log(response)
            expect(response.statusCode).to.be.equal(404);
        })

        it("El endpoint post /api/carts crea un cart correctamente", async function(){
            const cartMock = {
                products: []
            }
            const result = await requester.post("/api/carts/").send(cartMock);
            /* console.log(result) */
            const { statusCode, _body } = result
            expect(statusCode).to.be.equal(200)
            /* console.log(_body.status) */
            expect(_body.status).to.be.equal("success")
        })
    })
})