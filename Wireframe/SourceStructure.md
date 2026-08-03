research-rag-ui/
│
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── logo.svg
│   ├── sample-pdf.png
│   ├── figure-preview.png
│   └── icons/
│
├── components/
│   ├── Sidebar
│   ├── Chat
│   ├── PDFViewer
│   ├── EvidencePanel
│   ├── Diagnostics
│   ├── Comparison
│   └── Admin
│
└── mock-data/
    ├── citations.json
    ├── retrieval.json
    └── documents.json


Demo the mock"
from command prompt run below command to run the server from root folder wireframe
python -m http.server

browser should load http://localhost/index.html