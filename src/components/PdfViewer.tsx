"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CommentBox from "./CommentBox";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Comment from "./Comment";
// documentation: https://github.com/wojtekmaj/react-pdf

// Implement functionality to load and display `pangram.pdf` in the web application. (react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type CommentType = {
  id: number;
  text: string;
  x: number;
  y: number;
  pageNumber: number;
};

function PdfViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isCommentBoxVisible, setIsCommentBoxVisible] =
    useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    // This will fire for ANY click inside the div,
    // whether you click on a Page, the canvas, or even the buttons.
    // You can inspect event.target if you need to distinguish.
    const rect = (
      event.currentTarget as HTMLDivElement
    ).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setX(x);
    setY(y);
    console.log("Clicked inside container at:", { x, y });
    setIsCommentBoxVisible(true);
  }

  function onCancel() {
    console.log("Cancel called");
    setIsCommentBoxVisible(false);
  }

  return (
    <>
      {/* 1. PDF + comments wrapper */}
      <div
        className="relative inline-block" // <— makes this box shrink to the PDF size
        onClick={(event) => {
          if (!isCommentBoxVisible) {
            handleClick(event);
          }
        }}
      >
        <Document file="Pangram.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>

        {/* 2. Render the floating comment box at click */}
        {isCommentBoxVisible && (
          <CommentBox
            onCancel={onCancel}
            x={x}
            y={y}
            pageNumber={pageNumber}
            setComments={setComments}
            comments={comments}
            setIsCommentBoxVisible={setIsCommentBoxVisible}
          />
        )}

        {/* 3. Render all saved comments on top of the PDF */}
        {comments.map((c) => (
          <Comment key={c.id} x={c.x} y={c.y} text={c.text} />
        ))}
      </div>

      {/* 4. Your page controls stay outside of the relative wrapper */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        className="…"
        onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
      >
        Previous
      </button>
      <button
        className="…"
        onClick={() =>
          setPageNumber(numPages ? Math.min(numPages, pageNumber + 1) : 1)
        }
      >
        Next
      </button>
    </>
  );
}

export default PdfViewer;
