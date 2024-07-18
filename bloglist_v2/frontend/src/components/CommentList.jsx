import Comment from './Comment';
import blogService from '../services/blogs';
import useFetch from '../hooks/useFetch';
import CommentForm from './CommentForm';

import styled from 'styled-components';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  height: 150px;
  overflow: scroll;
`;


const CommentList = ({ id }) => {

  const result = useFetch('comments', blogService.getAllComments, id);

  if (result.isLoading) {
    return <p>Loading comments...</p>;
  }

  const comments = result.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Comments</h3>
      {comments.length > 0
        ? <StyledList id="comments" >{comments.map(comment => (
          <Comment key={comment.id} comment={comment} />))}
        </StyledList>
        : <p>Be the first one to leave the comment</p>}
      <CommentForm id={id}/>
    </div>
  );
};

export default CommentList;