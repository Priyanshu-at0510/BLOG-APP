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

        const updatedpost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
        .populate("likes").exec();
        res.status(200).json({
            success:true,
            post:updatedpost,
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
        success: false,
        error: "Error while liking post"
    }); 
    }
}

//unlike a post
exports.unlikePosts=async (req,res)=>{
    try {
        //fetch the data from req body
        const {post,like}=req.body;
        //find and delete the like collection me se
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});
        //update the post collection
        const updatedpost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});
        res.status(201).json({
            success:true,
            post:updatedpost
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
        success: false,
        error: "Error while unliking post"
    }); 
    }
}


