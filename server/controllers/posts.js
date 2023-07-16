import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) =>{
  try {
    let uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(uploadedFile)

    const {userId, description} = req.body;

    const picturePath = uploadedFile.secure_url;

    const user = await User.findOne({_id: userId});

    const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath: picturePath,
        likes:{
            "someid": true
        },
        comments:[]
    })

    await newPost.save();

    //possible error here
    const post = await Post.find({});

    res.status(200).json({
        status: true, 
        data: post,
        message:" Post fetched successfully"
    })

  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

//READ 

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find({});

        res.status(200).json({
            status: true, 
            data: post,
            message:" Post fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getUserPosts = async (req, res) =>{
    try {
        const { userId } = req.params;

        const posts = await Post.find({userId: userId});

        res.status(200).json({
            status: true, 
            data: posts,
            message:" Post fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//UPDATE

export const likePost = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userId);

        if (isLiked){
            post.likes.delete(userId);
        }else{
            post.lieks.set(userId, true);
        }

        const updatedPost = await Post.findOneAndUpdate(
            {_id: id},
            {likes: post.likes},
            {new: true}
            )

        res.status(200).json({
            status: true, 
            data: updatedPost,
            message:" Post fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}