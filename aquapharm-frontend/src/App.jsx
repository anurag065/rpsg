import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SustainabilityPage from './pages/SustainabilityPage';
import RDLabPage from './pages/RDLabPage';
import CertificationsPage from './pages/CertificationsPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && <Preloader />}
      <div className="page">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/industries" element={<Placeholder />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/rd-laboratory" element={<RDLabPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/about" element={<Placeholder />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
