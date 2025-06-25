import React, { useState } from 'react';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    persons: '2',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await fetchWithAuth(API_ENDPOINTS.RESERVATION.CREATE, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({
        date: '',
        timeFrom: '',
        timeTo: '',
        persons: '2',
        phone: ''
      });
    } catch (err) {
      setError('Reservation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="reservation-page">
      <h2>Reservation</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeFrom">From</label>
          <input
            type="time"
            id="timeFrom"
            name="timeFrom"
            value={formData.timeFrom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeTo">To</label>
          <input
            type="time"
            id="timeTo"
            name="timeTo"
            value={formData.timeTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="persons">Number of Guests</label>
          <select
            id="persons"
            name="persons"
            value={formData.persons}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 234 567890"
          />
        </div>

        <button type="submit" className="btn btn-gold" disabled={loading}>{loading ? 'Submitting...' : 'Reserve'}</button>
        {success && <div style={{ color: '#4caf50', marginTop: '1em', textAlign: 'center' }}>Reservation successfully submitted!</div>}
        {error && <div style={{ color: '#ff4d4d', marginTop: '1em', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Reservation; 