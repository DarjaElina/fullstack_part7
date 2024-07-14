import { createSlice } from '@reduxjs/toolkit';
import {
  setBlogNotificationTo,
  clearBlogNotification,
} from './blogNotificationReducer';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blogToLike = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      return state.map((b) => (b.id === id ? updatedBlog : b));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setBlogNotificationTo({
          message: `blog ${newBlog.title} added successfully`,
          type: 'success',
        })
      );
      setTimeout(() => {
        dispatch(clearBlogNotification());
      }, 5000);
    } catch (error) {
      console.error('Failed to add blog:', error);
      dispatch(
        setBlogNotificationTo({
          message: 'error adding blog',
          type: 'error',
        })
      );
      setTimeout(() => {
        dispatch(clearBlogNotification());
      }, 5000);
    }
  };
};

export const putLike = (blogObj) => {
  return async (dispatch) => {
    const id = blogObj.id;
    await blogService.updateBlog(id, blogObj);
    dispatch(likeBlog(id));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(deleteBlog(id));
      dispatch(
        setBlogNotificationTo({
          message: 'blog removed successfully',
          type: 'success',
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setBlogNotificationTo({
          message: 'error removing blog',
          type: 'error',
        })
      );
    }
  };
};

export default blogSlice.reducer;
