import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CTA() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="cta" ref={ref}>
      <div className="wrap cta-in">
        <div className={isVisible ? 'animate-left visible' : 'animate-left'}>
          <h2>Ready to source? Let's talk chemistry.</h2>
          <p>Request a quote or connect with our technical team to find the right additive for your formulation.</p>
        </div>
        <div className={`cta-btns ${isVisible ? 'animate-right visible' : 'animate-right'}`}>
          <Link className="btn btn-grn hf" to="/contact">Sales Enquiry</Link>
          <Link className="btn btn-outw hf" to="/contact">Talk to a Specialist</Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
