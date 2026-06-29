const express=require("express");
const authController=require("../controllers/auth.controller")
const identifyUser=require("../middlewares/identifyUser")

const authRouter=express.Router();

// API POST=> /api/auth/register
authRouter.post("/register", authController.registerController);

// API POST=> /api/auth/login
authRouter.post("/login", authController.loginController);

// API GET=> /api/auth/get-me
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports=authRouter