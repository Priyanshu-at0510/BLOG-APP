//import models
const Like=require("../models/likeModel");
const Post=require("../models/postModel");

//like a post
exports.likePosts=async (req,res)=>{
    try {
        //fetch data from req body
        const {post,user}=req.body;
        //make a object
        const like=new Like({
           post,
           user
        })
        const savedLike=await like.save();

        const updatedpost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true});
        res.status(200).json({
            success:true,
            post:updatedpost,
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
        success: false,
        error: "Error while creating comment"
    }); 
    }
}


