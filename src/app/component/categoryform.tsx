"use client"
import React, { useState } from 'react';
import axios from 'axios';

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description,setdescription]=useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/category', { name, slug,description });
      onSuccess();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Slug (e.g., beaches)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Description "
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
};

export default CategoryForm;