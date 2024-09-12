// components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/blogs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };
    fetchBlogs();
  }, [token]);

  const handleCreateBlog = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/blogs', newBlog, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs([...blogs, response.data]);
      setNewBlog({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/blogs/${id}`, updatedBlog, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.map(blog => blog._id === id ? response.data : blog));
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Create New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newBlog.content}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
      />
      <button onClick={handleCreateBlog}>Create Blog</button>

      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button onClick={() => handleUpdateBlog(blog._id, { title: blog.title, content: blog.content })}>Edit</button>
          <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
