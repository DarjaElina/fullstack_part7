import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import useNotification from '../hooks/useNotification';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { setNotification } = useNotification();

  const newBlogMutation = useMutation({
    mutationFn: (blogObj) => blogService.create(blogObj),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      setNotification(`blog ${newBlog.title} added successfully`);
    },
    onError: (error) => {
      console.error(error);
      setNotification('error adding blog', error);
    }
  });

  const addBlog = (e) => {
    e.preventDefault();

    newBlogMutation.mutate({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title-input"
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author-input"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url-input"
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
