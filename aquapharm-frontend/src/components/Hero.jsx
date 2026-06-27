import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';
import { X, ArrowLeft, Search } from 'lucide-react';

// Mock product data for search
const mockProducts = [
  {
    id: 1,
    name: 'HEDP / AQUACID 105EX',
    category: 'Phosphonate',
    cas: '2809-21-4',
    application: 'Scale & corrosion inhibition',
    industries: ['Water Treatment', 'Oil & Gas']
  },
  {
    id: 2,
    name: 'ATMP / AQUACID 108EX',
    category: 'Phosphonate',
    cas: '6419-19-8',
    application: 'Water treatment, metal cleaning',
    industries: ['Water Treatment', 'Industrial Cleaning']
  },
  {
    id: 3,
    name: 'DTPMP',
    category: 'Phosphonate',
    cas: '15827-60-8',
    application: 'Detergents, peroxide stabilization',
    industries: ['Detergents', 'Textile']
  },
  {
    id: 4,
    name: 'PBTC',
    category: 'Phosphonate',
    cas: '37971-36-1',
    application: 'Cooling water treatment',
    industries: ['Water Treatment', 'HVAC']
  },
  {
    id: 5,
    name: 'GLDA',
    category: 'Biodegradable Chelate',
    cas: '51981-21-6',
    application: 'Personal care, cleaning products',
    industries: ['Personal Care', 'Home Care']
  },
  {
    id: 6,
    name: 'IDS (Tetrasodium Iminodisuccinate)',
    category: 'Biodegradable Chelate',
    cas: '144538-83-0',
    application: 'Detergents, industrial cleaning',
    industries: ['Detergents', 'Industrial Cleaning']
  },
  {
    id: 7,
    name: 'PESA / Maxinol 600',
    category: 'Polymer',
    cas: '51274-37-4',
    application: 'Water treatment, scale inhibition',
    industries: ['Water Treatment', 'Oil & Gas']
  },
  {
    id: 8,
    name: 'MBT (Mercaptobenzothiazole)',
    category: 'Corrosion Inhibitor',
    cas: '149-30-4',
    application: 'Metal protection, antifreeze',
    industries: ['Automotive', 'Metalworking']
  }
];

function Hero() {
  const [searchType, setSearchType] = useState('Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const videoRef = useRef(null);
  const searchInputRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    setIsLoaded(true);
    if (prefersReducedMotion) {
      setHeadlineComplete(true);
    }
  }, [prefersReducedMotion]);

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setVideoLoaded(true);
      video.addEventListener('canplay', handleCanPlay);
      if (video.readyState >= 3) {
        setVideoLoaded(true);
      }
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  // Lock body scroll when in search mode
  useEffect(() => {
    if (searchMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchMode]);

  // Focus input when entering search mode
  useEffect(() => {
    if (searchMode && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchMode]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && searchMode) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [searchMode]);

  const handleHeadlineComplete = () => {
    setHeadlineComplete(true);
  };

  const filterProducts = (query) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    return mockProducts.filter(product => {
      const matchesName = product.name.toLowerCase().includes(lowerQuery);
      const matchesCas = product.cas.toLowerCase().includes(lowerQuery);
      const matchesApplication = product.application.toLowerCase().includes(lowerQuery);
      const matchesCategory = product.category.toLowerCase().includes(lowerQuery);
      const matchesIndustry = product.industries.some(ind =>
        ind.toLowerCase().includes(lowerQuery)
      );

      if (searchType === 'Industries') {
        return matchesIndustry || matchesApplication;
      }

      return matchesName || matchesCas || matchesApplication || matchesCategory;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = filterProducts(searchQuery);
      setSearchResults(results);
      setSearchMode(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Live filtering when in search mode
    if (searchMode && value.trim()) {
      const results = filterProducts(value);
      setSearchResults(results);
    } else if (searchMode && !value.trim()) {
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Phosphonate': '#7B2D7E',
      'Biodegradable Chelate': '#2E7D32',
      'Polymer': '#1565C0',
      'Corrosion Inhibitor': '#EF6C00'
    };
    return colors[category] || '#5B6770';
  };

  return (
    <>
      <section className={`hero ${searchMode ? 'search-mode-active' : ''}`}>
        {/* Video background with blur */}
        <div className="hero-video-container" aria-hidden="true">
          {!prefersReducedMotion ? (
            <video
              ref={videoRef}
              className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/assets/hero-bg.mp4" type="video/mp4" />
            </video>
          ) : null}
          <div className={`hero-video-fallback ${videoLoaded && !prefersReducedMotion ? 'hidden' : ''}`}></div>
        </div>

        {/* Warm overlay for text readability */}
        <div className="hero-overlay" aria-hidden="true"></div>

        <div className="wrap">
          <div className="hero-content">
            <div className={`eyebrow ${isLoaded ? 'fade-in visible' : 'fade-in'}`}>
              Specialty Chemicals · Since 1974
            </div>

            <SplitText
              text="Specialty Chemistry for a Sustainable World"
              className="hero-headline hf"
              tag="h1"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="left"
              onLetterAnimationComplete={handleHeadlineComplete}
            />

            <p className={`sub sub-wide ${headlineComplete ? 'fade-up-delay visible' : 'fade-up-delay'}`}>
              India's largest phosphonate producer — 275+ products serving 250+ clients
              across 60+ countries, backed by the RP-Sanjiv Goenka Group.
            </p>

            <div className={`hero-btns ${headlineComplete ? 'fade-up-delay visible delay-1' : 'fade-up-delay'}`}>
              <Link className="btn btn-pri hf" to="/products">Explore Products</Link>
              <Link className="btn btn-out hf" to="/contact">Request a Quote</Link>
            </div>

            <div className={`qsearch ${headlineComplete ? 'fade-up-delay visible delay-2' : 'fade-up-delay'}`}>
              <div className="ql">Find what you need fast</div>
              <form className="qs-row" onSubmit={handleSearch}>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option>Products</option>
                  <option>Industries</option>
                  <option>SDS / TDS</option>
                </select>
                <div className="qs-input-wrap">
                  <input
                    placeholder="Search by name, CAS no. or application…"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="qs-go" type="submit" aria-label="Search">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Search Mode */}
      <div className={`search-fullscreen ${searchMode ? 'active' : ''} ${prefersReducedMotion ? 'no-motion' : ''}`}>
        <div className="search-fullscreen-header">
          <div className="wrap">
            <div className="search-fullscreen-bar">
              <button
                className="search-back-btn"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <ArrowLeft size={20} />
              </button>

              <form className="search-fullscreen-form" onSubmit={(e) => e.preventDefault()}>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="search-fullscreen-select"
                >
                  <option>Products</option>
                  <option>Industries</option>
                  <option>SDS / TDS</option>
                </select>
                <div className="search-fullscreen-input-wrap">
                  <Search size={18} className="search-fullscreen-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by name, CAS no. or application…"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-fullscreen-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-fullscreen-clear"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </form>

              <button
                className="search-close-btn"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        </div>

        <div className="search-fullscreen-body">
          <div className="wrap">
            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div className="search-fullscreen-results">
                  <div className="search-results-info">
                    <span className="search-results-count">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </span>
                  </div>
                  <div className="search-results-grid">
                    {searchResults.map((product) => (
                      <div key={product.id} className="search-result-card">
                        <div className="search-result-card-header">
                          <span
                            className="search-result-tag"
                            style={{ backgroundColor: `${getCategoryColor(product.category)}15`, color: getCategoryColor(product.category) }}
                          >
                            {product.category}
                          </span>
                          <span className="search-result-cas">CAS: {product.cas}</span>
                        </div>
                        <h3 className="search-result-name">{product.name}</h3>
                        <p className="search-result-app">{product.application}</p>
                        <div className="search-result-industries">
                          {product.industries.map((ind, idx) => (
                            <span key={idx} className="search-result-industry">{ind}</span>
                          ))}
                        </div>
                        <div className="search-result-actions">
                          <Link
                            to={`/product/${product.id}`}
                            className="search-result-btn view"
                            onClick={closeSearch}
                          >
                            View Details
                          </Link>
                          <Link
                            to="/contact"
                            className="search-result-btn quote"
                            onClick={closeSearch}
                          >
                            Request Quote
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="search-no-results">
                  <div className="search-no-results-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <h3 className="search-no-results-title">No results found</h3>
                  <p className="search-no-results-text">
                    We couldn't find any products matching "{searchQuery}"
                  </p>
                  <p className="search-no-results-hint">
                    Try searching for a product name, CAS number, or application
                  </p>
                </div>
              )
            ) : (
              <div className="search-empty-state">
                <div className="search-empty-icon">
                  <Search size={48} />
                </div>
                <h3 className="search-empty-title">Search our products</h3>
                <p className="search-empty-text">
                  Enter a product name, CAS number, or application to find what you need
                </p>
                <div className="search-suggestions">
                  <span className="search-suggestions-label">Try:</span>
                  {['HEDP', 'Phosphonate', 'Water treatment', '2809-21-4'].map((term) => (
                    <button
                      key={term}
                      className="search-suggestion"
                      onClick={() => {
                        setSearchQuery(term);
                        setSearchResults(filterProducts(term));
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
