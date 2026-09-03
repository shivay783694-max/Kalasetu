import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastContainer } from './components/ui/ToastContainer';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { ArtisanLayout } from './components/layout/ArtisanLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Marketplace from './pages/public/Marketplace';
import ProductDetails from './pages/public/ProductDetails';
import About from './pages/public/About';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Artisan Pages
import ArtisanDashboard from './pages/artisan/Dashboard';
import AddProduct from './pages/artisan/AddProduct';
import MyProducts from './pages/artisan/MyProducts';
import Profile from './pages/artisan/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminArtisans from './pages/admin/Artisans';
import AdminProducts from './pages/admin/Products';
import AdminVerification from './pages/admin/Verification';

export default function App() {
  return (
    <LanguageProvider>
      <AppDataProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Route>

        {/* Artisan Routes */}
              <Route path="/artisan" element={<ArtisanLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<ArtisanDashboard />} />
                <Route path="products" element={<MyProducts />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="artisans" element={<AdminArtisans />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="verification" element={<AdminVerification />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ToastProvider>
      </AppDataProvider>
    </LanguageProvider>
  );
}
