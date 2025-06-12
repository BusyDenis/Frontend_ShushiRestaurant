import React, { useState } from 'react';

const Account = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [user, setUser] = useState(null);
  const [reservation, setReservation] = useState(() => {
    // Try to load reservation from localStorage (simulate persistence)
    const data = localStorage.getItem('reservation');
    return data ? JSON.parse(data) : null;
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUser({ ...form });
  };

  // Simulate saving reservation info after login/register
  React.useEffect(() => {
    if (user && reservation) {
      localStorage.setItem('reservation', JSON.stringify(reservation));
    }
  }, [user, reservation]);

  return (
    <div className="account-page" style={{ maxWidth: 400, margin: '3em auto', background: '#181818', borderRadius: 16, padding: '2em', boxShadow: '0 4px 24px #0008' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '1.5em' }}>Account</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5em' }}>
        <button
          className={mode === 'login' ? 'btn btn-gold' : 'btn'}
          style={{ marginRight: 8 }}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={mode === 'register' ? 'btn btn-gold' : 'btn'}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>
      {!user ? (
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
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
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
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
          <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h3 style={{ color: '#d4af37' }}>Welcome, {user.username}!</h3>
          {reservation ? (
            <div style={{ marginTop: '2em', background: '#222', borderRadius: 8, padding: '1em' }}>
              <h4 style={{ color: '#d4af37' }}>Your Reservation</h4>
              <p>Date: {reservation.date}</p>
              <p>From: {reservation.timeFrom}</p>
              <p>To: {reservation.timeTo}</p>
              <p>Guests: {reservation.persons}</p>
              <p>Phone: {reservation.phone}</p>
            </div>
          ) : (
            <p style={{ marginTop: '2em' }}>No reservation found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Account; 