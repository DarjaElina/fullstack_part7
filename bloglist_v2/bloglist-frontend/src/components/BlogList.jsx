import { useRef, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import UserContext from '../context/UserContext';

const BlogList = () => {
  const [user] = useContext(UserContext);
  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  });

  if (result.isLoading) {
    return <div>loading data</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          isRemovable={blog.user.username === user.username ? true : false}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
