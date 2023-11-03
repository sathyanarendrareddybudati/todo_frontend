import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./todo_get.css";
import { useNavigate } from 'react-router-dom';

const DeleteItem = () => {
  const [items, setItems] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const refreshToken = localStorage.getItem('refresh_token');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/todos/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setItems(response.data);
    } catch (error) {
      // Handle unauthorized error here and refresh the access token
      if (error.response.status === 401) {
        try {
          const refreshResponse = await axios.post('http://localhost:8000/token/refresh/', {
            refresh_token: refreshToken,
          });
          const newAccessToken = refreshResponse.data.access_token;
          setAccessToken(newAccessToken);
          localStorage.setItem('access_token', newAccessToken);

          // Retry the API request with the new access token
          const response = await axios.get('http://127.0.0.1:8000/todos/', {
            headers: {
              'Authorization': `Bearer ${newAccessToken}`,
            }
          });
          setItems(response.data);
        } catch (refreshError) {
          
          console.error('Error refreshing access token:', refreshError);
          // Handle refresh token error (e.g., redirect to login page)
        }
      } else {
        console.error('Error:', error);
      }
    }
  }, [accessToken, refreshToken]);

  const handleDelete = async (name) => {
    try {
      await axios.delete('http://127.0.0.1:8000/todos/', {
        params: {
          name: name
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      fetchData();
      window.alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Delete the items</h2>
      <div className="item-list">
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>
                    <button onClick={() => handleDelete(item.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DeleteItem;
