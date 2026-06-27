import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const regions = [
  { title: 'India (HQ)', addr: 'Pune, Maharashtra', email: 'india@aquapharm.com' },
  { title: 'Americas', addr: 'Texas, USA', email: 'americas@aquapharm.com' },
  { title: 'Middle East', addr: 'Jeddah, Saudi Arabia', email: 'mea@aquapharm.com' },
  { title: 'Europe', addr: 'Europe Representative Office', email: 'europe@aquapharm.com' }
];

const certs = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'REACH', 'Responsible Care', 'Halal', 'Kosher'];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const [formData, setFormData] = useState({
    products: '',
    grade: '',
    packaging: '',
    quantity: '',
    unit: 'kg',
    destination: '',
    application: '',
    tds: false,
    sds: false,
    coa: false,
    name: '',
    company: '',
    role: '',
    country: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      products: '', grade: '', packaging: '', quantity: '', unit: 'kg',
      destination: '', application: '', tds: false, sds: false, coa: false,
      name: '', company: '', role: '', country: '', email: '', phone: ''
    });
  };

  return (
    <>
      <section className="phead">
        <div className="wrap phead-in">
          <div className={`crumb ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}><Link to="/">Home</Link> / Request a Quote</div>
          <h1 className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.1s' }}>Request a Quote</h1>
          <p className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.2s' }}><span className="dot-g"></span>Our technical team responds within 1 business day.</p>
        </div>
      </section>

      <section className="rfq">
        <div className="wrap">
          <div className="rfq-g">
            <div className="card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="fsec">
                    <div className="fsec-h">
                      <span className="fsec-n">1</span>
                      <h3>Product Requirements</h3>
                    </div>
                    <div className="frow one">
                      <div className="field full">
                        <label>Product(s) of interest <span className="req">*</span></label>
                        <input name="products" placeholder="e.g. HEDP (AQUACID 105EX), GLDA, ATMP…" value={formData.products} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label>Grade</label>
                        <input name="grade" placeholder="e.g. HEDP·60% liquid" value={formData.grade} onChange={handleChange} />
                      </div>
                      <div className="field">
                        <label>Packaging preference</label>
                        <select name="packaging" value={formData.packaging} onChange={handleChange}>
                          <option value="">Select packaging…</option>
                          <option>Drums</option>
                          <option>IBC</option>
                          <option>ISO Tank / Bulk</option>
                          <option>Bags</option>
                          <option>Other / Advise</option>
                        </select>
                      </div>
                    </div>
                    <div className="frow qty">
                      <div className="field">
                        <label>Quantity <span className="req">*</span></label>
                        <input name="quantity" placeholder="e.g. 20" value={formData.quantity} onChange={handleChange} required />
                      </div>
                      <div className="field">
                        <label>Unit</label>
                        <select name="unit" value={formData.unit} onChange={handleChange}>
                          <option>kg</option>
                          <option>MT</option>
                          <option>Litres</option>
                          <option>Drums</option>
                          <option>Containers</option>
                        </select>
                      </div>
                    </div>
                    <div className="frow one">
                      <div className="field full">
                        <label>Destination country <span className="req">*</span></label>
                        <input name="destination" placeholder="Where should we ship / quote to?" value={formData.destination} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="frow one">
                      <div className="field full">
                        <label>Application / use case</label>
                        <textarea name="application" placeholder="Tell us about your formulation or application so we can recommend the right grade…" value={formData.application} onChange={handleChange}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="fsec">
                    <div className="fsec-h">
                      <span className="fsec-n">2</span>
                      <h3>Documents Needed</h3>
                    </div>
                    <div className="docs">
                      <label className="fchk">
                        <input type="checkbox" name="tds" checked={formData.tds} onChange={handleChange} />
                        Technical Data Sheet (TDS)
                      </label>
                      <label className="fchk">
                        <input type="checkbox" name="sds" checked={formData.sds} onChange={handleChange} />
                        Safety Data Sheet (SDS)
                      </label>
                      <label className="fchk">
                        <input type="checkbox" name="coa" checked={formData.coa} onChange={handleChange} />
                        Certificate of Analysis (CoA)
                      </label>
                    </div>
                  </div>

                  <div className="fsec">
                    <div className="fsec-h">
                      <span className="fsec-n">3</span>
                      <h3>Your Details</h3>
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label>Full name <span className="req">*</span></label>
                        <input name="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="field">
                        <label>Company <span className="req">*</span></label>
                        <input name="company" placeholder="Company name" value={formData.company} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label>Role</label>
                        <input name="role" placeholder="e.g. Procurement Manager" value={formData.role} onChange={handleChange} />
                      </div>
                      <div className="field">
                        <label>Country</label>
                        <input name="country" placeholder="Company location" value={formData.country} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label>Work email <span className="req">*</span></label>
                        <input name="email" type="email" placeholder="jane@company.com" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="field">
                        <label>Phone</label>
                        <input name="phone" placeholder="+1 555 000 0000" value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="fsubmit">
                    <p>By submitting, you agree to be contacted by our sales team regarding your enquiry.</p>
                    <button type="submit" className="btn btn-grn hf">Submit Request</button>
                  </div>
                </form>
              ) : (
                <div className="success">
                  <div className="ic">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="5,13 10,18 19,7"></polyline>
                    </svg>
                  </div>
                  <h2>Thank you — request received</h2>
                  <p>Our technical team will review your requirements and respond within 1 business day. A copy has been sent to your email.</p>
                  <button className="btn btn-grn hf" onClick={handleReset}>Submit another request</button>
                </div>
              )}
            </div>

            <aside>
              <div className="sb-img img-zoom" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  className="real-img"
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=600&q=80"
                  alt="Professional customer support team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="sb-card">
                <div className="sb-h">
                  <h3>Talk to us directly</h3>
                  <p>Regional sales & technical contacts</p>
                </div>
                {regions.map((region, i) => (
                  <div key={i} className="reg">
                    <b>{region.title}</b>
                    <div className="addr">{region.addr}</div>
                    <a className="mail" href={`mailto:${region.email}`}>{region.email}</a>
                  </div>
                ))}
              </div>
              <div className="trust">
                <p className="tl">Trusted by 250+ companies worldwide</p>
                <div className="tcerts">
                  {certs.map((cert, i) => (
                    <span key={i} className="tcert">{cert}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
