import React, { useState, useEffect } from "react";
import "./Form.css";
// Material UI
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FileBase from "react-file-base64";
import { Button } from "@material-ui/core";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, updatePost, createPost } from "../redux/posts";

function Form({ modal, setModal }) {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.currentId);

  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  function handleSubmit(e) {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
    setModal(0);
  }

  function close(e) {
    e.preventDefault();
    setModal(0);
    dispatch(setCurrentId(null));
  }

  const clear = (e) => {
    dispatch(setCurrentId); // test it 1 setCurrentId 2 SETCURRENTID
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <div className="form">
      <Button className="form__buttonClose" onClick={close}>
        <CloseIcon />
      </Button>
      <form onSubmit={handleSubmit}>
        <h4 className="form__header">{currentId ? "Editing" : "Creating"} a post</h4>
        <TextField
          required="true"
          className="form__textField"
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          className="form__textField"
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required="true"
          className="form__textField"
          name=" message"
          variant="outlined"
          label=" message"
          multiline="true"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          className="form__textField"
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div class="form__fileInput">
          <FileBase
            className="form__filebaseButton"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <div className="form__buttonsContainer">
          <Button className="form__buttonSubmit" type="submit">
            Submit
          </Button>
          <Button className="form__buttonClear" onClick={clear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
