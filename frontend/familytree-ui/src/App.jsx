// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <h1> Let there be light!</h1>
//     </>
//   )
// }

// export default App



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminPanel from './components/AdminPanel/AdminPanel';
// import FamilyTree from './components/FamilyTree/FamilyTree';
// import Login from './components/Login/Login';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => {
//   // State for authentication token
//   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

//   // Function to handle login
//   const handleLogin = (token) => {
//     setAuthToken(token);
//     localStorage.setItem('authToken', token); // Persist token in localStorage
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setAuthToken(null);
//     localStorage.removeItem('authToken'); // Remove token from localStorage
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           {/* Public Route for Family Tree */}

//           <Route path="/tree">
//             {console.log('Rendering FamilyTree')}
//             <FamilyTree />
//           </Route>

//           {/* Public Route for Login */}
//           <Route path="/login">
//             <Login onLogin={handleLogin} />
//           </Route>

//           {/* Private Route for Admin Panel */}
//           <PrivateRoute
//             path="/admin"
//             component={AdminPanel}
//             authToken={authToken}
//           />


//           {/* Default Route */}
//           <Route path="/" exact>
//             <h1>Welcome to the Family Tree App</h1>
//             <p>
//               Explore your family lineage and manage your family tree.
//               <a href="/tree"> View Tree </a> or <a href="/login"> Login </a>.
//             </p>
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel/AdminPanel';
import FamilyTree from './components/FamilyTree/FamilyTree';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null
  );

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Route for Family Tree */}
          <Route path="/tree" element={<FamilyTree />} />

          {/* Public Route for Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          

          {/* Private Route for Admin Panel */}
          <Route
            path="/admin"
            element={
              <PrivateRoute
                component={AdminPanel}
                authToken={authToken}
                onLogout={handleLogout}
              />
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to the Family Tree App</h1>
                <p>
                  Explore your family lineage and manage your family tree.{' '}
                  <a href="/tree">View Tree</a> or <a href="/login">Login</a>.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
