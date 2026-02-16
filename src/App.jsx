// App.js
import React, { useState } from "react";
import "./App.css";


function App() {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a PDF file");
    }
  }

  return (
    <div className="App">
      <h2>Add PDF:</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
      />

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
