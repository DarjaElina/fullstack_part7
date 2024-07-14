import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Notification from './Notification';
import {
  initializeBlogs,
  addBlog,
  putLike,
  removeBlog,
} from '../reducers/blogReducer';

const BlogList = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogNotification = useSelector((state) => state.blogNotification);

  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  });

  const blogFormRef = useRef();

  const addNewBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(blogObj));
  };

  const handleLike = (updatedBlog) => {
    dispatch(putLike(updatedBlog));
  };

  const handleDeleteBlog = (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    if (window.confirm(`remove ${blogToRemove.title}?`))
      dispatch(removeBlog(id));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={blogNotification} />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          isRemovable={blog.user.username === user.username ? true : false}
          likeBlog={handleLike}
          removeBlog={handleDeleteBlog}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
