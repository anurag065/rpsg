import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe } from 'lucide-react';
import logo from '../assets/aquapharm_chemicals_pvt_ltd_logo.jpeg';
import rpsgLogo from '../assets/logo-rpsg.jpeg';

/* TODO: wire up real i18n translations at build phase (e.g. react-i18next) */
const languages = [
  { code: 'EN', label: 'English' },
  { code: 'ZH', label: '中文' },
  { code: 'ES', label: 'Español' },
  { code: 'AR', label: 'العربية' },
  { code: 'FR', label: 'Français' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const langRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangSelect = (code) => {
    setCurrentLang(code);
    setLangOpen(false);
    /* TODO: trigger actual language change via i18n library */
  };

  return (
    <header className="hdr">
      {/* Main header row */}
      <div className="hdr-main">
        {/* Brand lockup: Aquapharm + RPSG */}
        <div className="brand-lockup">
          <Link className="logo" to="/">
            <img className="logo-mk" src={logo} alt="Aquapharm Chemical" />
            <span className="logo-tx">AQUAPHARM</span>
          </Link>
          <div className="brand-divider"></div>
          <div className="rpsg-lockup">
            <span className="rpsg-label">Part of</span>
            <img className="rpsg-logo" src={rpsgLogo} alt="RP-Sanjiv Goenka Group" />
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/industries">Industries</NavLink>
          <NavLink to="/sustainability">Sustainability</NavLink>
          <NavLink to="/innovation">Innovation Centre</NavLink>
          <NavLink to="/investors">Investor Relations</NavLink>
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="hdr-r">
          {/* Language Switcher */}
          <div className="lang-switcher" ref={langRef}>
            <button
              className="lang-btn"
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <Globe size={16} strokeWidth={1.5} />
              <span>{currentLang}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                    onClick={() => handleLangSelect(lang.code)}
                  >
                    <span className="lang-code">{lang.code}</span>
                    <span className="lang-label">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link className="btn btn-rfq hf" to="/contact">Request a Quote</Link>
          <button className="burger" onClick={toggleMenu} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="mnav" style={{ display: menuOpen ? 'block' : 'none' }}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/industries" onClick={() => setMenuOpen(false)}>Industries</Link>
        <Link to="/sustainability" onClick={() => setMenuOpen(false)}>Sustainability</Link>
        <Link to="/innovation" onClick={() => setMenuOpen(false)}>Innovation Centre</Link>
        <Link to="/investors" onClick={() => setMenuOpen(false)}>Investor Relations</Link>
        <Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        {/* Mobile Language Selector */}
        <div className="mnav-lang">
          <Globe size={16} strokeWidth={1.5} />
          <span className="mnav-lang-label">Language:</span>
          <div className="mnav-lang-options">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`mnav-lang-btn ${currentLang === lang.code ? 'active' : ''}`}
                onClick={() => handleLangSelect(lang.code)}
              >
                {lang.code}
              </button>
            ))}
          </div>
        </div>
        <Link className="btn btn-rfq hf" to="/contact" onClick={() => setMenuOpen(false)}>Request a Quote</Link>
      </div>
    </header>
  );
}

export default Header;
