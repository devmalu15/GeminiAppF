function Navbar({ theme, toggleTheme, setPage, currentPage }) {
  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => setPage('home')}>
        ResumeChecker
      </div>
      <div className="navbar-links">
        <button onClick={() => setPage('pdf')} disabled={currentPage === 'pdf'}>PDF Upload</button>
        <button onClick={() => setPage('pdfAndTextUploads')} disabled={currentPage === 'pdfAndTextUploads'}>PDF & Text Upload</button>
      </div>
      <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="theme-checkbox">
          <input type="checkbox" id="theme-checkbox" onChange={toggleTheme} checked={theme === 'light'} />
          <div className="slider round"></div>
        </label>
        <span className="theme-name">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
      </div>
    </header>
  );
}

export default Navbar;
