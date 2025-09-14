import { useState, useEffect } from 'react';

function TextUpload() {
  const [input, setInput] = useState('');
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
    }, 30); // Adjust speed here (ms per character)
    return () => clearInterval(interval);
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('geminiappb-production.up.railway.app/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse('Error connecting to backend');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Gemini Text Response</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your text here..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit" disabled={loading || !input}>
          {loading ? 'Loading...' : 'Send'}
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

export default TextUpload;