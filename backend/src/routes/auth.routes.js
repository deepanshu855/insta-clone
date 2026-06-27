const express=require("express");
const authController=require("../controllers/auth.controller")

const authRouter=express.Router();

// API POST=> /api/auth/register
authRouter.post("/register", authController.registerController);

// API POST=> /api/auth/login
authRouter.post("/login", authController.loginController);

module.exports=authRouter