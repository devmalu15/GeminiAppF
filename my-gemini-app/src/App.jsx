import { useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload'
import PdfUpload from './PdfUpload'
import TextUpload from './TextUpload'
import PdfAndTextUpload from './PdfAndTextUpload'

function App() {
  const [page, setPage] = useState('text')

  if (page === 'image') {
    return (
      <div>
        <nav style={{ margin: '1rem' }}>
          <button onClick={() => setPage('text')}>Text Page</button>
          <button disabled>Image Page</button>
          <button onClick={() => setPage('pdf')}>PDF Page</button>
          <button onClick={() => setPage('pdfAndTextUploads')}>PDF & Text Page</button>
        </nav>
        <ImageUpload />
      </div>
    )
  }

  if (page === 'pdf') {
    return (
      <div>
        <nav style={{ margin: '1rem' }}>
          <button onClick={() => setPage('text')}>Text Page</button>
          <button onClick={() => setPage('image')}>Image Page</button>
          <button disabled>PDF Page</button>
          <button onClick={() => setPage('pdfAndTextUploads')}>PDF & Text Page</button>
        </nav>
        <PdfUpload />
      </div>
    )
  }

  if (page === 'pdfAndTextUploads') {
    return (
      <div>
        <nav style={{ margin: '1rem' }}>
          <button onClick={() => setPage('text')}>Text Page</button>
          <button onClick={() => setPage('image')}>Image Page</button>
          <button onClick={() => setPage('pdf')}>PDF Page</button>
          <button disabled>PDF & Text Page</button>
        </nav>
        <PdfAndTextUpload />
      </div>
    )
  }

  // Text section is now a separate component
  return (
    <div>
      <nav style={{ margin: '1rem' }}>
        <button disabled>Text Page</button>
        <button onClick={() => setPage('image')}>Image Page</button>
        <button onClick={() => setPage('pdf')}>PDF Page</button>
        <button onClick={() => setPage('pdfAndTextUploads')}>PDF & Text Page</button>
      </nav>
      <TextUpload />
    </div>
  )
}

export default App
