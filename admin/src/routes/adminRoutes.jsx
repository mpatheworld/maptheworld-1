import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import BannerPage from '../pages/BannerPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/banners" element={<BannerPage />} />
    </Routes>
  );
};

export default AdminRoutes; 