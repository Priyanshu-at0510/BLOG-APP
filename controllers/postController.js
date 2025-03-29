const Post=require("../models/postModel");

exports.createPost=async (req,res)=>{
    try {
        //fetch the data
        const {title,body}=req.body;
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "Title and Body are required.",
            });
        }
        const post=new Post({
            title,
            body
        });
        const savedPost=await post.save();

        res.status(201).json({
            success:true,
            post:savedPost,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error While Creating Post"
        }); 
    }
}

exports.getAllPosts=async (req,res)=>{
    try {
        const posts=await Post.find().populate("comments").exec();
        res.json({
            posts,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error While Fetching All Posts"
        });
    }
}