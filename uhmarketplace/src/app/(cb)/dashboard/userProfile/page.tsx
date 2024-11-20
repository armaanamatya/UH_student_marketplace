'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { prisma } from '../../../../../prisma/prisma';
const AccountPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const router = useRouter();

  const defaultProfilePicUrl = 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=';

  useEffect(() => {
    if (session) {
      setName(session.user?.name || '');
      setProfilePicUrl(session.user?.image || defaultProfilePicUrl);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    try {
      const res = await axios.put('/api/user', {
        name,
        profilePicUrl,
      });

      if (res.status === 200) {
        toast.success('Account updated successfully!');
        router.refresh();
      } else {
        toast.error('Failed to update account.');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('An error occurred while updating the account.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">Update Account Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicUrl" className="block text-gray-700 font-bold mb-2">Profile Picture URL</label>
          <input
            type="text"
            id="profilePicUrl"
            value={profilePicUrl}
            onChange={(e) => setProfilePicUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Update Account</button>
      </form>
    </div>
  );
};

export default AccountPage;