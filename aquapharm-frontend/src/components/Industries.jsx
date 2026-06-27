import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const industries = [
  {
    title: 'Detergents & Cleaning',
    description: 'Phosphonates and chelates for home care and I&I cleaning formulations',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80'
  },
  {
    title: 'Water Treatment',
    description: 'Scale and corrosion inhibitors for industrial water systems',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80'
  },
  {
    title: 'Oil & Gas',
    description: 'Specialty chemicals for drilling, production, and refining operations',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=500&q=80'
  },
  {
    title: 'Textiles & Leather',
    description: 'Sequestrants and processing aids for textile and leather industries',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80'
  },
  {
    title: 'Personal Care',
    description: 'Chelating agents and stabilizers for cosmetic formulations',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80'
  },
  {
    title: 'Industrial Cleaning',
    description: 'High-performance additives for CIP and industrial cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80'
  }
];

function Industries() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <div className={`sec-head ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          <div>
            <div className="kicker">Industries We Serve</div>
            <h2>Chemistry engineered for demanding applications</h2>
          </div>
          <Link className="viewall hf" to="/industries">View all industries →</Link>
        </div>
        <div className="ind-grid">
          {industries.map((industry, index) => (
            <Link
              key={index}
              className={`ind-card gradient-overlay ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              to="/industries"
            >
              <div className="ind-img img-zoom">
                <img className="real-img" src={industry.image} alt={industry.title} />
              </div>
              <div className="ind-b">
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <span className="lmore hf">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
