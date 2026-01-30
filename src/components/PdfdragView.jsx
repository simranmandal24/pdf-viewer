import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ScrollContainer from "react-indiana-drag-scroll";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// ✅ VITE SAFE WORKER CONFIG
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function ReactPdfViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <ScrollContainer style={{ height: "80vh" }}>
        {file && (
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(err) => console.error("PDF load error:", err)}
          >
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <Page key={i} pageNumber={i + 1} />
              ))}
          </Document>
        )}
      </ScrollContainer>
    </div>
  );
}
