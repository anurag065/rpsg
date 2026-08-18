import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const gldaFacts = [
  { value: '>60%', label: 'Biodegradation in 28 days (OECD 301D) — readily biodegradable' },
  { value: 'Plant', label: 'Derived from renewable, plant-based raw materials' },
  { value: 'GMO-free', label: 'Sourced GMO-free' },
  { value: 'Wide pH', label: 'Effective chelation across a broad pH range' }
];

const stewardship = [
  {
    icon: <path d="M12 3c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10Z"></path>,
    title: 'LEED-Certified, Zero-Discharge R&D',
    desc: "Our Innovation Centre is a LEED-certified, zero-liquid-discharge facility — designed to minimise environmental impact while we develop new chemistries.",
    link: '/rd-laboratory'
  },
  {
    icon: <><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"></path></>,
    title: 'Responsible Care',
    desc: "We participate in Responsible Care — the global chemical industry's framework for continuous improvement in health, safety and environmental performance."
  },
  {
    icon: <><path d="M9 12l2 2 4-4"></path><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6Z"></path></>,
    title: 'REACH Compliance',
    desc: "Our relevant products are managed for compliance with REACH, supporting our customers' regulatory requirements across the EU and beyond."
  }
];

const csrAreas = [
  { title: 'Water', stat: '10,000+', desc: 'Clean water & sanitation access in nearby communities.', image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=400&q=80' },
  { title: 'Environment', stat: '50,000+', desc: 'Tree-planting and green-cover initiatives.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80' },
  { title: 'Education', stat: '5,000+', desc: 'Support for schools and student programmes.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80' },
  { title: 'Health', stat: '15,000+', desc: 'Community health camps and wellbeing programmes.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80' }
];

function SustainabilityPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [greenRef, greenVisible] = useScrollAnimation(0.1);
  const [stewRef, stewVisible] = useScrollAnimation(0.1);
  const [csrRef, csrVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="shero">
        <div className="wrap">
          <div className="shero-g">
            <div className={`shero-l ${isLoaded ? 'animate-left visible' : 'animate-left'}`}>
              <div className="crumb"><Link to="/">Home</Link> / Sustainability</div>
              <div className="eyebrow">Sustainability</div>
              <h1>Advancing Greener Chemistry</h1>
              <p>We're growing a portfolio of biodegradable products and operating responsibly — helping our customers meet rising environmental standards, while being clear-eyed about where our chemistry stands today.</p>
            </div>
            <div className={`shero-r img-zoom ${isLoaded ? 'animate-right visible' : 'animate-right'}`} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img
                className="real-img"
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
                alt="Green forest canopy representing sustainability"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec" ref={greenRef}>
        <div className="wrap">
          <div className={`sec-head ${greenVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Green Chemistry</div>
              <h2>Biodegradable chelates, built as better alternatives</h2>
              <p className="lead">Our GLDA, HEIDA and IDS chelating agents offer biodegradable alternatives to conventional chelants such as EDTA and NTA — without compromising performance.</p>
            </div>
          </div>
          <div className="compare">
            <div className="cmp old">
              <span className="tag">Conventional chelants</span>
              <h3>EDTA & NTA</h3>
              <p>Widely used, but with growing environmental and regulatory concerns:</p>
              <ul>
                <li>EDTA is poorly biodegradable and persistent in the environment</li>
                <li>NTA is classified as a suspected carcinogen</li>
                <li>Increasingly restricted in detergents and discharge limits</li>
              </ul>
            </div>
            <div className="cmp new">
              <span className="tag">APChem green chelates</span>
              <h3>GLDA · HEIDA · IDS</h3>
              <p>Biodegradable chelating agents designed to replace them in modern formulations:</p>
              <ul>
                <li>Readily biodegradable chemistries</li>
                <li>Strong chelation across a wide pH range</li>
                <li>Suited to detergents, personal care and industrial cleaning</li>
              </ul>
            </div>
          </div>
          <div className="facts">
            <div className="facts-h">
              <h3>Spotlight: GLDA</h3>
              <div className="chips">
                <span className="chip">Tetrasodium Glutamate Diacetate</span>
                <span className="chip">CAS 51981-21-6</span>
              </div>
            </div>
            <div className="facts-g">
              {gldaFacts.map((fact, i) => (
                <div key={i} className="fact">
                  <div className="n hf">{fact.value}</div>
                  <div className="l">{fact.label}</div>
                </div>
              ))}
            </div>
            <p className="facts-note">All figures above are verifiable product characteristics for GLDA.</p>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: '#F1F6FB' }} ref={stewRef}>
        <div className="wrap">
          <div className={`sec-head ${stewVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Environmental Stewardship</div>
              <h2>Operating responsibly across our sites</h2>
            </div>
          </div>
          <div className="stew">
            {stewardship.map((item, i) => (
              <div key={i} className={`stewc ${stewVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {item.icon}
                  </svg>
                </div>
                <h3>{item.title}</h3>
                <p>
                  {item.desc}
                  {item.link && <Link to={item.link} style={{ color: '#0F62AE', fontWeight: 500 }}> Learn more →</Link>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="certstrip">
        <div className="wrap certstrip-in">
          <span className="bcert">ISO 14001 · Environment</span>
          <span className="bcert">ISO 45001 · Health & Safety</span>
          <span className="bcert">Responsible Care</span>
          <span className="bcert">REACH</span>
        </div>
      </section>

      <section className="sec" ref={csrRef}>
        <div className="wrap">
          <div className={`sec-head ${csrVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Community · CSR</div>
              <h2>The Aquapharm Foundation</h2>
              <p className="lead">Through the Aquapharm Foundation, we invest in the communities around our operations — across water, environment, education and health.</p>
            </div>
          </div>
          <div className={`csr-intro ${csrVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: '0.1s' }}>
            <div>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#33424d', margin: 0 }}>
                The Aquapharm Foundation works to create positive impact in the communities near our manufacturing facilities.
                Our initiatives focus on improving access to clean water, environmental conservation, educational support, and healthcare services.
              </p>
            </div>
            <div className="csr-img img-zoom" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                className="real-img"
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80"
                alt="Community tree planting initiative"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="csr-g">
            {csrAreas.map((area, i) => (
              <div key={i} className={`csrc ${csrVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                <div className="csrc-img img-zoom" style={{ borderRadius: '6px', overflow: 'hidden' }}>
                  <img className="real-img" src={area.image} alt={area.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="csrc-b">
                  <h4>{area.title}</h4>
                  <div className="stat">{area.stat}</div>
                  <p>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-in">
          <div>
            <h2>Talk to our team about sustainable product options</h2>
            <p>Ask about our biodegradable chelates and lower-impact alternatives for your formulation.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-grn hf" to="/contact">Sales Enquiry</Link>
            <Link className="btn btn-outw hf" to="/products">Explore Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default SustainabilityPage;
