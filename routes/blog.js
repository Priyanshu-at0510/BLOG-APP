const express=require("express");
const router=express.Router(); 

//import controller

const {createComment}=require("../controllers/CommentController");
const {createPost,getAllPosts}=require("../controllers/PostController");
const {likePosts}=require("../controllers/LikeController");
//mapping create


router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePosts);

//export  
module.exports=router; 

