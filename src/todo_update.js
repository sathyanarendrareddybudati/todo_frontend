import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./todo_get.css";

const UpdateItem = () => {
  const [items, setItems] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const access_token = localStorage.getItem('access_token');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/todos/', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [access_token]);

  const handleUpdate = async (name) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/todos/?name=${name}`,
        { location: updatedData[name] },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      );
      setUpdatedData('');
      console.log('response:', response);
      window.alert('Item updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Update the item location</h2>
      <div className="item-list">
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Location</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="New Location"
                      value={updatedData[item.name] || ''}
                      onChange={(e) => handleInputChange(e, item.name)}
                    />
                    <button onClick={() => handleUpdate(item.name)}>Update</button>
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

export default UpdateItem;
