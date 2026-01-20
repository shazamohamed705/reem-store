import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx/Nvbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ProductLanding from './components/Product/ProductLanding';
import ProductGallery from './components/Product/ProductGallery';
import ProductShoes from './components/Product/ProductShoes';
import ProductBags from './components/Product/ProductBags';
import ProductClothes from './components/Product/ProductClothes';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function AppContent() {
  const [activeCollection, setActiveCollection] = useState('default');
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const handleOpenItem = (item) => {
    // Determine which page to open based on item name
    const itemName = item?.name?.toLowerCase() || '';
    
    if (itemName.includes('shoes') || itemName.includes('shoe')) {
      navigate('/shoes');
    } else if (itemName.includes('bag') || itemName.includes('handbag') || itemName.includes('wallet') || itemName.includes('trolley')) {
      navigate('/bags');
    } else {
      // Default to clothes for other items
      navigate('/clothes');
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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

