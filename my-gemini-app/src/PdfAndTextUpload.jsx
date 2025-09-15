import { useState, useEffect } from 'react';

function PdfAndTextUpload() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
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
    }, 10);
    return () => clearInterval(interval);
  }, [response]);

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

  const handleTextChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setResponse('Please provide both a PDF file and a job description.');
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('jobDescription', jobDescription);

      const res = await fetch('https://geminiappb-production.up.railway.app/api/pdfwithJD', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse('Error uploading file and text.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Upload PDF and Job Description</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pdf-upload">Upload your CV (PDF):</label>
        <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} />
        <br />
        <label htmlFor="job-description">Paste Job Description:</label>
        <textarea id="job-description" value={jobDescription} onChange={handleTextChange} rows="10" placeholder="Paste the job description here..." />
        <br />
        <button type="submit" disabled={loading || !file || !jobDescription}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {displayed && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{renderFormatted(displayed)}</pre>
        </div>
      )}
    </div>
  );
}

export default PdfAndTextUpload;
