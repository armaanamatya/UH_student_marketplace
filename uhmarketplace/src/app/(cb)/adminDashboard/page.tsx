'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Post, User } from '@prisma/client';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchUserRole = async () => {
        try {
          const res = await axios.get('/api/user/role');
          setUserRole(res.data.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };

      const fetchPosts = async () => {
        try {
          const res = await axios.get('/api/admin/posts');
          setPosts(res.data.posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      const fetchUsers = async () => {
        try {
          const res = await axios.get('/api/admin/users');
          setUsers(res.data.users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUserRole();
      fetchPosts();
      fetchUsers();
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (userRole && userRole !== 'ADMIN') {
      router.push('/'); // Redirect non-admin users to the home page
    }
  }, [userRole, router]);

  const deletePost = async (id: number) => {
    try {
      const res = await axios.delete('/api/admin/posts', { data: { id } });

      if (res.status === 200) {
        setPosts(posts.filter((post) => post.id !== id));
        toast.success('Post deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('An error occurred while deleting the post');
    }
  };

  if (!session) {
    return <a href="/login">Sign in</a>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-full">
              {userRole === 'ADMIN' ? (
                <div>
                  <h2 className="text-xl font-semibold">Welcome, Admin</h2>
                  <p className="text-gray-600">Manage users and content here.</p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium">Manage Users</h3>
                    <ul className="mt-2">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <li key={user.id} className="bg-white shadow overflow-hidden rounded-lg mt-2">
                            <div className="px-4 py-5 sm:p-6">
                              <h4 className="text-lg font-medium">{user.name}</h4>
                              <p className="text-gray-600">{user.email}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-center text-gray-600 mt-4">No users found.</p>
                      )}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium">Manage Posts</h3>
                    <ul className="mt-2">
                      {posts.length > 0 ? (
                        posts.map((post) => (
                          <li key={post.id} className="bg-white shadow overflow-hidden rounded-lg mt-2">
                            <div className="px-4 py-5 sm:p-6">
                              <h4 className="text-lg font-medium">{post.title}</h4>
                              <p className="text-gray-600">{post.description}</p>
                              <div className="mt-4">
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded"
                                  onClick={() => deletePost(post.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-center text-gray-600 mt-4">No posts found.</p>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;