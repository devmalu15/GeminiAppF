import { useState, useEffect } from 'react';

function ImageUpload() {
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
    }, 30); // Adjust speed here
    return () => clearInterval(interval);
  }, [response]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse('');
  };

  // Compress image using canvas
  const compressImage = (file, quality = 0.9, maxWidth = 1000) =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (ev) => {
        img.src = ev.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Compression failed'));
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResponse('');
    try {
      const compressedBlob = await compressImage(file);
      const formData = new FormData();
      formData.append('file', compressedBlob, file.name);

      const res = await fetch('https://geminiappb-production.up.railway.app/api/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse('Error uploading image');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {displayed && (
        <div className="response">
          <h2>Response:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {displayed}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;