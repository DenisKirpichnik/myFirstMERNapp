import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Loader from "../Loader";

function Posts({ setModal, setModalPost }) {
  const posts = useSelector((state) => state.posts);

  return (
    <div className="posts">
      {!posts.length ? (
        <h1>...Loading</h1>
      ) : (
        posts.map((post) => (
          <Post
            comments={post.comments}
            key={post.id}
            {...post}
            setModal={setModal}
            likeCount={post.likeCount}
            setModalPost={setModalPost}
          />
        ))
      )}
    </div>
  );
}

export default Posts;
