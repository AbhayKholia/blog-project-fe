import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard. You are logged in!</p>
    </div>
  );
};

export default Dashboard;
