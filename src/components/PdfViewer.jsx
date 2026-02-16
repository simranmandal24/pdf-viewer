import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);

  return (
    <div style={{ padding: "10px" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error("PDF error:", err)}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page key={i} pageNumber={i + 1} width={600} />
          ))}
        </Document>
      )}
    </div>
  );
}
