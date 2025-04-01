const express=require("express");
const router=express.Router(); 

//import controller

const {createComment}=require("../controllers/CommentController");
const {createPost,getAllPosts}=require("../controllers/PostController");
const {likePosts,unlikePosts}=require("../controllers/LikeController");
//mapping create


router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePosts);
router.post("/likes/unlike",unlikePosts);

//export  
module.exports=router; 

