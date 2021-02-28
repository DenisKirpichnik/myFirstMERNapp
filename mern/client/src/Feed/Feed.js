import React, { useEffect, useState } from "react";
import "./Feed.css";
//Components
import Form from "./Form";
import Posts from "./Posts";
import Widgets from "./Widgets/Widgets";
import Sidebar from "./Sidebar/Sidebar";
import PostCom from "./PostCom";
//Mat UI
import { Button } from "@material-ui/core";

//Redux
import { getPosts } from "../redux/posts.js";
import { useSelector, useDispatch } from "react-redux";

function Feed() {
  const [modal, setModal] = useState(0);
  const [modalPost, setModalPost] = useState(0);
  const dispatch = useDispatch();

  //useSelector
  const currentId = useSelector((state) => state.currentId);
  const posts = useSelector((state) => state.posts);

  //

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  function handleModal(e) {
    e.preventDefault();
    setModal(1);
  }

  return (
    <div className="feed__container">
      {/* Sidebar  */}

      <div className="sidebar__fixed">
        <Sidebar setModal={setModal} modal={modal} />
      </div>

      {/* Feed  */}
      <div className="feed__middle">
        <div className="form__container">
          {modal == 0 ? (
            <div className="feed__form">
              <h4 className="feed_createPostText">Got something to share ? </h4>
              <Button onClick={handleModal} className="feed_createPostBtn">
                Create a post
              </Button>
            </div>
          ) : (
            <p></p>
          )}
          {modal == 1 ? <Form modal={modal} setModal={setModal} /> : <p></p>}
        </div>
        {/*Posts or Post&Comments  */}
        <div class="feed__posts">
          {modalPost == 0 ? (
            <Posts setModal={setModal} setModalPost={setModalPost} />
          ) : (
            posts
              .filter((post) => post._id === currentId)
              .map((post) => (
                <PostCom
                  setModal={setModalPost}
                  setModalPost={setModalPost}
                  key={post.id}
                  {...post}
                />
              ))
          )}
        </div>
      </div>
      {/*Widgets  */}
      <div className="widgets__fixed">
        <Widgets />
      </div>
    </div>
  );
}

export default Feed;
