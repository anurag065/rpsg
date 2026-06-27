import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const tags = ['GLDA', 'HEIDA', 'IDS', 'LEED-certified R&D'];

function Sustainability() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="sus" ref={ref}>
      <div className="wrap">
        <div className="sus-g">
          <div className={`sus-l ${isVisible ? 'animate-left visible' : 'animate-left'}`}>
            <div className="kicker">Sustainability</div>
            <h2>Advancing greener chemistry</h2>
            <p>
              Our biodegradable chelates are readily-biodegradable alternatives to EDTA/NTA,
              developed at our LEED-certified Innovation Centre. We're committed to creating
              sustainable chemistry solutions that minimize environmental impact.
            </p>
            <div className="sus-tags">
              {tags.map((tag, index) => (
                <span key={index} className="sus-tag floating" style={{ animationDelay: `${index * 0.2}s` }}>{tag}</span>
              ))}
            </div>
            <Link className="btn btn-grn hf" to="/sustainability">Explore our sustainability</Link>
          </div>
          <div className={`sus-r img-zoom ${isVisible ? 'animate-right visible' : 'animate-right'}`}>
            <img
              className="real-img"
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
              alt="Green sustainability - forest and nature"
              style={{ borderRadius: '6px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sustainability;
