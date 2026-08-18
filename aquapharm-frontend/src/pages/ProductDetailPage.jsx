import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const applications = [
  { title: 'Scale & Corrosion Inhibition', desc: 'Threshold scale inhibition and corrosion control in recirculating cooling water and boiler systems.' },
  { title: 'Water Treatment', desc: 'Stabilizes metal ions and prevents scale in industrial and municipal water systems.' },
  { title: 'Detergents & Cleaning', desc: 'Sequestrant and bleach stabilizer in laundry, dish and institutional cleaning formulations.' },
  { title: 'Oilfield', desc: 'Scale inhibition for upstream and downstream oil & gas operations.' }
];

const specs = [
  { prop: 'CAS Number', value: '2809-21-4' },
  { prop: 'Molecular Formula', value: 'C2H8O7P2' },
  { prop: 'Molecular Weight', value: '206.03 g/mol' },
  { prop: 'Appearance', value: 'Colorless to pale-yellow liquid' },
  { prop: 'Active Content (as HEDP)', value: '≥60%' },
  { prop: 'Phosphonic Acid (as PO₃³⁻)', value: '≥56%' },
  { prop: 'pH (1% solution)', value: '1.5-2.5' },
  { prop: 'Density (20 °C)', value: '1.40-1.45 g/cm³' },
  { prop: 'Chloride (as Cl⁻)', value: '≤0.01%' },
  { prop: 'Iron (as Fe)', value: '≤0.001%' }
];

const faqs = [
  { q: 'What grades of HEDP are available?', a: 'HEDP is available in HEDP·60% liquid and HEDP·90% solid grades.' },
  { q: 'What is the recommended dosage?', a: 'Typical dosage ranges from 2-20 ppm depending on application. Refer to the TDS for specific guidance.' },
  { q: 'Is HEDP compatible with chlorine?', a: 'HEDP exhibits good chlorine stability, making it suitable for use in chlorinated systems.' }
];

const relatedProducts = [
  { id: 'atmp', name: 'ATMP', cas: '6419-19-8' },
  { id: 'dtpmp', name: 'DTPMP', cas: '15827-60-8' },
  { id: 'pbtc', name: 'PBTC', cas: '37971-36-1' }
];

const moleculeImages = [
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&q=80',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&q=80',
  'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=300&q=80'
];

/* TODO: this page renders HEDP regardless of the :productId route param.
   Wire it to the catalogue in src/data/products.js when the per-product
   specs, FAQs and molecule data are available. */
function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [relatedRef, relatedVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'spec', label: 'Specifications' },
    { id: 'app', label: 'Applications' },
    { id: 'pack', label: 'Packaging' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      <div className="wrap">
        <div className="crumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span> Phosphonates <span>/</span> HEDP
        </div>
      </div>

      <section className="phero">
        <div className="wrap">
          <div className="phero-g">
            <div className={isLoaded ? 'animate-left visible' : 'animate-left'}>
              <span className="ptag">PHOSPHONATE</span>
              <h1>HEDP</h1>
              <div className="brand">AQUACID 105EX</div>
              <div className="syn">Etidronic Acid · 1-Hydroxyethylidene-1,1-diphosphonic acid</div>
              <p className="desc">HEDP is a highly effective scale and corrosion inhibitor with excellent chelating properties. It offers superior performance in water treatment, detergent formulations, and oilfield applications.</p>
              <div className="phero-btns">
                <Link className="btn btn-grn hf" to="/contact">Sales Enquiry</Link>
                <Link className="btn btn-out hf" to="/contact">Request Sample</Link>
              </div>
            </div>
            <div className={`phero-img img-zoom ${isLoaded ? 'animate-scale visible' : 'animate-scale'}`} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img
                className="real-img"
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80"
                alt="HEDP product in laboratory setting"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '8px' }}>
        <div className="kprops">
          <div className="kp"><div className="l">CAS Number</div><div className="v">2809-21-4</div></div>
          <div className="kp"><div className="l">Molecular Formula</div><div className="v">C₂H₈O₇P₂</div></div>
          <div className="kp"><div className="l">Appearance</div><div className="v" style={{ fontSize: '16px' }}>Colorless to pale-yellow liquid</div></div>
          <div className="kp"><div className="l">Active Content</div><div className="v">60%<small>HEDP·60% grade</small></div></div>
        </div>
      </section>

      <section className="pbody">
        <div className="wrap">
          <div className="pbody-g">
            <div>
              <div className="tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'on' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="panel">
                  <h2>Overview</h2>
                  <p>HEDP (1-Hydroxyethylidene-1,1-diphosphonic acid) is a highly effective phosphonate that functions as a scale inhibitor, corrosion inhibitor, and chelating agent. It works through threshold inhibition and crystal modification mechanisms.</p>
                  <h3>Key Benefits</h3>
                  <ul>
                    <li>Excellent scale inhibition at low dosage levels</li>
                    <li>Effective chelation of metal ions with threshold effect</li>
                    <li>Outstanding thermal and chlorine stability</li>
                    <li>Broad application compatibility across industries</li>
                  </ul>
                </div>
              )}

              {activeTab === 'spec' && (
                <div className="panel">
                  <h2>Specifications</h2>
                  <p style={{ marginBottom: '18px' }}>Typical properties for the HEDP·60% grade (AQUACID 105EX). Confirm against the current Technical Data Sheet.</p>
                  <table className="spec">
                    <tbody>
                      {specs.map((row, i) => (
                        <tr key={i}>
                          <td>{row.prop}</td>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'app' && (
                <div className="panel">
                  <h2>Applications</h2>
                  <div className="appg">
                    {applications.map((app, i) => (
                      <div key={i} className="appc">
                        <h4>{app.title}</h4>
                        <p>{app.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pack' && (
                <div className="panel">
                  <h2>Packaging & Storage</h2>
                  <ul>
                    <li>Available in 25kg/30kg drums, 250kg IBC, and bulk ISO tank containers</li>
                    <li>Store in a cool, dry place away from direct sunlight. Shelf life: 24 months</li>
                    <li>Non-hazardous for transport. Handle with standard industrial precautions</li>
                  </ul>
                  <p style={{ marginTop: '8px' }}>Custom packaging and private-label options are available on request — <Link to="/contact" style={{ color: '#0F62AE', fontWeight: 500 }}>contact our team</Link>.</p>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="panel">
                  <h2>Frequently Asked Questions</h2>
                  {faqs.map((faq, i) => (
                    <div key={i} className="faq-i">
                      <h4>{faq.q}</h4>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                  <div className="faq-i">
                    <h4>How do I request a Certificate of Analysis?</h4>
                    <p>A batch-specific CoA is available on request with your order — use the downloads panel or <Link to="/contact" style={{ color: '#0F62AE', fontWeight: 500 }}>request a quote</Link>.</p>
                  </div>
                </div>
              )}
            </div>

            <aside>
              <div className="dl-panel">
                <div className="dl-h">
                  <h3>Documents</h3>
                  <p>Datasheets & safety documents</p>
                </div>
                <a className="dl-row">
                  <span className="dl-ic">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 2h8l4 4v16H6z"></path>
                      <line x1="14" y1="2" x2="14" y2="6"></line>
                      <line x1="18" y1="6" x2="14" y2="6"></line>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
                  </span>
                  <span className="t">
                    <b>Technical Data Sheet</b>
                    <span>TDS · PDF</span>
                  </span>
                  <span className="ar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="4" x2="12" y2="15"></line>
                      <polyline points="7,11 12,16 17,11"></polyline>
                      <line x1="6" y1="20" x2="18" y2="20"></line>
                    </svg>
                  </span>
                </a>
                <a className="dl-row">
                  <span className="dl-ic">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 2h8l4 4v16H6z"></path>
                      <line x1="14" y1="2" x2="14" y2="6"></line>
                      <line x1="18" y1="6" x2="14" y2="6"></line>
                      <path d="M12 11v5"></path>
                      <circle cx="12" cy="18.5" r=".6"></circle>
                    </svg>
                  </span>
                  <span className="t">
                    <b>Safety Data Sheet</b>
                    <span>SDS · PDF</span>
                  </span>
                  <span className="ar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="4" x2="12" y2="15"></line>
                      <polyline points="7,11 12,16 17,11"></polyline>
                      <line x1="6" y1="20" x2="18" y2="20"></line>
                    </svg>
                  </span>
                </a>
                <a className="dl-row">
                  <span className="dl-ic">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 2h8l4 4v16H6z"></path>
                      <line x1="14" y1="2" x2="14" y2="6"></line>
                      <line x1="18" y1="6" x2="14" y2="6"></line>
                      <polyline points="9,15 11,17 15,12"></polyline>
                    </svg>
                  </span>
                  <span className="t">
                    <b>Certificate of Analysis</b>
                    <span>CoA · On request</span>
                  </span>
                  <span className="ar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="13,6 19,12 13,18"></polyline>
                    </svg>
                  </span>
                </a>
                <div className="dl-cta">
                  <Link className="btn btn-grn hf" to="/contact">Sales Enquiry</Link>
                  <p className="dl-note">Technical team responds within 1 business day.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="wrap" ref={relatedRef}>
        <div className="related">
          <h2 className={relatedVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}>Related Products</h2>
          <div className="rel-g">
            {relatedProducts.map((product, index) => (
              <Link key={product.id} className={`relc ${relatedVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: `${0.1 + index * 0.1}s` }} to={`/product/${product.id}`}>
                <div className="pthumb img-zoom" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                  <img
                    className="real-img"
                    src={moleculeImages[index]}
                    alt={product.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <span className="rtag">PHOSPHONATE</span>
                  <h3>{product.name}</h3>
                  <div className="cas">CAS {product.cas}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetailPage;
