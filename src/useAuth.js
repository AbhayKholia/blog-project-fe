
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/admin/check-auth', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setIsAuthenticated(true);
          setIsAdmin(response.data.isAdmin);
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  return { isAuthenticated, isAdmin };
}
