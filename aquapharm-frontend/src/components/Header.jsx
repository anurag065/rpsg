import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe } from 'lucide-react';
import logo from '../assets/aquapharm_chemicals_pvt_ltd_logo.jpeg';
import rpsgLogo from '../assets/logo-rpsg.jpeg';

/* TODO: wire up real i18n translations at build phase (e.g. react-i18next) */
const languages = [
  { code: 'EN', label: 'English' },
  { code: 'ES', label: 'Español' },
  { code: 'ZH', label: '中文' },
  { code: 'AR', label: 'العربية' },
  { code: 'FR', label: 'Français' },
];

/* Single source of truth — desktop and mobile nav render from this */
const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/rd-laboratory', label: 'R&D Laboratory' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/careers', label: 'Careers' },
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
        {/* Brand lockup: APChem + RPSG */}
        <div className="brand-lockup">
          <Link className="logo" to="/">
            <img className="logo-mk" src={logo} alt="APChem" />
            <span className="logo-wm">
              <span className="logo-tx">APChem<sup className="logo-r">®</sup></span>
              <span className="logo-sub">Aquapharm PChem, LLC</span>
            </span>
          </Link>
          <div className="brand-divider"></div>
          <div className="rpsg-lockup">
            <span className="rpsg-label">Part of</span>
            <img className="rpsg-logo" src={rpsgLogo} alt="RP-Sanjiv Goenka Group" />
          </div>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
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
          <Link className="btn btn-rfq hf" to="/contact">Sales Enquiry</Link>
          <button className="burger" onClick={toggleMenu} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="mnav" style={{ display: menuOpen ? 'block' : 'none' }}>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
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
        <Link className="btn btn-rfq hf" to="/contact" onClick={() => setMenuOpen(false)}>Sales Enquiry</Link>
      </div>
    </header>
  );
}

export default Header;
