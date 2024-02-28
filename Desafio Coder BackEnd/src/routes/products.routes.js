import {Router} from "express";
import { productController } from "../Controler/products.controler.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", productController.getProducts)

router.get("/:pid", productController.getProductByID)

router.post("/",checkRole(["admin"]) ,productController.createProduct)

router.put("/:pid", checkRole(["admin"]), productController.updateProduct)

router.delete("/:pid", checkRole(["admin"]), productController.deleteProduct)

export {router as productRouter};