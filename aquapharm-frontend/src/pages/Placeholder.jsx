import { useLocation } from 'react-router-dom';
import CTA from '../components/CTA';

function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Coming Soon</div>
              <h2>{pageName || 'Page'}</h2>
              <p className="lead">
                This page is under construction. Content will be added soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export default Placeholder;
