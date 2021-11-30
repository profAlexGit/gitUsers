import React from 'react';
import {Users} from './features/user/Users';
import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import './App.css';
import {UserInformation} from "./features/user/UserInformation";

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path='/' element={<Users />} />
                  <Route path='/user' element={<UserInformation />}/>
              </Routes>
          </div>
      </Router>


  );
}

export default App;
