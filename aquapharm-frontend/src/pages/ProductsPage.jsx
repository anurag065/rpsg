import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const moleculeImages = [
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&q=80',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&q=80',
  'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=150&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=150&q=80'
];

const products = [
  { id: 'hedp', name: 'HEDP', brand: 'AQUACID 105EX · Etidronic Acid', cas: '2809-21-4', category: 'PHOSPHONATE', tagClass: 'tg-phos', desc: 'Scale & corrosion inhibitor for cooling water, detergents and oilfield.', img: 0 },
  { id: 'atmp', name: 'ATMP', brand: 'Amino Trimethylene Phosphonic Acid', cas: '6419-19-8', category: 'PHOSPHONATE', tagClass: 'tg-phos', desc: 'Scale inhibitor and chelating agent for water treatment systems.', img: 1 },
  { id: 'dtpmp', name: 'DTPMP', brand: 'Diethylenetriamine Penta(methylene…)', cas: '15827-60-8', category: 'PHOSPHONATE', tagClass: 'tg-phos', desc: 'High-performance scale inhibitor and metal-ion sequestrant.', img: 2 },
  { id: 'pbtc', name: 'PBTC', brand: 'Phosphonobutane Tricarboxylic Acid', cas: '37971-36-1', category: 'PHOSPHONATE', tagClass: 'tg-phos', desc: 'Scale inhibitor stable at high temperature and chlorine tolerance.', img: 3 },
  { id: 'hpaa', name: 'HPAA', brand: '2-Hydroxyphosphonoacetic Acid', cas: '23783-26-8', category: 'PHOSPHONATE', tagClass: 'tg-phos', desc: 'Corrosion inhibitor for carbon steel in cooling water.', img: 0 },
  { id: 'glda', name: 'GLDA', brand: 'Tetrasodium Glutamate Diacetate', cas: '51981-21-6', category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', desc: 'Readily biodegradable chelant for detergents and personal care.', img: 1 },
  { id: 'heida', name: 'HEIDA', brand: 'Hydroxyethyl Iminodiacetic Acid', cas: '93-62-9', category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', desc: 'Biodegradable chelating agent for cleaning and industrial use.', img: 2 },
  { id: 'ids', name: 'IDS', brand: 'Tetrasodium Iminodisuccinate', cas: '144538-83-0', category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', desc: 'Readily biodegradable chelant, alternative to EDTA.', img: 3 },
  { id: 'pesa', name: 'PESA', brand: 'Maxinol 600 · Polyepoxysuccinic Acid', cas: '51274-37-4', category: 'POLYMER', tagClass: 'tg-poly', desc: 'Phosphorus-free, biodegradable scale inhibitor and dispersant.', img: 0 },
  { id: 'paa', name: 'Polyacrylate', brand: 'Polyacrylic Acid (PAA)', cas: '9003-01-4', category: 'POLYMER', tagClass: 'tg-poly', desc: 'Dispersant and anti-scalant for water treatment and detergents.', img: 1 },
  { id: 'mbt', name: 'MBT', brand: '2-Mercaptobenzothiazole', cas: '149-30-4', category: 'BIOCIDE', tagClass: 'tg-bio', desc: 'Copper & non-ferrous metal corrosion inhibitor for cooling water.', img: 2 },
  { id: 'acetyl', name: 'Acetyl Chloride', brand: 'Acetyl Chloride', cas: '75-36-5', category: 'DETERGENT ADDITIVE', tagClass: 'tg-add', desc: 'Acetylating intermediate for specialty and detergent synthesis.', img: 3 }
];

const filters = {
  chemistry: ['Phosphonates', 'Biodegradable Chelates', 'Polymers', 'Detergent Additives', 'Biocides'],
  application: ['Detergents', 'Water Treatment', 'Oil & Gas', 'Textiles', 'Personal Care'],
  form: ['Liquid', 'Powder', 'Granule'],
  salt: ['Acid', 'Sodium', 'Potassium', 'Ammonium']
};

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', searchQuery);
  };

  return (
    <>
      <section className="phead">
        <div className="wrap phead-in">
          <div className={`crumb ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}><Link to="/">Home</Link> / Products</div>
          <h1 className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.1s' }}>Our Products</h1>
          <p className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.2s' }}>Explore 275+ specialty chemicals across phosphonates, biodegradable chelates, polymers and detergent additives — search by product name or CAS number.</p>
          <form className={`searchbar ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: '0.3s' }} onSubmit={handleSearch}>
            <input
              placeholder="Search by product name or CAS number…  e.g. HEDP, 2809-21-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hf">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
              </svg>
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="cat">
        <div className="wrap">
          <div className="cat-g">
            {drawerOpen && <div className="drawer-x" onClick={() => setDrawerOpen(false)}></div>}
            <aside className={`side ${drawerOpen ? 'open' : ''}`}>
              <div className="side-h">
                <h3>Filters</h3>
                <span className="side-clear">Clear all</span>
              </div>
              <div className="fgroup">
                <h4>Chemistry</h4>
                {filters.chemistry.map((item, i) => (
                  <label key={i} className="fchk">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
              <div className="fgroup">
                <h4>Application</h4>
                {filters.application.map((item, i) => (
                  <label key={i} className="fchk">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
              <div className="fgroup">
                <h4>Physical Form</h4>
                {filters.form.map((item, i) => (
                  <label key={i} className="fchk">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
              <div className="fgroup">
                <h4>Salt Form</h4>
                {filters.salt.map((item, i) => (
                  <label key={i} className="fchk">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </aside>

            <div className="main">
              <div className="toolbar">
                <div className="rcount">Showing <b>{products.length}</b> products</div>
                <div className="toolbar-r">
                  <button className="filter-btn" onClick={() => setDrawerOpen(true)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="7" y1="12" x2="17" y2="12"></line>
                      <line x1="10" y1="18" x2="14" y2="18"></line>
                    </svg>
                    Filters
                  </button>
                  <div className="sortsel">
                    Sort
                    <select>
                      <option>Relevance</option>
                      <option>Name A–Z</option>
                      <option>Chemistry</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pgrid">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`pcard ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                    style={{ transitionDelay: `${0.1 + (index % 6) * 0.05}s` }}
                  >
                    <div className="pcard-top">
                      <div className="pthumb img-zoom" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                        <img
                          className="real-img"
                          src={moleculeImages[product.img]}
                          alt={product.name}
                          style={{ width: '64px', height: '64px' }}
                        />
                      </div>
                      <div className="pcard-id">
                        <span className={`ptag ${product.tagClass}`}>{product.category}</span>
                        <h3>{product.name}</h3>
                        <div className="brand">{product.brand}</div>
                      </div>
                    </div>
                    <div className="pcard-b">
                      <p>{product.desc}</p>
                      <span className="cas"><span>CAS</span> {product.cas}</span>
                    </div>
                    <div className="pcard-act">
                      <Link to={`/product/${product.id}`}>View details</Link>
                      <Link to={`/product/${product.id}`} className="dl">Download TDS</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
