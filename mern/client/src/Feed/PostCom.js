import React, { useState } from "react";
import "./PostCom.css";
import Comment from "./Comment";
// Material UI

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, Typography, TextField } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, updatePost, deletePost, likePost, updateComments } from "../redux/posts";

function PostCom({
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
  const [comment, setComment] = useState({
    createdBy: "",
    comment: "",
  });

  // I AM WORKING

  // edit and summon form function
  function editAndSummonForm(e) {
    dispatch(setCurrentId(_id));
    setModal(0);
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
  // handleSubmit - update comments array
  function handleSubmit(e) {
    e.preventDefault();
    setComment({
      createdBy: "",
      comment: "",
    });
    dispatch(updateComments(currentId, comment));
  }
  // go back and setModalPost(0)
  function goBackAndNullId() {
    setModalPost(0);
    dispatch(setCurrentId(null));
  }
  return (
    <div>
      <div className="post">
        <Button size="small" onClick={() => goBackAndNullId()} className="post__backBtn">
          <ArrowBackIcon fontSize="small" />
        </Button>
        <h4>{creator}</h4>
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
          <Button size="small" onClick={() => goBackAndNullId()} className="post__underBtn">
            <ArrowBackIcon fontSize="small" />
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
      <div className="postCom__commentsSection">
        {/*SUBMIT FORM  */}
        <form onSubmit={handleSubmit}>
          <h4 className="comment__header">Leave a comment</h4>
          <TextField
            required="true"
            className="form__textField"
            name="comment"
            variant="standard"
            label="your name"
            multiline="false"
            fullWidth
            value={comment.createdBy}
            onChange={(e) => setComment({ ...comment, createdBy: e.target.value })}
          />
          <TextField
            required="true"
            className="form__textField"
            name="comment"
            variant="standard"
            label="comment"
            multiline="true"
            fullWidth
            value={comment.comment}
            onChange={(e) => setComment({ ...comment, comment: e.target.value })}
          />
          <Button className="form__buttonSubmit" type="submit">
            Comment
          </Button>
        </form>
        {/* where  I render the comments */}
        <div className="comments__container">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                {...comment}
                createdBy={comment.createdBy}
                comment={comment.comment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostCom;
