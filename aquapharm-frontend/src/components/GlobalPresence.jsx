import { useScrollAnimation } from '../hooks/useScrollAnimation';

const locations = [
  {
    color: '#23272E',
    title: 'Manufacturing Plants',
    description: 'Mahad & Pirangut (India), Texas (USA), Jeddah (Saudi Arabia)'
  },
  {
    color: '#EA5A1C',
    title: 'Warehouses',
    description: 'Regional stocking points across the Americas, EMEA & Asia-Pacific'
  },
  {
    color: '#EA5A1C',
    title: 'Distributors',
    description: 'Authorized channel partners serving 60+ countries'
  }
];

function GlobalPresence() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <div className={`sec-head ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          <div>
            <div className="kicker">Global Presence</div>
            <h2>Manufactured globally, delivered to 60+ countries</h2>
          </div>
        </div>
        <div className="map-wrap">
          <div className={`map-img img-zoom ${isVisible ? 'animate-left visible' : 'animate-left'}`}>
            <img
              className="real-img"
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80"
              alt="Global world map showing international presence"
              style={{ borderRadius: '6px' }}
            />
          </div>
          <div className={`legend ${isVisible ? 'animate-right visible' : 'animate-right'}`}>
            {locations.map((location, index) => (
              <div
                key={index}
                className="leg-row"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <span className="dot pulsing" style={{ background: location.color }}></span>
                <div>
                  <h4>{location.title}</h4>
                  <p>{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresence;
