import React, { useState } from "react";
import "./Post.css";
import moment from "moment";

// Material UI
import { Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, updatePost, deletePost, likePost } from "../redux/posts";

function Post({
  post,
  _id,
  title,
  creator,
  message,
  selectedFile,
  tags,
  createAt,
  setModal,
  likeCount,
  setModalPost,
  comments,
  ...props
}) {
  const posts = useSelector((state) => state.posts);
  const currentId = useSelector((state) => state.currentId);

  const dispatch = useDispatch();

  // edit and summon form function
  function editAndSummonForm(e) {
    dispatch(setCurrentId(_id));
    setModal(1);
  }

  // open postModal and setCurrentId function

  const postModalAndId = (e) => {
    dispatch(setCurrentId(_id));
    setModalPost(1);
  };

  // find and delete function
  function findAndDelete(e) {
    dispatch(setCurrentId(_id));
    dispatch(deletePost(_id));
  }

  return (
    <div className="post">
      <h4 className="post__creator">{creator}</h4>
      <h5>{title}</h5>
      <p>{message}</p>
      <p>{["#"].concat(tags[0].replace(/,|\s/g, " #").replace(/#\s/g, ""))}</p>
      <img src={selectedFile} className="post__image" />
      <div className="post__buttons">
        <Button
          size="small"
          onClick={() => dispatch(likePost(_id))}
          className="post__underBtn weird"
        >
          <ThumbUpAltIcon fontSize="small" />

          <p className="post__comments"> {likeCount} </p>
        </Button>

        <Button
          size="small"
          onClick={() => editAndSummonForm()} // console.log(_id)
          className="post__underBtn"
        >
          <MoreHorizIcon fontSize="small" />
        </Button>
        <Button size="small" onClick={() => postModalAndId()} className="post__underBtn">
          <ChatBubbleOutlineIcon fontSize="small" />
          <p className="post__comments"> {comments.length} </p>
        </Button>
        <Button size="small" onClick={() => findAndDelete()} className="post__underBtn">
          <DeleteIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}

export default Post;
