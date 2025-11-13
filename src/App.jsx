import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

import AppLayout from "./layouts/appLayout";
import Login from "./pages/Login";
import Home from "./pages/home";
import Calculator from "./pages/calculator";
import Animation from "./pages/animation";
import Components from "./pages/component";
import ToDoListPage from "./pages/ToDoPage";
import Product from "./pages/Product";
import Carts from "./pages/Carts";
import ForWardToHome from "./pages/forwardToHome";
import './App.css'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />; // ยังไม่ล็อกอิน → Login
  if (role && user.role !== role) return <Navigate to="/home" />; // Role ไม่ตรง → Home
  return children;
}

function App() {
  return (
    <BrowserRouter basename="/csi205">
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* หน้า Login */}
            <Route path="/login" element={<Login />} />

            {/* Layout ที่มี Navbar */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
              <Route path="/animation" element={<ProtectedRoute><Animation /></ProtectedRoute>} />
              <Route path="/components" element={<ProtectedRoute><Components /></ProtectedRoute>} />
              <Route path="/todolist" element={<ProtectedRoute><ToDoListPage /></ProtectedRoute>} />
              <Route path="/product" element={
                <ProtectedRoute role="user">
                  <Product />
                </ProtectedRoute>
              } />
              <Route path="/carts" element={
                <ProtectedRoute role="user">
                  <Carts />
                </ProtectedRoute>
              } />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Catch All */}
              <Route path="*" element={<ForWardToHome />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
