import { useState } from 'react';
import { api, API_BASE } from '../config';

export default function LoginScreen({ onLogin }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ adminKey: key })
      });
      onLogin(key);
    } catch (e) {
      setError(e.message || 'Login failed');
    }
  };

  return (
    <section id="screen-login" className="screen active">
      <div className="card">
        <h1>🛠️ Admin Console</h1>
        <p className="sub">Crack the Code — Event Control Panel</p>

        {!API_BASE ? (
          <div className="error" style={{ marginBottom: 12 }}>
            ⚠️ Backend URL not configured. Set <code>VITE_API_BASE</code> in this app's
            Vercel Environment Variables to your Render backend URL, then redeploy.
          </div>
        ) : (
          <p className="muted" style={{ fontSize: '0.75rem', marginTop: -8, marginBottom: 14, wordBreak: 'break-all' }}>
            Connecting to: {API_BASE}
          </p>
        )}

        <input 
          type="password" 
          placeholder="Admin key" 
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <div className="error">{error}</div>
        <button onClick={handleLogin} disabled={!API_BASE}>Log In</button>
      </div>
    </section>
  );
}
