function HomePage({ setPage }) {
  return (
    <div className="container">
      <h1>Welcome to ResumeChecker</h1>
      <p>Analyze your resume against job descriptions to see how well you match.</p>
      <div className="homepage-actions">
        <button onClick={() => setPage('pdf')}>Analyze a PDF Resume</button>
        <button onClick={() => setPage('pdfAndTextUploads')}>
          Analyze a PDF Resume with a Job Description
        </button>
      </div>
    </div>
  );
}

export default HomePage;
