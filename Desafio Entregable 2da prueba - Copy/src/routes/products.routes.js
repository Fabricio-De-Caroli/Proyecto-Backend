import {Router} from "express";
import { productController } from "../Controler/products.controler.js";

const router = Router();

router.get("/", productController.getProducts)

router.get("/:pid", productController.getProductByID)

router.post("/", productController.createProduct)

router.put("/:pid", productController.updateProduct)

router.delete("/:pid", productController.deleteProduct)

export {router as productRouter};