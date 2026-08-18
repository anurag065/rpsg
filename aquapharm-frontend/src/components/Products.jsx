import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const products = [
  {
    title: 'Phosphonates',
    description: 'Industry-leading phosphonate products for scale inhibition and metal ion control',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
    brands: ['AQUACID', 'ATMP', 'HEDP']
  },
  {
    title: 'Biodegradable Chelates',
    description: 'Eco-friendly chelating agents - readily biodegradable alternatives to EDTA/NTA',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80',
    brands: ['Maxinol', 'GLDA', 'HEIDA', 'IDS']
  },
  {
    title: 'Polymers',
    description: 'Specialty polymers for dispersant and anti-scaling applications',
    image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=400&q=80',
    brands: ['PAA', 'PCA']
  },
  {
    title: 'Detergent Additives',
    description: 'Performance builders and additives for detergent formulations',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    brands: ['AQUACID', 'Builders']
  }
];

function Products() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="sec" style={{ background: '#F1F6FB' }} ref={ref}>
      <div className="wrap">
        <div className={`sec-head ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          <div>
            <div className="kicker">Product Categories</div>
            <h2>A 275-product portfolio across four core platforms</h2>
          </div>
          <Link className="viewall hf" to="/products">View full catalog →</Link>
        </div>
        <div className="prod-grid">
          {products.map((product, index) => (
            <div
              key={index}
              className={`prod gradient-overlay ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="prod-img img-zoom">
                <img className="real-img" src={product.image} alt={product.title} />
              </div>
              <div className="prod-b">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="brands">
                  {product.brands.map((brand, i) => (
                    <span key={i} className="chip">{brand}</span>
                  ))}
                </div>
                <Link className="lmore hf" to="/products">View products →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
