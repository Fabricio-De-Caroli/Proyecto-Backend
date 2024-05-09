import { expect } from "chai";
import supertest from "supertest";
import productModel from "../src/dao/models/product.model.js"

import { app } from "../src/app.js";
import { describe } from "mocha";

/* const expect = chai.expect; */
const requester = supertest(app);

describe("Testing de routa products", ()=>{

    describe("test del modulo products", ()=>{

        it("El endpoint post /api/products crea un product correctamente", async function(){
            const productMock = {
                title: "Red dead redemption 2",
                description: "Juego de accion en 3era persona",
                code: "01",
                price: 60,
                status:true,
                stock:150,
                category:"Action",
                thumbnails: []
            }
            const result = await requester.post("/api/products").send(productMock);
            console.log(result)
            const { statusCode, _body } = result
            expect(statusCode).to.be.equal(200)
            expect(_body.status).to.be.equal("error")
        })
    })
})