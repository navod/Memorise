import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// const url = "https://test-app-memo.herokuapp.com/posts";

API.interceptors.request.use(req => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = page => API.get(`/posts?page=${page}`);
export const fetchPost = id => API.get(`/posts/${id}`);
export const fetchPostBySearch = searchText =>
  API.get(
    `/posts/search?searchText=${searchText.search || "none"}&tags=${
      searchText.tags
    }`
  );
export const createPost = newPost => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.patch(`/posts/${id}/commentPost`, { value });

export const signIn = formData => API.post("/user/signIn", formData);
export const signUp = formData => API.post("/user/signUp", formData);
