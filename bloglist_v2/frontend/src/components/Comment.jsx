import styled from 'styled-components';

const StyledCommentWrap = styled.div`
    max-width: 15em;
    padding: 15px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 15px;
    color: black;
`;

const StyledCommentItem = styled.div`
  max-width: 15em;
  word-wrap: break-word;
  font-size: 15px;
`;

const Comment = ({ comment }) => {
  return (
    <StyledCommentWrap>
      <StyledCommentItem>
        {comment.content}
      </StyledCommentItem>
    </StyledCommentWrap>
  );
};

export default Comment;