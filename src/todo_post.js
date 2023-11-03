import React, { useState } from 'react';
import axios from 'axios';
import './todo_post.css';
import { useNavigate } from 'react-router-dom';


const PostItems = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!name || !location) {
      alert('Item name and location are required.');
      return;
    }

    const access_token = localStorage.getItem('access_token');
    console.log('Access Token:', access_token);

    try {
      await axios.post(
        'http://127.0.0.1:8000/todos/',
        {
          name: name,
          location: location,
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      );

      setName('');
      setLocation('');

      window.alert('Item posted successfully!');
    } catch (error) {
      navigate('/login')
      console.error('Post Error:', error);
    }
  };

  return (
    <div className="post-data">
      <div className="input">
        <h2>Add the items</h2>
        <div className='items'>
          <input
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='items'>
          <input
            type="text"
            placeholder="Enter location name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='items'>
          <button onClick={handlePost}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default PostItems;