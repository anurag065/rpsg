import { Link } from 'react-router-dom';
import logo from '../assets/aquapharm_chemicals_pvt_ltd_logo.jpeg';

const companyLinks = [
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/innovation', label: 'Innovation Centre' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/about', label: 'About Us' }
];

const quickLinks = [
  { to: '/investors', label: 'Investor Relations' },
  { to: '/careers', label: 'Careers' },
  { to: '/sustainability', label: 'CSR' },
  { to: '/contact', label: 'Contact' },
  { to: '/contact', label: 'Sales Enquiry' }
];

const offices = [
  { title: 'India (HQ)', location: 'Pune, Maharashtra · Plants: Mahad & Pirangut' },
  { title: 'United States', location: 'Texas' },
  { title: 'Saudi Arabia', location: 'Jeddah' }
];

const certifications = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'REACH', 'Responsible Care', 'Halal', 'Kosher'];

function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-logo">
            <Link className="logo" to="/">
              <img className="logo-mk" src={logo} alt="Aquapharm Chemical" />
              <span className="logo-tx">AQUAPHARM</span>
            </Link>
            <p className="ft-blurb">
              Global specialty chemical manufacturer since 1974. India's largest phosphonate
              producer, part of the RP-Sanjiv Goenka Group.
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
            <p>&copy; 2026 Aquapharm Chemical Limited. All rights reserved.</p>
          </div>
          <div className="em">
            <a href="mailto:info@aquapharm.com">info@aquapharm.com</a>
            <a href="mailto:sales@aquapharm.com">sales@aquapharm.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
