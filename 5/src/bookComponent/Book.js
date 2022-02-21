import React from "react";
import "./Book.css";

const Book = ({ openBook, rhymesRight, rhymesLeft }) => {
  return (
    <div className={`book ${openBook && "bookSearch"}`}>
      <div className="back"></div>
      <div className="page6">
        {rhymesRight.length > 0 &&
          rhymesRight.map((rhyme, index) => <p key={index}>{rhyme.word}</p>)}
      </div>
      <div className="page5">
        {rhymesLeft.length > 0 &&
          rhymesLeft.map((rhyme, index) => <p key={index}>{rhyme.word}</p>)}
      </div>
      <div className="page4"></div>
      <div className="page3"></div>
      <div className="page2"></div>
      <div className="page1"></div>
      <div className="front"></div>
    </div>
  );
};

export default Book;
