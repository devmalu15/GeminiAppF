import React, { useState, useEffect } from 'react'
import './App.css'
import PdfUpload from './PdfUpload'
import PdfAndTextUpload from './PdfAndTextUpload'
import Navbar from './Navbar'
import HomePage from './HomePage'

const pages = {
  home: <HomePage />,
  pdf: <PdfUpload />,
  pdfAndTextUploads: <PdfAndTextUpload />,
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [page, setPage] = useState('home');

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const CurrentPage = pages[page];

  return (
    <>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        setPage={setPage}
        currentPage={page}
      />
      <main id="page-content">
        {page === 'home' ? <HomePage setPage={setPage} /> : CurrentPage}
      </main>
    </>
  )
}

export default App
