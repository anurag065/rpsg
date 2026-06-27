import { Link } from 'react-router-dom';

const quickAccessItems = [
  {
    to: '/products',
    icon: (
      <svg className="qa-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
      </svg>
    ),
    title: 'Find a Product',
    subtitle: 'Browse 275+ products'
  },
  {
    to: '/contact',
    icon: (
      <svg className="qa-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3" width="14" height="18" rx="1.5"></rect>
        <line x1="8.5" y1="8" x2="15.5" y2="8"></line>
        <line x1="8.5" y1="12" x2="15.5" y2="12"></line>
        <line x1="8.5" y1="16" x2="13" y2="16"></line>
      </svg>
    ),
    title: 'Sales Enquiry',
    subtitle: 'Get pricing & samples'
  },
  {
    to: '/products',
    icon: (
      <svg className="qa-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="3" x2="12" y2="15"></line>
        <polyline points="7,11 12,16 17,11"></polyline>
        <line x1="5" y1="20" x2="19" y2="20"></line>
      </svg>
    ),
    title: 'Download SDS / TDS',
    subtitle: 'Datasheets & safety'
  },
  {
    to: '/contact',
    icon: (
      <svg className="qa-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M12 21c4-4.5 7-7.7 7-11a7 7 0 0 0-14 0c0 3.3 3 6.5 7 11Z"></path>
      </svg>
    ),
    title: 'Find a Distributor',
    subtitle: '60+ country network'
  },
  {
    to: '/industries',
    icon: (
      <svg className="qa-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="7" height="7"></rect>
        <rect x="13" y="4" width="7" height="7"></rect>
        <rect x="4" y="13" width="7" height="7"></rect>
        <rect x="13" y="13" width="7" height="7"></rect>
      </svg>
    ),
    title: 'By Industry',
    subtitle: '6 key markets'
  }
];

function QuickAccess() {
  return (
    <section className="qa">
      <div className="wrap">
        <div className="qa-grid">
          {quickAccessItems.map((item, index) => (
            <Link key={index} className="qa-i" to={item.to}>
              {item.icon}
              <b>{item.title}</b>
              <span>{item.subtitle}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickAccess;
