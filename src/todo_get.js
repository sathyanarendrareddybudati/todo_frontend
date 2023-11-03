import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./todo_get.css";
import { Navigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/todos/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setItems(response.data);
    } catch (error) {
      // Handle token expiration
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await axios.post('http://127.0.0.1:8000/token/refresh/', {
            refresh_token: localStorage.getItem('refresh_token'),
          });
          localStorage.setItem('access_token', refreshResponse.data.access_token);
          // Retry fetching data with the new access token
          const retryResponse = await axios.get('http://127.0.0.1:8000/todos/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
          });
          setItems(retryResponse.data);
        } catch (refreshError) {
          navigate('/login')
          setError(refreshError);
        }
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Getting all items</h2>
      <div className="item-list">
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ItemList;