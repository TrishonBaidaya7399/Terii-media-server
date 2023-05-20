import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
//Create new post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const result = await newPost.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Update a Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    //ensuring security, no other person than the owner of the post can't update this post
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated!");
    } else {
      res.status(403).json("Action forbidden!❌");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a Post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  // const userId = req.body;

  try {
    const post = await PostModel.findById(id);
    // if (post.userId === userId) {
    await post.deleteOne();
    res.status(200).json("Post deleted successfully!");
    // } else {
    // res.status(403).json("Action forbidden!❌");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};
//Like and Dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    //if our current user id is not inluded in the likes array, then perform the following functionality
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked👍");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked👎");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//Get timeline posts
export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;
  //the time line post of a user includes his own posts and the posts of the persons he is following
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt; //sorted in descending order
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
