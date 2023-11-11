import React from 'react';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ResetPassword from './Components/ResetPassword';
import { Route, Routes } from 'react-router-dom';
import SetNewPassword from './Components/setNewPassword';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/forget-pass" element={<ResetPassword />} />
        <Route path="/reset" element={<SetNewPassword />} />
      </Routes>
    </div>
  );
};

export default App;