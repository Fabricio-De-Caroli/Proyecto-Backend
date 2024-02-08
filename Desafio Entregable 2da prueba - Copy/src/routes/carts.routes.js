import {Router} from "express";
import { cartController } from "../Controler/cart.controler.js";

const router = Router();

router.get("/:cid", cartController.getCart)

router.post("/", cartController.createCart)

router.post("/:cid/product/:pid", cartController.addProductInCart)

router.delete("/:cid", cartController.deleteCart)

export {router as cartRouter};