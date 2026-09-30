import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// أعلى App.js
import { AuthProvider } from './Context/AuthContext';
import MetaPixel from './components/MetaPixel';
import SEO from './components/SEO';

import Navbar from './components/Navbar.jsx/Nvbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ProductPage from './components/Product/ProductPage';
import ProductShoes from './components/Product/ProductShoes';
import ProductBags from './components/Product/ProductBags';
import ProductClothes from './components/Product/ProductClothes';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PageContent from './components/Pages/PageContent';
import ContactPage from './components/Pages/ContactPage';

function AppContent() {
  const [activeCollection, setActiveCollection] = useState('default');
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const handleOpenItem = (item) => {
    // Navigate to product page with product ID
    if (item && item.id) {
      navigate(`/product/${item.id}`);
    }
  };

  const handleBackHome = () => {
    setActiveCollection('default');
    navigate('/');
  };

  const handleOpenShoes = () => {
    navigate('/shoes');
  };

  const handleOpenBags = () => {
    navigate('/bags');
  };

  const handleOpenClothes = () => {
    navigate('/clothes');
  };

  return (
    <div className="bg-white">
      <SEO pageKey="home" />
      <Routes location={background || location}>
        <Route path="/" element={
          <>
            <Navbar
              activeCollection={activeCollection}
              onSelectCollection={setActiveCollection}
            />
            <Home
              activeCollection={activeCollection}
              onOpenItem={handleOpenItem}
            />
            <Footer 
              activeCollection={activeCollection}
              onSelectCollection={setActiveCollection}
            />
          </>
        } />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/shoes" element={
          <ProductShoes 
            onBack={handleBackHome}
            onOpenShoes={handleOpenShoes}
            onOpenBags={handleOpenBags}
            onOpenClothes={handleOpenClothes}
          />
        } />
        <Route path="/bags" element={
          <ProductBags 
            onBack={handleBackHome}
            onOpenShoes={handleOpenShoes}
            onOpenBags={handleOpenBags}
            onOpenClothes={handleOpenClothes}
          />
        } />
        <Route path="/clothes" element={
          <ProductClothes 
            onBack={handleBackHome}
            onOpenShoes={handleOpenShoes}
            onOpenBags={handleOpenBags}
            onOpenClothes={handleOpenClothes}
          />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/page/contact" element={<ContactPage />} />
        <Route path="/page/:pageKey" element={<PageContent />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <MetaPixel />
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

