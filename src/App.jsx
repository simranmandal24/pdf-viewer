import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(selectedFile) {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a PDF file only");
    }
  }

  // normal input
  function handleChange(e) {
    handleFile(e.target.files[0]);
  }

  // drag events
  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="App">
      <h2>Add PDF</h2>

      {/* Drag & Drop Box */}
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>📄 Drag & drop your PDF here</p>
        <p>or</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
        />
      </div>

      {/* Preview */}
      {file && (
        <iframe
          src={file}
          width="100%"
          height="500px"
          title="PDF Preview"
        />
      )}
    </div>
  );
}

export default App;
