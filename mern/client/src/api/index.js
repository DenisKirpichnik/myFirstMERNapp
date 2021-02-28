import axios from "axios";

const url = "https://yourexp.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

//receive two parameters in updateComments function
export const updateComments = (id, comments) => {
  const data = axios
    .post(`${url}/${id}/comments`, comments, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log("update comments Error!", error);
    });
  return data;
};
