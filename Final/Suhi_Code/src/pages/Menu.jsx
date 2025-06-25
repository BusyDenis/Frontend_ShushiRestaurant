import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [fade, setFade] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await fetchWithAuth(API_ENDPOINTS.MENU.GET_ALL);
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems([]);
        }
      } catch (err) {
        setMenuItems([]);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleCategoryChange = (category) => {
    setFade(true);
    setTimeout(() => {
      setActiveCategory(category);
      setFade(false);
    }, 250);
  };

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      <section className="chefs-choice">
        <div className="chefs-choice-content">
          <div>
            <h2>Chef's Choice</h2>
            <p>Our signature dish</p>
            <div className="premium-box">
              <h3>Sushi Premium Box</h3>
              <p>A selection of our finest sushi pieces</p>
              <p className="price">$49.90</p>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-categories">
        <div className="category-buttons">
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          <button
            className={activeCategory === 'nigiri' ? 'active' : ''}
            onClick={() => handleCategoryChange('nigiri')}
          >
            Nigiri
          </button>
          <button
            className={activeCategory === 'rolls' ? 'active' : ''}
            onClick={() => handleCategoryChange('rolls')}
          >
            Rolls
          </button>
          <button
            className={activeCategory === 'vegan' ? 'active' : ''}
            onClick={() => handleCategoryChange('vegan')}
          >
            Vegan
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#d4af37', fontSize: '1.2rem', margin: '2rem 0' }}>Loading menu...</div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#ff4d4d', fontSize: '1.2rem', margin: '2rem 0' }}>No menu items available.</div>
        ) : (
          <div className={`menu-grid${fade ? ' fade-menu' : ''}`}>
            {filteredItems.map(item => (
              <div
                key={item.dishId || item.id}
                className="menu-item"
                onClick={() => navigate(`/menu/${item.dishId || item.id}`)}
              >
                <div className="menu-item-image">
                  <img src={item.imgURL} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">${item.price}</span>
              </div>
            ))}
          </div>
        )}
        {error && <div style={{ color: '#ff4d4d', marginTop: '1em', textAlign: 'center' }}>{error}</div>}
      </section>
    </div>
  );
};

export default Menu; 