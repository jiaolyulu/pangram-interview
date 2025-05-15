import React, { useState } from 'react';
import CommentType from './PdfViewer'

interface CommentBoxProps {
  onCancel?: () => void;
  onCreate?: (comment: string) => void;
  x: number;
  y: number;
  pageNumber: number;
  setComments: React.Dispatch<React.SetStateAction<typeof CommentType[]>>;
  comments: typeof CommentType[];
  setIsCommentBoxVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentBox: React.FC<CommentBoxProps> = ({ onCancel, x, y, pageNumber, setComments, comments, setIsCommentBoxVisible }) => {
  const [comment, setComment] = useState('');

  function handleCancel () {
    setComment('');
    if (onCancel) onCancel();
  };

  function handleCreate () {
    if (!comment.trim()) return;
    if (onCreate) onCreate(comment.trim());
    setComment('');
  };

  function onCreate (comment) {
    setComments((prevComments) => [
      ...prevComments,
      {
        id: prevComments.length + 1,
        text: comment,
        x,
        y,
        pageNumber,
      },
    ]);
    console.log("Comment created:", comments);
    setIsCommentBoxVisible(false);
  }

  return (
    <div className="absolute p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-3">Add Comment</h2>
      <textarea
        className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreate}
          disabled={!comment.trim()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CommentBox;