import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import AdminCodeEntry from '../components/AdminCodeEntry';
import './Admin.css';

// Import images for fallback menu items
import img1 from '../../img_1.png';
import img2 from '../../img_2.png';
import img3 from '../../img_3.png';
import img4 from '../../img_4.png';

const API_BASE_URL = 'http://localhost:8080/api';

// Hardcoded fallback menu items (from Menu.jsx)
const fallbackMenuItems = [
  {
    id: 1,
    name: 'Sushi Premium Box',
    category: 'special',
    price: '49.90',
    description: 'Our exclusive selection of the finest sushi creations',
    image: img1
  },
  {
    id: 2,
    name: 'Salmon Nigiri',
    category: 'nigiri',
    price: '6.90',
    description: 'Fresh salmon on rice',
    image: img2
  },
  {
    id: 3,
    name: 'Tuna Roll',
    category: 'rolls',
    price: '14.90',
    description: 'Fresh tuna with avocado and cucumber',
    image: img3
  },
  {
    id: 4,
    name: 'Vegetable Roll',
    category: 'vegan',
    price: '10.90',
    description: 'Assorted fresh vegetables wrapped in rice and seaweed',
    image: img4
  }
];

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [activeSection, setActiveSection] = useState('manage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', description: '', price: '', category: '', image: '' });
  const [reservations, setReservations] = useState([
    { id: 1, name: 'Alice', date: '2025-06-18', timeFrom: '18:00', timeTo: '20:00', persons: 2, phone: '+1234567890', status: 'new' },
    { id: 2, name: 'Bob', date: '2025-06-18', timeFrom: '19:30', timeTo: '21:00', persons: 4, phone: '+1987654321', status: 'new' },
    { id: 3, name: 'Charlie', date: '2025-06-18', timeFrom: '20:00', timeTo: '22:00', persons: 3, phone: '+1122334455', status: 'accepted' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems(fallbackMenuItems);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to load menu items. Please try again later.');
        setMenuItems(fallbackMenuItems);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setMenuItems(prev => [...prev, addedItem]);
        setNewItem({
          name: '',
          description: '',
          price: '',
          category: '',
          image: ''
        });
        setError(null);
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      setError('Failed to add menu item. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'DELETE',
      });
      setMenuItems(prev => prev.filter(item => item.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError('Failed to delete menu item. Please try again.');
    }
  };

  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditItem({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      // Update backend if needed
      await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem),
      });
      setMenuItems(prev => prev.map(item => item.id === id ? { ...editItem, id } : item));
      setEditItemId(null);
      setError(null);
    } catch (error) {
      setError('Failed to update menu item. Please try again.');
    }
  };

  const handleEditCancel = () => {
    setEditItemId(null);
  };

  const handleAcceptReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const handleDeclineReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  if (!isAuthenticated) {
    return <AdminCodeEntry onCodeCorrect={() => {
      setIsAuthenticated(true);
      setActiveSection('manage');
    }} />;
  }

  return (
    <div>
      <div className="admin-navbar">
        <Header />
      </div>
      <div className="swagger-admin">
        <aside className="swagger-sidebar">
          <div className="sidebar-header">
            <h2>Admin Menu</h2>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeSection === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveSection('manage')}
            >
              Manage Items
            </button>
            <button
              className={`nav-item ${activeSection === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveSection('reservations')}
            >
              Manage Reservations
            </button>
          </nav>
        </aside>

        <main className="swagger-content">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {activeSection === 'manage' && (
            <div className="content-section">
              <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ margin: 0 }}>Manage Menu Items</h1>
                  <p className="section-description">View, edit, and delete existing menu items.</p>
                </div>
                <button
                  className="swagger-button"
                  style={{ width: 44, height: 44, borderRadius: '50%', fontSize: '2rem', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setShowAddForm(f => !f)}
                  title={showAddForm ? 'Close' : 'Add New Item'}
                >
                  {showAddForm ? '×' : '+'}
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', color: '#d4af37', fontSize: '1.2rem', margin: '2rem 0' }}>Loading menu items...</div>
              ) : (
                <>
                  {showAddForm && (
                    <form onSubmit={handleSubmit} className="swagger-form" style={{ marginBottom: '2rem' }}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newItem.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter item name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={newItem.description}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter item description"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <div className="price-input" style={{ width: '100%' }}>
                          <span className="currency">$</span>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            step="0.01"
                            required
                            placeholder="0.00"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                          id="category"
                          name="category"
                          value={newItem.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="special">Special</option>
                          <option value="nigiri">Nigiri</option>
                          <option value="rolls">Rolls</option>
                          <option value="vegan">Vegan</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                          type="url"
                          id="image"
                          name="image"
                          value={newItem.image}
                          onChange={handleInputChange}
                          required
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <button type="submit" className="swagger-button">Add Item</button>
                    </form>
                  )}

                  <div className="admin-menu-grid">
                    {menuItems.map((item) => (
                      <div className="admin-menu-card" key={item.id}>
                        {item.image && (
                          <img src={item.image} alt={item.name} />
                        )}
                        {editItemId === item.id ? (
                          <>
                            <input
                              className="form-group input"
                              type="text"
                              name="name"
                              value={editItem.name}
                              onChange={handleEditChange}
                              style={{ marginBottom: '0.5rem', width: '100%' }}
                            />
                            <select
                              className="form-group select"
                              name="category"
                              value={editItem.category}
                              onChange={handleEditChange}
                              style={{ marginBottom: '0.5rem', width: '100%' }}
                            >
                              <option value="special">Special</option>
                              <option value="nigiri">Nigiri</option>
                              <option value="rolls">Rolls</option>
                              <option value="vegan">Vegan</option>
                            </select>
                            <textarea
                              className="form-group textarea"
                              name="description"
                              value={editItem.description}
                              onChange={handleEditChange}
                              style={{ marginBottom: '0.5rem', width: '100%' }}
                            />
                            <input
                              className="form-group input"
                              type="number"
                              name="price"
                              value={editItem.price}
                              onChange={handleEditChange}
                              style={{ marginBottom: '0.5rem', width: '100%' }}
                            />
                            <input
                              className="form-group input"
                              type="url"
                              name="image"
                              value={editItem.image}
                              onChange={handleEditChange}
                              style={{ marginBottom: '0.5rem', width: '100%' }}
                            />
                            <div className="card-spacer"></div>
                            <div className="action-buttons">
                              <button className="swagger-button" onClick={() => handleEditSave(item.id)} type="button">Save</button>
                              <button className="swagger-button delete" onClick={handleEditCancel} type="button">Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3>{item.name}</h3>
                            <span className="category-badge">{item.category}</span>
                            <p>{item.description}</p>
                            <span className="price">${item.price}</span>
                            <div className="card-spacer"></div>
                            <div className="action-buttons">
                              <button className="swagger-button edit" onClick={() => handleEditClick(item)}>Edit</button>
                              <button 
                                className="swagger-button delete"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeSection === 'reservations' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Manage Reservations</h1>
                <p className="section-description">Review, accept, or decline reservations.</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4af37', fontSize: '1.2rem', marginBottom: '1rem' }}>New Reservations</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {reservations.filter(r => r.status === 'new').length === 0 && (
                    <div style={{ color: '#aaa' }}>No new reservations.</div>
                  )}
                  {reservations.filter(r => r.status === 'new').map(r => (
                    <div key={r.id} style={{ background: '#222', borderRadius: 8, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                          {r.name}
                          <span style={{ color: '#d4af37', fontWeight: 500, fontSize: '1rem', marginLeft: '0.7em' }}>{r.date}</span>
                        </div>
                        <div style={{ color: '#d4af37', fontSize: '1.05rem', marginBottom: '0.15rem' }}>
                          {(r.timeFrom || r.timeTo) && (
                            <span>{r.timeFrom}{r.timeTo ? `-${r.timeTo}` : ''}</span>
                          )}
                          <span style={{ color: '#bfa13a', marginLeft: '0.7em' }}>• {r.persons} persons</span>
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.97rem', display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                          <span role="img" aria-label="phone">📞</span> {r.phone || '-'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.7rem' }}>
                        <button className="swagger-button" style={{ width: 38, height: 38, borderRadius: '50%', fontSize: '1.3rem', padding: 0 }} title="Accept" onClick={() => handleAcceptReservation(r.id)}>&#10003;</button>
                        <button className="swagger-button delete" style={{ width: 38, height: 38, borderRadius: '50%', fontSize: '1.3rem', padding: 0 }} title="Decline" onClick={() => handleDeclineReservation(r.id)}>&#10005;</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 style={{ color: '#d4af37', fontSize: '1.2rem', marginBottom: '1rem' }}>Accepted Reservations</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {reservations.filter(r => r.status === 'accepted').length === 0 && (
                    <div style={{ color: '#aaa' }}>No accepted reservations.</div>
                  )}
                  {reservations.filter(r => r.status === 'accepted').map(r => (
                    <div key={r.id} style={{ background: '#232323', borderRadius: 8, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                          {r.name}
                          <span style={{ color: '#d4af37', fontWeight: 500, fontSize: '1rem', marginLeft: '0.7em' }}>{r.date}</span>
                        </div>
                        <div style={{ color: '#d4af37', fontSize: '1.05rem', marginBottom: '0.15rem' }}>
                          {(r.timeFrom || r.timeTo) && (
                            <span>{r.timeFrom}{r.timeTo ? `-${r.timeTo}` : ''}</span>
                          )}
                          <span style={{ color: '#bfa13a', marginLeft: '0.7em' }}>• {r.persons} persons</span>
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.97rem', display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                          <span role="img" aria-label="phone">📞</span> {r.phone || '-'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin; 