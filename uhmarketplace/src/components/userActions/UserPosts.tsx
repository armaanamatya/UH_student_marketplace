'use client';

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface UserPostsProps {
  userPosts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ userPosts }) => {
  const router = useRouter();
  const deletePost = async (id: number) => {
    console.log('Deleting post:', id);
    try {
      const res = await axios.delete('/api/listings', { data: { id } });

      if (res.status === 200) {
        console.log('Post deleted');
        toast.success('Post deleted successfully');
        router.refresh();
        // Optionally, you can refresh the page or update the state to remove the deleted post
      }
    } catch (error) {
      console.log('Error deleting post:', error);
      toast.error('An error occurred while deleting the post');
    }
  };

  return (
    <ul className="mt-2">
      {userPosts.map((post) => (
        <li key={post.id} className="bg-white shadow overflow-hidden rounded-lg mt-2">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium">{post.title}</h4>
            <p className="text-gray-600">{post.authorEmail}</p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2">
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserPosts;