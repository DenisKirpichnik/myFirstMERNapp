import React from "react";
import "./Comment.css";

function Comment({ createdBy, comment }) {
  return (
    <div className="comment__container">
      <h4>{createdBy}</h4>
      <p> {comment}</p>
    </div>
  );
}

export default Comment;
