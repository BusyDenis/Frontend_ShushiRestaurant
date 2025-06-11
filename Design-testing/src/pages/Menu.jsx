import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    id: 1,
    name: 'Sushi Premium Box',
    category: 'special',
    price: '49.90',
    description: 'Our exclusive selection of the finest sushi creations',
    image: '/images/premium-box.jpg'
  },
  {
    id: 2,
    name: 'Salmon Nigiri',
    category: 'nigiri',
    price: '6.90',
    description: 'Fresh salmon on rice',
    image: '/images/salmon-nigiri.jpg'
  },
  {
    id: 3,
    name: 'California Roll',
    category: 'rolls',
    price: '8.90',
    description: 'Crab, avocado, cucumber',
    image: '/images/california-roll.jpg'
  },
  {
    id: 4,
    name: 'Vegan Roll',
    category: 'vegan',
    price: '7.90',
    description: 'Avocado, cucumber, carrot',
    image: '/images/vegan-roll.jpg'
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      <section className="chefs-choice">
        <h2>Chef's Choice</h2>
        <div className="premium-box">
          <h3>Sushi Premium Box</h3>
          <p>Our exclusive selection of the finest sushi creations</p>
          <span className="price">$49.90</span>
        </div>
      </section>

      <section className="menu-categories">
        <div className="category-buttons">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={activeCategory === 'nigiri' ? 'active' : ''} 
            onClick={() => setActiveCategory('nigiri')}
          >
            Nigiri
          </button>
          <button 
            className={activeCategory === 'rolls' ? 'active' : ''} 
            onClick={() => setActiveCategory('rolls')}
          >
            Rolls
          </button>
          <button 
            className={activeCategory === 'vegan' ? 'active' : ''} 
            onClick={() => setActiveCategory('vegan')}
          >
            Vegan
          </button>
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="menu-item"
              onClick={() => navigate(`/menu/${item.id}`)}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">${item.price}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu; 