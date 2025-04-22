// src/components/common/PopularCategories.jsx
import React from 'react';

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
    <section className="py-16 px-8 bg-white text-center">
      <h2 className="text-4xl mb-8 text-[#008080]">Popular Categories</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 max-w-[1000px] mx-auto">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="bg-[#f1f1f1] rounded-xl p-8 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-4xl mb-4 block text-black">{cat.icon}</span>
            <h3 className="text-lg text-[#333]">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
