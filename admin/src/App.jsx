import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddPackages from './components/packages/addpackages';
import Packages from './components/packages/packages';
import BannerList from './components/banner/BannerList';
import SectionList from './components/section/SectionList';
import EnquiryList from './components/enquiry/EnquiryList';

// Protected Route component
function ProtectedRoute({ children }) {
    const { admin, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!admin) return <Navigate to="/login" />;
    return children;
}

const protectedRoutes = [
    {
        path: '/dashboard',
        element: (
            <Layout>
                <Dashboard />
            </Layout>
        ),
    },
    { path: '/packages', element: <Packages /> },
    { path: '/addpackage', element: <AddPackages /> },
    { path: '/editpackage/:id', element: <AddPackages /> },
    { path: '/banners', element: <BannerList /> },
    { path: '/sections', element: <SectionList /> },
    { path: '/enquiries', element: <EnquiryList /> },
];

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {protectedRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ProtectedRoute>{element}</ProtectedRoute>}
                        />
                    ))}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
            <ToastContainer hideProgressBar/>
        </AuthProvider>
    );
}

export default App; 