import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../img_1.png';
import img2 from '../../img_2.png';
import img3 from '../../img_3.png';
import img4 from '../../img_4.png';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

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
          setMenuItems(fallbackMenuItems);
        }
      } catch (err) {
        setMenuItems(fallbackMenuItems);
        setError('Failed to load menu. Showing fallback menu.');
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
        ) : (
          <div className={`menu-grid${fade ? ' fade-menu' : ''}`}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => navigate(`/menu/${item.id}`)}
              >
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} />
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