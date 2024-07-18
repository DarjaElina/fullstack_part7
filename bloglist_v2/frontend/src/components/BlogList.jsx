import { useContext, useState } from 'react';
import BlogForm from './BlogForm';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Blogs = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  overflow: scroll;
`;

const StyledBlogLink = styled.li`
  border: 1px solid #fff;
  padding: 1em;
  margin: 0.5em;
`;

const BlogsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const ToggleButton = styled.button`
  display: ${({ open }) => (open ? 'none' : 'block')};
`;

const BlogList = ({ blogs }) => {
  const [user] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <BlogsWrap>
      <Blogs id="blogs">
        <ul>
          {blogs.map(blog => (
            <StyledBlogLink key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </StyledBlogLink>
          ))}
        </ul>
      </Blogs>
      <BlogForm setOpen={setIsOpen} open={isOpen}/>
      <ToggleButton open={isOpen} onClick={() => setIsOpen(!isOpen)}>New Blog</ToggleButton>
    </BlogsWrap>
  );
};

export default BlogList;
