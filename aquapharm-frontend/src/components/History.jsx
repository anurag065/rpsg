import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* Sourced from apchem.com/about-us — "History of APChem®".
   `metric` surfaces the two numbers worth seeing rather than reading. */
const milestones = [
  {
    year: '1978',
    era: 'The early years',
    title: 'Chemical Manufacturing Exchange is built',
    desc: 'Founded by Larry Gatlin, a pioneer in the oilfield and specialty chemicals market.'
  },
  {
    year: '1980',
    yearNote: '–82',
    title: 'The site takes shape',
    desc: 'The North Tank Farm, the original South Tank Farm, Warehouses A and C, and the Laboratory are constructed. The remaining buildings follow through the 1980s.'
  },
  {
    year: '1985',
    title: 'PChem takes ownership',
    desc: 'The facility keeps trading as Chemical Manufacturing Exchange under PChem ownership, and is formally renamed PChem in 1986.'
  },
  {
    year: '2004',
    era: 'Growth and acquisitions',
    title: 'Syrgis acquires the facility',
    desc: 'Backed by Edgewater Capital Investments.'
  },
  {
    year: '2012',
    title: 'Weatherford doubles the footprint',
    desc: 'Weatherford acquires the site from Syrgis along with the land to the north.',
    metric: { from: '20', to: '40', unit: 'acres' }
  },
  {
    year: '2014',
    title: 'Lubrizol acquires the plant',
    desc: 'Part of The Lubrizol Corporation’s $750 million Engineered Chemistry acquisition.'
  },
  {
    year: '2017',
    title: 'APChem® is born',
    desc: 'On 15 September, APChem acquires the facility from Lubrizol and begins a multi-million-dollar renovation of the plant.',
    metric: { from: '60M', to: '80M+', unit: 'lb / year' },
    key: true
  },
  {
    year: '2024',
    title: 'Part of the RP-Sanjiv Goenka Group',
    desc: 'Aquapharm PChem is acquired by the RP-Sanjiv Goenka Group, putting the resources of a global conglomerate behind the Crockett site.',
    key: true
  }
];

function History() {
  const [ref, isVisible] = useScrollAnimation(0.05);

  return (
    <section className="sec hist" ref={ref}>
      <div className="wrap">
        <div className={`sec-head ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
          <div>
            <div className="kicker">History</div>
            <h2>Four decades on the same 40 acres</h2>
            <p className="lead">
              The plant at Crockett has changed hands five times since 1978 and grown with every
              owner. What has never changed is what it makes.
            </p>
          </div>
        </div>

        <div className="tl">
          <div className="tl-rail" aria-hidden="true"></div>

          {milestones.map((m, i) => (
            <div key={m.year} className="tl-block">
              {m.era && <div className="tl-era"><span>{m.era}</span></div>}

              <article
                className={`tl-item ${m.key ? 'is-key' : ''} ${isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.04 + i * 0.07}s` }}
              >
                <div className="tl-year hf">
                  {m.year}
                  {m.yearNote && <em>{m.yearNote}</em>}
                </div>

                <div className="tl-marker" aria-hidden="true">
                  <span className="tl-node"></span>
                </div>

                <div className="tl-card">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>

                  {m.metric && (
                    <div className="tl-metric">
                      <span className="tl-metric-v">{m.metric.from}</span>
                      <svg width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden="true">
                        <path d="M0 5h22M18 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="tl-metric-v is-to">{m.metric.to}</span>
                      <span className="tl-metric-u">{m.metric.unit}</span>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default History;
