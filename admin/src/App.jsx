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

// Protected Route component
const ProtectedRoute = React.memo(({ children }) => {
    const { admin, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/login" />;
    }

    return children;
});

const App = React.memo(() => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/packages" 
                        element={
                            <ProtectedRoute>
                                <Packages />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/addpackage" 
                        element={
                            <ProtectedRoute>
                                <AddPackages />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/editpackage/:id" 
                        element={
                            <ProtectedRoute>
                                <AddPackages />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="/banners"
                        element={
                            <ProtectedRoute>
                                <BannerList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sections"
                        element={
                            <ProtectedRoute>
                                <SectionList />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
});

export default App; 