import useField from '../hooks/useField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import styled from 'styled-components';

const StyledForm = styled.form`
  justify-content: center;
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    resize: vertical;
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

const CommentForm = ({ id }) => {
  const { reset, ...content } = useField('text');
  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: ({ id, commentObj }) => blogService.createComment(id, commentObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setTimeout(() => {
        const commentBlock = document.getElementById('comments');
        commentBlock.scrollTop = commentBlock.scrollHeight;
      }, 100);
    }
  });

  const addComment = (e) => {
    e.preventDefault();
    newCommentMutation.mutate({
      id: id,
      commentObj: { content: content.value }
    });
    reset();
  };

  return (
    <StyledForm style={{ border: 'none' }} onSubmit={ addComment }>
      <textarea placeholder="Leave a comment" {...content} />
      <button type='submit'>Comment</button>
    </StyledForm>
  );
};

export default CommentForm;