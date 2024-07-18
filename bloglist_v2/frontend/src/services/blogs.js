import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateBlog = async (updatedObj) => {
  const id = updatedObj.id;
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedObj, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getAllComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const createComment = async (id, commentObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObj, config);
  return response.data;
};

export default { getAll, create, setToken, updateBlog, deleteBlog, getAllComments, createComment };
