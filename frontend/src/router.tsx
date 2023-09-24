import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import App from './App';
import WebcamStream from './components/WebStream';

function Routing() {
    return (
      <Router>
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<Main  />} />
                <Route path="game" element={<WebcamStream />}/>
            </Route>
        </Routes>
      </Router>
    );
  }
  
  export default Routing;