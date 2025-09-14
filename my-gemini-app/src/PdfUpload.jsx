import { useState, useEffect } from 'react';

function PdfUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [displayed, setDisplayed] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!response) {
      setDisplayed('');
      return;
    }
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(response.slice(0, i + 1));
      i++;
      if (i >= response.length) clearInterval(interval);
    }, 10); // Increased speed (lower ms)
    return () => clearInterval(interval);
  }, [response]);

  // Helper to render bold/bigger text between double asterisks
  const renderFormatted = (text) =>
    text.split(/(\*\*[^\*]+\*\*)/g).map((part, i) =>
      part.match(/^\*\*([^\*]+)\*\*$/)
        ? (
          <span key={i} style={{ fontWeight: 'bold', fontSize: '1.15rem' }}>
            {part.slice(2, -2)}
          </span>
        )
        : part
    );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResponse('');
    } else {
      setFile(null);
      setResponse('Please select a valid PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResponse('');
    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const res = await fetch('http://localhost:8080/api/pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse('Error uploading PDF');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Upload a PDF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {displayed && (
        <div className="response">
          <h2>Response:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {renderFormatted(displayed)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default PdfUpload;