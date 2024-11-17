// // Auth.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Auth = ({ setAuthToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
//     setAuthToken(response.data.token); // Store token in state or localStorage
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Auth;

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token; // Assume the token is returned in the response
      setAuthToken(token); // Call the setAuthToken function with the token
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const setAuthToken = (token) => {
    // Store the token in the database
    // Example: Make an API call to store the token in the database
    fetch('http://localhost:5000/api/auth/store-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
