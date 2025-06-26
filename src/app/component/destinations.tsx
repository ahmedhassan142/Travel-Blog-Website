
"use client"
import React, {  useState } from 'react';
import axios from 'axios';

interface DestinationFormProps {
  onSuccess: () => void;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const[content,setcontent]=useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/destinations', { name, slug,content });
      onSuccess(); // Call onSuccess after successful submission
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Destination Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Slug (e.g., europe)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="border p-2 rounded"
      />
       <input
        type="text"
        placeholder="Content "
        value={content}
        onChange={(e) => setcontent(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
};

export default DestinationForm;