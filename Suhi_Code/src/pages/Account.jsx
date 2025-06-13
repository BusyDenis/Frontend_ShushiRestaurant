import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8080/api/v1';

const Account = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetch(`${API_BASE}/user`)
        .then(res => res.json())
        .then(data => setAllUsers(data))
        .catch(() => setAllUsers([]));
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password
          })
        });
        if (!res.ok) throw new Error('Registration failed');
        const data = await res.json();
        setUser(data);
      } else {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="account-page" style={{ maxWidth: 400, margin: '3em auto', background: '#181818', borderRadius: 16, padding: '2em', boxShadow: '0 4px 24px #0008' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '1.5em' }}>PROFILE</h2>
      {!user ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5em' }}>
            <button
              className={mode === 'login' ? 'btn btn-gold' : 'btn'}
              style={{ marginRight: 8 }}
              onClick={() => { setMode('login'); setError(''); }}
            >
              Login
            </button>
            <button
              className={mode === 'register' ? 'btn btn-gold' : 'btn'}
              onClick={() => { setMode('register'); setError(''); }}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.7em', marginBottom: '1em', borderRadius: 4, border: '1px solid #333', background: '#222', color: '#fff' }}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7em', marginBottom: '1em', borderRadius: 4, border: '1px solid #333', background: '#222', color: '#fff' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7em', marginBottom: '1.5em', borderRadius: 4, border: '1px solid #333', background: '#222', color: '#fff' }}
              />
            </div>
            <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
            </button>
            {error && <div style={{ color: '#ff4d4d', marginTop: '1em', textAlign: 'center' }}>{error}</div>}
          </form>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h3 style={{ color: '#d4af37' }}>Welcome, {user.name}!</h3>
          <p style={{ color: '#aaa', fontSize: '0.95em' }}>{user.email}</p>
          <button className="btn" style={{ margin: '1.5em 0' }} onClick={handleLogout}>Logout</button>
          {user.role === 'ADMIN' && (
            <div style={{ marginTop: '2em', background: '#222', borderRadius: 8, padding: '1em' }}>
              <h4 style={{ color: '#d4af37' }}>All Users</h4>
              {allUsers.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {allUsers.map(u => (
                    <li key={u.userId} style={{ marginBottom: 8, borderBottom: '1px solid #333', paddingBottom: 6 }}>
                      <span style={{ color: '#d4af37' }}>{u.name}</span> <span style={{ color: '#aaa', fontSize: '0.9em' }}>({u.email})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account; 