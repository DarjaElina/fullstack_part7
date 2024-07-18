import { useQueryClient, useMutation } from '@tanstack/react-query';
import useNotification from '../hooks/useNotification';
import blogService from '../services/blogs';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CommentList from './CommentList';
import { FcLike } from 'react-icons/fc';

import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ffee32;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const StyledLikeWrap = styled.div`
  display: flex;
  color: #F3D9DC;
  align-items: center;
  gap: 0.2em;
`;

const StyledLink = styled.a`
   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 15px;
  }
`;

const Blog = ({ blog }) => {
  const [user] = useContext(UserContext);
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();
  const navigate = useNavigate();

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
      navigate('/');
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

  const onRemoveBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`))
      deletedBlogMutation.mutate(blog.id);
  };

  return (
    <StyledDiv>
      <div>
        <h2>Blog {blog.title} by {blog.author}</h2>
        <p>Added by {blog.user.name}</p>
        <StyledLink href="/">{blog.url}</StyledLink>
        <StyledLikeWrap>
          <FcLike style={{ cursor: 'pointer' }}onClick={likeBlog}/>
          <p>{blog.likes}</p>
        </StyledLikeWrap>
        {blog.user.username === user.username ? <button onClick={() => onRemoveBlog(blog)}>remove</button> : null}
      </div>
      <CommentList id={blog.id}/>
    </StyledDiv>
  );
};

export default Blog;
