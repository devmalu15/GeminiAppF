import { useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload'
import PdfUpload from './PdfUpload'
import TextUpload from './TextUpload';

function App() {
  const [page, setPage] = useState('text')

  if (page === 'image') {
    return (
      <div>
        <nav style={{ margin: '1rem' }}>
          <button onClick={() => setPage('text')}>Text Page</button>
          <button disabled>Image Page</button>
          <button onClick={() => setPage('pdf')}>PDF Page</button>
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
        </nav>
        <PdfUpload />
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
      </nav>
      <TextUpload />
    </div>
  )
}

export default App
