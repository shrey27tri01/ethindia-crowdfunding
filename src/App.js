import './App.css';
import DASHBOARD from './Pages/dashboard';
import LOGIN from './Pages/Login';
import LOGOUT from './Pages/Logout';
import SIGNUP from './Pages/Signup';
import FORGOT from './Pages/Forgot';
import RESETPASSWORD from './Pages/ResetPassword';
import UPLOAD from './Pages/Upload';
import MYACTIVITY from './Pages/MyActivity';
import NOTIFICATION from './Pages/Notification';


import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import React, { useState } from "react";
import { AppContext } from "./Lib/contextLib";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    console.log(isAuthenticated);
  return (
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Router>
              <Routes>
                    <Route path="/" element={<DASHBOARD/>}/>
                    <Route path="/login" element={<LOGIN/>}/>
                    <Route path="/logout" element={<LOGOUT/>}/>
                    <Route path="/signup" element={<SIGNUP/>}/>
                    <Route path="/dashboard" element={<DASHBOARD/>}/>
                    <Route path="/myactivity" element={<MYACTIVITY/>}/>
                    <Route path="/notification" element={<NOTIFICATION/>}/>
                    <Route path="/upload" element={<UPLOAD/>}/>
                    <Route path="/forgot" element={<FORGOT/>}/>
                    <Route path="/reset-password/:token" element={<RESETPASSWORD/>}/>
              </Routes>
            </Router>
        </AppContext.Provider>
  );
}

export default App;
