import React, { useState } from 'react';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    persons: '2',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend -> important for Lisa and Azar
    console.log('Reservation submitted:', formData);
    alert('Reservation successfully submitted!');
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

        <button type="submit" className="btn btn-gold">Reserve</button>
      </form>
    </div>
  );
};

export default Reservation; 