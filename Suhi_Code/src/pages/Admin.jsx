import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import AdminCodeEntry from '../components/AdminCodeEntry';
import './Admin.css';

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [activeSection, setActiveSection] = useState('add');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load existing menu items (you'll need to implement the actual API call)
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchMenuItems = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/menu-items');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
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
      // Replace with your actual API endpoint
      const response = await fetch('/api/menu-items', {
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
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  if (!isAuthenticated) {
    return <AdminCodeEntry onCodeCorrect={() => setIsAuthenticated(true)} />;
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
              className={`nav-item ${activeSection === 'add' ? 'active' : ''}`}
              onClick={() => setActiveSection('add')}
            >
              Add New Item
            </button>
            <button 
              className={`nav-item ${activeSection === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveSection('manage')}
            >
              Manage Items
            </button>
          </nav>
        </aside>

        <main className="swagger-content">
          {activeSection === 'add' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Add New Menu Item</h1>
                <p className="section-description">Create a new menu item by filling out the form below.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="swagger-form">
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
                    style={{ width: '100%' }}
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
                    style={{ width: '100%' }}
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
                    style={{ width: '100%' }}
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
                    style={{ width: '100%' }}
                  />
                </div>

                <button type="submit" className="swagger-button" style={{ width: '100%' }}>Add Item</button>
              </form>
            </div>
          )}

          {activeSection === 'manage' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Manage Menu Items</h1>
                <p className="section-description">View, edit, and delete existing menu items.</p>
              </div>

              <div className="swagger-table-container">
                <table className="swagger-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        <td>
                          <span className="category-badge">{item.category}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="swagger-button edit">Edit</button>
                            <button className="swagger-button delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin; 