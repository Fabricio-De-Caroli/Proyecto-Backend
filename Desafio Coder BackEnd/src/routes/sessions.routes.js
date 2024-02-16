import { Router } from "express";
import passport from "passport";
import { sessionController } from "../Controler/sessions.controler.js";

const router = Router();

router.post("/register", passport.authenticate("register",{failureRedirect:"/api/sessions/failregister"}),
sessionController.register
)

router.post("/login",passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}),
sessionController.login
)

router.get("/failregister", sessionController.failRegister)

router.get("/faillogin", sessionController.failLogin)

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), sessionController.getGithub)

router.get("/githubcallback",  passport.authenticate("github", {failureRedirect:"/login"}), sessionController.githubCallBack)

router.get("/logout", sessionController.logout)

export {router as sessionRouter};