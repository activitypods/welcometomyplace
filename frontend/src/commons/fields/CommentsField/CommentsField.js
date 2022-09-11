import React from 'react';
import PostCommentForm from "./PostCommentForm";
import CommentsList from "./CommentsList";

const CommentsField = ({ source, context }) => {
  return (
    <>
      <PostCommentForm context={context} />
      <CommentsList />
    </>
  );
};

CommentsField.defaultProps = {
  addLabel: true,
};

export default CommentsField;
