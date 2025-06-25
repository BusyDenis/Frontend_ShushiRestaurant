import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

const Reservation = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    phoneNumber: '',
    date: '',
    startTime: '',
    endTime: '',
    amountOfPeople: '2',
    tableId: ''
  });

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch available tables from backend
    const fetchTables = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/tables/available');
        const data = await res.json();
        setTables(data);
      } catch (err) {
        setTables([]);
      }
    };
    fetchTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const payload = {
        user_email: formData.userEmail,
        phoneNumber: formData.phoneNumber,
        startTime: formData.startTime,
        endTime: formData.endTime,
        amountOfPeople: parseInt(formData.amountOfPeople, 10),
        table: { tableId: parseInt(formData.tableId, 10) }
      };
      await fetchWithAuth(API_ENDPOINTS.RESERVATION.CREATE, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSuccess(true);
      setFormData({
        userEmail: '',
        phoneNumber: '',
        date: '',
        startTime: '',
        endTime: '',
        amountOfPeople: '2',
        tableId: ''
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
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="+1 234 567890"
          />
        </div>
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
          <label htmlFor="startTime">From</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">To</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amountOfPeople">Number of Guests</label>
          <select
            id="amountOfPeople"
            name="amountOfPeople"
            value={formData.amountOfPeople}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tableId">Table</label>
          <select
            id="tableId"
            name="tableId"
            value={formData.tableId}
            onChange={handleChange}
            required
          >
            <option value="">Select a table</option>
            {tables.map(table => (
              <option key={table.tableId} value={table.tableId}>
                Table {table.tableId} ({table.seats} seats)
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-gold" disabled={loading}>{loading ? 'Submitting...' : 'Reserve'}</button>
        {success && <div style={{ color: '#4caf50', marginTop: '1em', textAlign: 'center' }}>Reservation successfully submitted!</div>}
        {error && <div style={{ color: '#ff4d4d', marginTop: '1em', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Reservation; 