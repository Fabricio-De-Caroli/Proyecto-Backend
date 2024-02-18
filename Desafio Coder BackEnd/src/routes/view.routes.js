import { Router } from "express";
import { viewController } from "../Controler/view.controler.js";

const router = Router();

const publicAccess = viewController.publicAccess

const privateAccess = viewController.privateAccess

router.get("/realtimeproducts", viewController.realTimeproducts);

router.get("/register", publicAccess,viewController.registerController)

router.get("/login", publicAccess, viewController.loginController)

router.get("/",privateAccess,viewController.profileController)


export {router as viewRouters};