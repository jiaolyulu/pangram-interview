
import React from 'react';

interface CommentDisplayProps {
  x: number;
  y: number;
  text: string;
}

const Comment: React.FC<CommentDisplayProps> = ({ x, y, text }) => {
  return (
    <div
      className="absolute bg-white"
      style={{ left: x, top: y }}
    >
      {text}
    </div>
  );
};

export default Comment;