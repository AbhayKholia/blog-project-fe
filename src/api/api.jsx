import axios from 'axios';


const API_URL = `http://localhost:5000/api`;

export const fetchPosts = async () => {
  return await axios.get(`${API_URL}/posts`);
};

export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/users/login`, { email, password });
};

export const createPost = async (post, token) => {
  return await axios.post(`${API_URL}/posts`, post, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
