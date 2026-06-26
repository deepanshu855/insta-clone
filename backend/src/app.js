const express=require("express");
const cookieParser= require("cookie-parser");
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.routes")

const app=express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API's
app.use("/api/auth", authRouter);
app.use("/api/post", upload.single("image") ,postRouter);

module.exports=app;
