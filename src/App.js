import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './Form';
import UserProfile from './UserProfile';

const App = () => {
  // Initialize userInfo with default values
  const [userInfo, setUserInfo] = useState({ name: '', bio: '', projects: [] });

  // Load userInfo from local storage on component mount
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Form userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/profile" element={<UserProfile userInfo={userInfo} setUserInfo={setUserInfo} />} />
    </Routes>
  );
};

export default App;
