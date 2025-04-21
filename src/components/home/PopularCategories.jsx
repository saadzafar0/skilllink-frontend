// src/components/common/PopularCategories.jsx
import React from 'react';
import './PopularCategories.css';

const categories = [
  { name: 'Web Development', icon: '🌐' },
  { name: 'Graphic Design', icon: '🎨' },
  { name: 'Writing & Translation', icon: '📝' },
  { name: 'Digital Marketing', icon: '📈' },
  { name: 'Mobile Development', icon: '📱' },
  { name: 'Data Science', icon: '📊' },
];

const PopularCategories = () => {
  return (
    <section className="category-section">
      <h2>Popular Categories</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <span className="category-icon">{cat.icon}</span>
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
