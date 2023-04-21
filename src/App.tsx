import React from 'react';
import logo from './logo.svg';
import Color from "./pages/Color"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';



import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>

          <li>
            <Link to="/home">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/colors">
              Colors
            </Link>
          </li>

        </ul>
      </nav>


      <Routes>
        <Route 
          path='/home'
          element={<h1>Bienvenido</h1>}
          />

        <Route 
          path='/colors'
          element={<Color />}
          />

      </Routes>
    </Router>
  );
}

export default App;
