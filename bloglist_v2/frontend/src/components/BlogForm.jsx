import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import useNotification from '../hooks/useNotification';

import styled from 'styled-components';

const StyledInput = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledForm = styled.form`
  background-color: #ffc43d;
  color: black;
  position: absolute;
  border-radius: 7px;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  transition: opacity 0.4s ease-in-out;
  font-size: 20px;
  input {
    border: none;
    border-bottom: 2px solid black;
    color: black;
    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid black;
      box-shadow:0 0 5px black;
    }
  }
`;


const BlogForm = ({ open, setOpen }) => {
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
      setOpen(!open);
      setTimeout(() => {
        const blogsBlock = document.getElementById('blogs');
        blogsBlock.scrollTop = blogsBlock.scrollHeight;
      }, 100);
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
    <div><StyledForm open={open} onSubmit={addBlog}>
      <h2 style={{ color: 'black' }}>Create New Blog</h2>
      <StyledInput>
        Title:
        <input
          data-testid="title-input"
          value={title}
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />
      </StyledInput>
      <StyledInput>
        Author:
        <input
          data-testid="author-input"
          value={author}
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </StyledInput>
      <StyledInput>
        Url:
        <input
          data-testid="url-input"
          value={url}
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />
      </StyledInput>
      <button type="submit">Create</button>
      <button onClick={ () => setOpen(!open) } type="button">Cancel</button>
    </StyledForm>
    </div>
  );
};

export default BlogForm;
