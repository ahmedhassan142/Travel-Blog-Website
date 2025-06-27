"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/category', { name, slug, description });
      onSuccess();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg mt-0 mb-0 overflow-y-auto max-h-[calc(100vh-10rem)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Beaches"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            placeholder="e.g. beaches"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Short description of the category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:shadow-md min-h-[80px]"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;