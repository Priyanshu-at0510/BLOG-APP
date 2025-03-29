//import model
const Comment=require("../models/commentModel");
const Post=require("../models/postModel");

//buisness logic
exports.createComment= async (req,res)=>{
  try {
    //fetch data from req body
    const {post,user,body}=req.body;
    //create a comment object
    const comment=new Comment({
        post,user,body
    });
    //save the new comment into the database
    const savedComment=await comment.save();

    //find the post by ID,add the new comment to its comment array
    const updatePost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true}) //new:true will give the updated document
                     .populate("comments") //populate the comment array with comment document
                     .exec();
    
    
    res.status(200).json({
        success:true,
        post:updatePost,
        message:"Comment added sucessfully"
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        error: "Error while creating comment",
    }); 
  }
}


