import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* Sourced from apchem.com/about-us — "Current Operations".
   Pin coordinates are positions on the 400x400 stylised globe, not real
   lat/long — they only need to read as plausible and stay inside the sphere. */
const regions = [
  {
    id: 'usa',
    region: 'USA',
    pin: { x: 130, y: 160 },
    home: true,
    sites: [
      { place: 'Crockett, TX', detail: '40-acre manufacturing site', tag: 'Manufacturing' },
      { place: 'The Woodlands, TX', detail: '7,000 sq ft application laboratory', tag: 'Laboratory' }
    ]
  },
  {
    id: 'latam',
    region: 'Latin America',
    pin: { x: 160, y: 266 },
    sites: [
      { place: 'Buenos Aires, Argentina', detail: 'Incoquim S.A.', tag: 'Operations' },
      { place: 'Colombia', detail: 'Regional presence' },
      { place: 'Mexico', detail: 'Regional presence' }
    ]
  },
  {
    id: 'mea',
    region: 'Middle East',
    pin: { x: 247, y: 191 },
    sites: [{ place: 'Muscat, Oman', detail: 'Regional presence' }]
  },
  {
    id: 'asia',
    region: 'Asia',
    pin: { x: 281, y: 206 },
    sites: [
      { place: 'Bhosari, Mahad & Pirangut', detail: 'Aquapharm Chemical Limited, India', tag: 'Manufacturing' }
    ]
  }
];

const HOME = regions[0].pin;

/* Supply lines fan out from Crockett; lift the control point off the
   midpoint so the arcs bow rather than running straight through the sphere. */
function arc(to) {
  const mx = (HOME.x + to.x) / 2;
  const my = (HOME.y + to.y) / 2;
  return `M ${HOME.x} ${HOME.y} Q ${mx} ${my - 46} ${to.x} ${to.y}`;
}

function Operations() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [active, setActive] = useState('usa');

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <div className={`sec-head ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          <div>
            <div className="kicker">Current Operations</div>
            <h2>Four regions, one supply chain</h2>
            <p className="lead">
              Manufacturing in Texas and India, application support beside the Gulf Coast
              petrochemical hub, and regional operations across Latin America and the Middle East.
            </p>
          </div>
        </div>

        <div className={`ops-g ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          {/* ---- Globe ---- */}
          <div className="ops-globe">
            <svg viewBox="0 0 400 400" role="img" aria-label="Globe showing APChem operating regions">
              <defs>
                <radialGradient id="opsSphere" cx="34%" cy="28%" r="78%">
                  <stop offset="0%" stopColor="#1B5FA8" />
                  <stop offset="55%" stopColor="#0C3A6B" />
                  <stop offset="100%" stopColor="#061c33" />
                </radialGradient>
                <radialGradient id="opsHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="rgba(27,168,222,0)" />
                  <stop offset="100%" stopColor="rgba(27,168,222,0.30)" />
                </radialGradient>
                <clipPath id="opsClip">
                  <circle cx="200" cy="200" r="150" />
                </clipPath>
              </defs>

              <circle cx="200" cy="200" r="176" fill="url(#opsHalo)" />
              <circle cx="200" cy="200" r="150" fill="url(#opsSphere)" />

              <g clipPath="url(#opsClip)" className="ops-wire">
                {/* Parallels */}
                {[-105, -70, -35, 0, 35, 70, 105].map((dy) => (
                  <ellipse key={dy} cx="200" cy={200 + dy} rx="150" ry={dy === 0 ? 150 : 18} />
                ))}
                {/* Meridians */}
                {[30, 70, 110, 150].map((rx) => (
                  <ellipse key={rx} cx="200" cy="200" rx={rx} ry="150" />
                ))}
              </g>

              {/* Supply arcs from Crockett */}
              <g className="ops-arcs">
                {regions.slice(1).map((r) => (
                  <path
                    key={r.id}
                    d={arc(r.pin)}
                    className={active === r.id ? 'is-active' : ''}
                  />
                ))}
              </g>

              {/* Pins */}
              <g>
                {regions.map((r) => (
                  <g
                    key={r.id}
                    className={`ops-pin ${active === r.id ? 'is-active' : ''} ${r.home ? 'is-home' : ''}`}
                  >
                    <circle cx={r.pin.x} cy={r.pin.y} r="13" className="ops-pin-halo" />
                    <circle cx={r.pin.x} cy={r.pin.y} r={r.home ? 6 : 5} className="ops-pin-dot" />
                  </g>
                ))}
              </g>
            </svg>

            <div className="ops-globe-cap">
              <b>Crockett, Texas</b>
              <span>Primary manufacturing — everything ships from here</span>
            </div>
          </div>

          {/* ---- Region list ---- */}
          <div className="ops-list">
            {regions.map((r) => (
              <div
                key={r.id}
                className={`ops-card ${active === r.id ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(r.id)}
                onFocus={() => setActive(r.id)}
                tabIndex={0}
              >
                <div className="ops-region">
                  <span className="ops-region-name">{r.region}</span>
                  <span className="ops-region-n">{r.sites.length} {r.sites.length === 1 ? 'site' : 'sites'}</span>
                </div>
                <ul className="ops-sites">
                  {r.sites.map((s) => (
                    <li key={s.place}>
                      <div className="ops-site-top">
                        <b>{s.place}</b>
                        {s.tag && <span className="ops-tag">{s.tag}</span>}
                      </div>
                      <span className="ops-site-detail">{s.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Operations;
