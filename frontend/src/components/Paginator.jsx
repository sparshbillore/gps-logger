import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Paginator({ page_no, onPreviousClick, onNextClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={onPreviousClick}
      >
        <FiChevronLeft />
      </button>
      <span style={{ padding: "0 10px" }}>{page_no}</span>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={onNextClick}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Paginator;

