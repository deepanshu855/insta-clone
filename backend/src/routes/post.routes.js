const express=require("express");
const postController=require("../controllers/post.controller")

const postRouter=express.Router();

// POST Api => /api/post/
// This is the protected route
postRouter.post("/", postController.createPostController);

module.exports=postRouter;