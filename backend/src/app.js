const express=require("express");
const cookieParser= require("cookie-parser");
const multer  = require('multer')
const cors=require("cors")


const upload = multer({ storage: multer.memoryStorage() })

const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.routes")
const followRouter=require("./routes/follow.routes")

const app=express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// API's
app.use("/api/auth", authRouter);
app.use("/api/post", upload.single("image") ,postRouter);
app.use("/api/users", followRouter);

module.exports=app;
