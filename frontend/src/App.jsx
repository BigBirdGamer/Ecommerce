import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import  CartPage2 from "./pages/CartPage2";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart/:id/:qty" element={<CartPage />} />
            <Route path="/cart" element={<CartPage2 />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
