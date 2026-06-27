import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const whyCards = [
  { icon: <><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"></path></>, title: 'Global Impact', desc: "Our products reach 60+ countries and 250+ corporate clients — your work ships worldwide." },
  { icon: <><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"></path></>, title: 'Innovation & R&D', desc: 'Work alongside our scientists in a LEED-certified Innovation Centre developing next-gen chemistry.' },
  { icon: <><path d="M3 17l6-6 4 4 8-8"></path><path d="M21 7v5h-5"></path></>, title: 'Growth & Learning', desc: 'Clear development paths, mentorship and cross-functional exposure across a growing business.' },
  { icon: <><path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6Z"></path></>, title: 'Backed by RPSG Group', desc: "The stability and scale of one of India's most respected business conglomerates." }
];

const jobs = [
  { title: 'R&D Chemist', location: 'Pune, India', dept: 'R&D', type: 'Full-time' },
  { title: 'Process Engineer', location: 'Mahad, India', dept: 'Operations', type: 'Full-time' },
  { title: 'Regional Sales Manager', location: 'Americas', dept: 'Sales', type: 'Full-time' },
  { title: 'Supply Chain Executive', location: 'Pune, India', dept: 'Operations', type: 'Full-time' },
  { title: 'QA Analyst', location: 'Pirangut, India', dept: 'Operations', type: 'Full-time' }
];

const steps = [
  { num: 1, title: 'Apply', desc: 'Submit your application and resume for a role — or send a general application.' },
  { num: 2, title: 'Interview', desc: 'Meet our team for technical and team-fit conversations.' },
  { num: 3, title: 'Offer', desc: 'Receive a formal offer outlining role, compensation and next steps.' },
  { num: 4, title: 'Onboard', desc: 'Join Aquapharm with structured onboarding and early mentorship.' }
];

const lifeImages = [
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&q=80',
  'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=400&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80'
];

function CareersPage() {
  const [dept, setDept] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [whyRef, whyVisible] = useScrollAnimation(0.1);
  const [lifeRef, lifeVisible] = useScrollAnimation(0.1);
  const [jobsRef, jobsVisible] = useScrollAnimation(0.1);
  const [procRef, procVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="chero">
        <div className="chero-img">
          <img
            className="real-img"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Team collaboration in modern workplace"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="chero-ov"></div>
        <div className="wrap chero-c">
          <div className={`crumb ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}><Link to="/">Home</Link> / Careers</div>
          <div className={`eyebrow ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: '0.1s' }}>Careers at Aquapharm</div>
          <h1 className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.2s' }}>Build Your Career in Chemistry That Matters</h1>
          <p className={isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'} style={{ transitionDelay: '0.3s' }}>Join a 50-year-old global specialty chemical leader — India's largest phosphonate producer, backed by the RP-Sanjiv Goenka Group — and help shape greener, higher-performing chemistry.</p>
          <div className={`chero-btns ${isLoaded ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: '0.4s' }}>
            <a className="btn btn-pri hf" href="#openings">View Open Positions</a>
            <Link className="btn btn-outw hf" to="/contact">Send Your Resume</Link>
          </div>
        </div>
      </section>

      <section className="sec" ref={whyRef}>
        <div className="wrap">
          <div className={`sec-head ${whyVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Why Aquapharm</div>
              <h2>A place to do meaningful work at global scale</h2>
            </div>
          </div>
          <div className="why-g">
            {whyCards.map((card, i) => (
              <div key={i} className={`whyc ${whyVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {card.icon}
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="life" ref={lifeRef}>
        <div className="wrap life-in">
          <div className={`sec-head ${lifeVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Life at Aquapharm</div>
              <h2>Where science, scale and people meet</h2>
            </div>
          </div>
          <div className="life-g">
            {lifeImages.map((img, i) => (
              <div key={i} className={`img-zoom ${i === 0 ? 'big' : ''} ${lifeVisible ? 'animate-scale visible' : 'animate-scale'}`} style={{ transitionDelay: `${i * 0.1}s`, borderRadius: '8px', overflow: 'hidden' }}>
                <img className="real-img" src={img} alt={`Life at Aquapharm ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="openings" ref={jobsRef}>
        <div className="wrap">
          <div className={`jobs-head ${jobsVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <div>
                <div className="kicker">Open Positions</div>
                <h2>Current openings</h2>
              </div>
            </div>
            <div className="deptfilter">
              <span className={`dchip ${dept === 'all' ? 'on' : ''}`} onClick={() => setDept('all')}>All</span>
              <span className={`dchip ${dept === 'rnd' ? 'on' : ''}`} onClick={() => setDept('rnd')}>R&D</span>
              <span className={`dchip ${dept === 'ops' ? 'on' : ''}`} onClick={() => setDept('ops')}>Operations</span>
              <span className={`dchip ${dept === 'sales' ? 'on' : ''}`} onClick={() => setDept('sales')}>Sales</span>
            </div>
          </div>
          <div className={`joblist ${jobsVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: '0.2s' }}>
            {jobs.map((job, i) => (
              <Link key={i} className="job" to="/contact">
                <div className="job-main">
                  <div className="job-t">
                    <h3>{job.title}</h3>
                    <span className="sample">SAMPLE ROLE</span>
                  </div>
                  <div className="job-meta">
                    <span>
                      <svg className="ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21c4-4.5 7-7.7 7-11a7 7 0 0 0-14 0c0 3.3 3 6.5 7 11Z"></path>
                        <circle cx="12" cy="10" r="2.4"></circle>
                      </svg>
                      {job.location}
                    </span>
                    <span>{job.dept}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <span className="job-act hf">View / Apply →</span>
              </Link>
            ))}
          </div>
          <p className="rc" style={{ fontSize: '13px', marginTop: '16px' }}>Roles shown are illustrative samples — live openings will be published here.</p>
        </div>
      </section>

      <section className="sec" style={{ background: '#FAF6F2' }} ref={procRef}>
        <div className="wrap">
          <div className={`sec-head ${procVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Hiring Process</div>
              <h2>How hiring works</h2>
            </div>
          </div>
          <div className="proc">
            {steps.map((step) => (
              <div key={step.num} className={`step ${procVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`} style={{ transitionDelay: `${step.num * 0.1}s` }}>
                <div className="num hf">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-in">
          <div>
            <h2>Don't see your role? Send us your resume.</h2>
            <p>We're always glad to hear from talented people in chemistry, engineering and commercial roles.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-grn hf" to="/contact">Send Your Resume</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CareersPage;
