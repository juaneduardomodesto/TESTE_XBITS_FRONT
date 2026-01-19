import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from './hook/useAuthStore';
import { AuthLayout } from './components/layout/AuthLayout';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CartPage } from './pages/cart/CartPage';
import { CategoriesPage } from './pages/categories/CategoriesPage';
import { CategoryFormPage } from './pages/categories/CategoryPageForm';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { OrderDetailPage } from './pages/orders/OrdersDetailsPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { ProductFormPage } from './pages/products/ProductFormPage';
import { ProductsPage } from './pages/products/ProductsPage';
import { UsersPage } from './pages/users/UserForm';
import { UserFormPage } from './pages/users/UserFormPage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        
        <Route path="/products" element={isAuthenticated ? <ProductsPage /> : <Navigate to="/login" />} />
        <Route path="/products/new" element={isAuthenticated ? <ProductFormPage /> : <Navigate to="/login" />} />
        <Route path="/products/:id/edit" element={isAuthenticated ? <ProductFormPage /> : <Navigate to="/login" />} />
        
        <Route path="/categories" element={isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" />} />
        <Route path="/categories/new" element={isAuthenticated ? <CategoryFormPage /> : <Navigate to="/login" />} />
        <Route path="/categories/:id/edit" element={isAuthenticated ? <CategoryFormPage /> : <Navigate to="/login" />} />
        
        <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
        
        <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/login" />} />
        <Route path="/orders/:id" element={isAuthenticated ? <OrderDetailPage /> : <Navigate to="/login" />} />
        
        <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
        <Route path="/users/new" element={isAuthenticated ? <UserFormPage /> : <Navigate to="/login" />} />
        <Route path="/users/:id/edit" element={isAuthenticated ? <UserFormPage /> : <Navigate to="/login" />} />
      </Route>

      {/* Redirect */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;