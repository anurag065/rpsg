import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Microscope, MapPin } from 'lucide-react';
import crockettAerial from '../assets/crockett-aerial.jpg';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CTA from '../components/CTA';

const stats = [
  { n: '7,000', l: 'sq ft application laboratory, The Woodlands, Texas' },
  { n: '40', l: 'acre specialty chemical plant at Crockett, Texas' },
  { n: '2', l: 'R&D sites — Texas applications and Pune research' },
  { n: '5', l: 'oilfield product lines supported at the bench' }
];

const sites = [
  {
    role: 'Applications & technical service',
    name: 'The Woodlands, Texas',
    where: 'United States · 7,000 sq ft',
    Icon: FlaskConical,
    desc:
      'Our applications laboratory is where a field problem becomes a working formulation. ' +
      'Customer brines, produced water and crude samples are tested against candidate ' +
      'chemistries under the conditions they will actually see downhole — not under ideal ones.',
    tags: ['Formulation', 'Field-sample matching', 'Technical service', 'Troubleshooting']
  },
  {
    role: 'Research & new chemistry',
    name: 'Research & Development Laboratories',
    where: 'Pune, India',
    Icon: Microscope,
    desc:
      'Group R&D develops the molecules and process routes behind the portfolio — synthesis, ' +
      'process chemistry and scale-up. It gives APChem the depth of a multinational research ' +
      'function while the Texas lab stays close to the wellsite.',
    tags: ['Synthesis', 'Process chemistry', 'Scale-up routes', 'Portfolio development']
  }
];

const capabilities = [
  {
    title: 'Fracturing chemicals',
    items: [
      'Crosslink time and pH window',
      'Viscosity against temperature and shear',
      'Breaker schedules and gel-break profile',
      'Foam quality and half-life'
    ]
  },
  {
    title: 'Drilling fluid additives',
    items: [
      'Foamer performance in brine',
      'Corrosion coupon testing',
      'Packer-fluid inhibitor stability',
      'Additive compatibility screening'
    ]
  },
  {
    title: 'Acid additives',
    items: [
      'Inhibitor performance at bottom-hole temperature',
      'Intensifier response and dose optimisation',
      'Iron control and sequestration',
      'Surfactant compatibility in live acid'
    ]
  },
  {
    title: 'Production chemicals',
    items: [
      'Emulsion-breaker bottle tests',
      'Paraffin inhibition by cold finger',
      'Hydrogen sulphide scavenger capacity',
      'Static and dynamic scale inhibition'
    ]
  },
  {
    title: 'Cementing additives',
    items: [
      'Defoamer efficiency in slurry',
      'Slurry compatibility and stability',
      'Additive interaction screening'
    ]
  },
  {
    title: 'Water treatment',
    items: [
      'Threshold scale inhibition',
      'Corrosion rate by coupon and LPR',
      'Dispersancy and deposit control',
      'Chlorine and thermal stability'
    ]
  }
];

const flow = [
  {
    title: 'Send us the conditions',
    desc: 'Water analysis, brine composition, bottom-hole temperature, crude assay — whatever you have. Partial data is fine; we will tell you what else matters.'
  },
  {
    title: 'Bench screening',
    desc: 'Candidate chemistries are screened against your actual fluids rather than a synthetic stand-in, so the shortlist reflects your system.'
  },
  {
    title: 'Field-condition simulation',
    desc: 'The shortlist is confirmed at your temperature, pressure and salinity, with dose response mapped so you know the operating window.'
  },
  {
    title: 'Scale-up and QC',
    desc: 'The approved formulation transfers to Crockett with a QC specification tied to the bench result — what you tested is what ships.'
  }
];

function RDLabPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteRef, siteVisible] = useScrollAnimation(0.1);
  const [capRef, capVisible] = useScrollAnimation(0.1);
  const [flowRef, flowVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="shero">
        <div className="wrap">
          <div className="shero-g">
            <div className={`shero-l ${isLoaded ? 'animate-left visible' : 'animate-left'}`}>
              <div className="crumb"><Link to="/">Home</Link> / R&amp;D Laboratory</div>
              <div className="eyebrow">R&amp;D Laboratory</div>
              <h1>Proven at the bench before it reaches your well.</h1>
              <p>
                APChem runs an applications laboratory in The Woodlands and research laboratories
                in Pune. Between them, a chemistry is developed, tested against your own fluids,
                and handed to the Crockett plant with a specification that matches what you signed off.
              </p>
            </div>
            <div
              className={`shero-r img-zoom ${isLoaded ? 'animate-right visible' : 'animate-right'}`}
              style={{ borderRadius: '12px', overflow: 'hidden' }}
            >
              <img
                className="real-img"
                src={crockettAerial}
                alt="Aerial view of the APChem 40-acre manufacturing site at Crockett, Texas"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec" ref={siteRef}>
        <div className="wrap">
          <div className={`lab-stats ${siteVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            {stats.map((s) => (
              <div key={s.l} className="lab-stat">
                <div className="n hf">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>

          <div
            className={`sec-head ${siteVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
            style={{ marginTop: '56px' }}
          >
            <div>
              <div className="kicker">Two laboratories</div>
              <h2>Research upstream, applications next to the wellsite</h2>
              <p className="lead">
                One site develops the chemistry. The other proves it works in your system. Keeping
                them separate is deliberate — it is what lets a regional operator get multinational
                R&amp;D without multinational lead times.
              </p>
            </div>
          </div>

          <div className="lab-sites">
            {sites.map(({ role, name, where, desc, tags, Icon }, i) => (
              <div
                key={name}
                className={`lab-site ${siteVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="lab-site-top">
                  <span className="lab-site-ic">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="lab-site-role">{role}</span>
                </div>
                <h3>{name}</h3>
                <div className="lab-site-where">
                  <MapPin size={14} strokeWidth={2} />
                  {where}
                </div>
                <p>{desc}</p>
                <div className="lab-site-tags">
                  {tags.map((t) => (
                    <span key={t} className="lab-site-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" ref={capRef}>
        <div className="wrap">
          <div className={`sec-head ${capVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Capabilities</div>
              <h2>What we test, by product line</h2>
              <p className="lead">
                Bench work across the five oilfield lines plus water treatment. If a test you need
                is not listed, ask — much of what the lab runs is built around a specific customer
                problem.
              </p>
            </div>
          </div>

          <div className="cap-grid">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`cap-card ${capVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
              >
                <h3>{c.title}</h3>
                <ul>
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="page-note">
            Capability list drafted from APChem's published product lines and standard industry
            test methods — please confirm against what the laboratory actually offers before this
            page goes live.
          </p>
        </div>
      </section>

      <section className="sec" ref={flowRef}>
        <div className="wrap">
          <div className={`sec-head ${flowVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">How it works</div>
              <h2>From your sample to a specification</h2>
              <p className="lead">
                Four steps, and you are involved at every one. Most enquiries reach a shortlist
                within the first two.
              </p>
            </div>
          </div>

          <div className="flow">
            {flow.map((s, i) => (
              <div
                key={s.title}
                className={`flow-step ${flowVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.05 + i * 0.08}s` }}
              >
                <i>{i + 1}</i>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

export default RDLabPage;
