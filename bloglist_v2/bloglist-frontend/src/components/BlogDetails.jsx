import { FcLikePlaceholder } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import useNotification from '../hooks/useNotification';

const BlogDetails = ({ blog, isRemovable }) => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const updatedBlogMutation = useMutation({
    mutationFn: (blogObj) => blogService.updateBlog(blogObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  const deletedBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification('Blog removed successfully', 'success');
    },
    onError: (error) => {
      console.error(error);
      setNotification('error removing blog', 'error');
    }
  });

  const likeBlog = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updatedBlogMutation.mutate(likedBlog);
  };

  const onRemoveBlog = (id, title) => {
    if (window.confirm(`remove blog ${title}?`))
      deletedBlogMutation.mutate(id);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li>{blog.url}</li>
      <li>{blog.user.name}</li>
      <li data-testid="likes" style={{ display: 'flex', color: 'pink' }}>
        {blog.likes}
        <FcLikePlaceholder
          style={{ cursor: 'pointer' }}
          aria-label="like button"
          onClick={likeBlog}
        />
      </li>
      {isRemovable && <button onClick={() => onRemoveBlog(blog.id, blog.title)}>remove blog</button>}
    </ul>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogDetails;
