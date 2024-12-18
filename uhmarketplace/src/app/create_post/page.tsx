'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const CreateListing = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price) {
      alert('Title, description, and price are required');
      return;
    }

    try {
      const res = await axios.post('/api/listings', {
        title,
        description,
        price,
        imageUrl
      });

      if (res.status === 201) {
        const newListing = res.data;
        console.log('Listing created:', newListing);
        toast.success('Listing created successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        // Optionally, you can reset the form or redirect the user
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('An error occurred while creating the listing');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border-black">
     <Toaster/>
      <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="text"
            id="imageURL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListing;