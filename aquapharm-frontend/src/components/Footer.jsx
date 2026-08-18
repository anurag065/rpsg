import { Link } from 'react-router-dom';
import logo from '../assets/aquapharm_chemicals_pvt_ltd_logo.jpeg';

const companyLinks = [
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/rd-laboratory', label: 'R&D Laboratory' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/about', label: 'About Us' }
];

const quickLinks = [
  { to: '/certifications', label: 'Certifications' },
  { to: '/careers', label: 'Careers' },
  { to: '/sustainability', label: 'CSR' },
  { to: '/contact', label: 'Contact' },
  { to: '/contact', label: 'Sales Enquiry' }
];

const offices = [
  { title: 'United States (HQ)', location: 'Crockett, TX · 40-acre manufacturing site' },
  { title: 'Application Laboratory', location: 'The Woodlands, TX · 7,000 sq ft' },
  { title: 'Latin America', location: 'Buenos Aires · Bogotá · Mexico City' },
  { title: 'Asia & Middle East', location: 'Pune, India · Muscat, Oman' }
];

const certifications = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'EcoVadis 2026'];

function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-logo">
            <Link className="logo" to="/">
              <img className="logo-mk" src={logo} alt="APChem" />
              <span className="logo-wm">
                <span className="logo-tx">APChem<sup className="logo-r">®</sup></span>
                <span className="logo-sub">Aquapharm PChem, LLC</span>
              </span>
            </Link>
            <p className="ft-blurb">
              Oilfield and water treatment chemistry manufactured in Crockett, Texas
              since 1978. Part of the RP-Sanjiv Goenka Group.
            </p>
          </div>
          <div>
            <h5>Company</h5>
            <div className="ft-links">
              {companyLinks.map((link, index) => (
                <Link key={index} to={link.to}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h5>Quick Links</h5>
            <div className="ft-links">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.to}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h5>Global Offices</h5>
            {offices.map((office, index) => (
              <div key={index} className="off">
                <b>{office.title}</b>
                <span>{office.location}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="certs">
          {certifications.map((cert, index) => (
            <span key={index} className="cert">{cert}</span>
          ))}
        </div>
        <div className="ft-bot">
          <div className="l">
            <span className="rpsg">RPSG GROUP</span>
            <p>&copy; 2026 Aquapharm PChem, LLC. All rights reserved.</p>
          </div>
          <div className="em">
            <a href="mailto:info@apchem.com">info@apchem.com</a>
            <a href="tel:+13462374300">(346) 237-4300</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
