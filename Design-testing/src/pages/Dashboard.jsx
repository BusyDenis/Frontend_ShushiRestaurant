import React, { useState } from 'react';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Salmon Nigiri', price: '6.90', category: 'nigiri' },
    { id: 2, name: 'California Roll', price: '8.90', category: 'rolls' },
    { id: 3, name: 'Vegan Roll', price: '7.90', category: 'vegan' }
  ]);

  const [reservations, setReservations] = useState([
    { id: 1, date: '2024-03-20', time: '19:00', persons: 4, phone: '+1 234 567890' },
    { id: 2, date: '2024-03-21', time: '20:00', persons: 2, phone: '+1 987 654321' }
  ]);

  const handleDeleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteReservation = (id) => {
    setReservations(prev => prev.filter(res => res.id !== id));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <section className="menu-management">
        <h3>Menu Management</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteMenuItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="reservation-overview">
        <h3>Reservation Overview</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.persons}</td>
                <td>{res.phone}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteReservation(res.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard; 