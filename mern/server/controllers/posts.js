import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//handlers for the routes

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id found");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id found");

  await PostMessage.findByIdAndRemove(id);

  console.log("DELETE");
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id found");

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  ); // update request we need to specify new:true
  res.json(updatedPost);
};

export const updateComments = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
 
  // if (!mongoose.Types.ObjectId.isValid(id))
  const post = await PostMessage.findById(id);
  if(!post){
    res.status(404).send("No post with this id found");
  }else{
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { comments: [...post.comments, comment] },
      { new: true }
    );
    res.json(updatedPost);
  }
  
};
