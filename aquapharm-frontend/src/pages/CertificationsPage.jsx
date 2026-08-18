import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, FileText, Leaf, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CTA from '../components/CTA';

/* Certificates are hosted on apchem.com — link to the source of truth
   rather than mirroring PDFs that would drift out of date here. */
const certificates = [
  {
    std: 'ISO 9001',
    name: 'Quality management systems',
    governs:
      'How the plant plans, controls and records production — from raw material acceptance through to release of finished goods.',
    means:
      'The batch you qualify is the batch you keep receiving. Deviations are traceable, and corrective action is a documented process rather than a promise.',
    href: 'https://www.apchem.com/s/ISO-9001-Aquapharm-PChem-LLC-Exp-1232029.pdf',
    Icon: ShieldCheck
  },
  {
    std: 'ISO 14001',
    name: 'Environmental management systems',
    governs:
      'Identification and control of environmental impacts across the Crockett site — emissions, effluent, waste streams and resource use.',
    means:
      'Supports your own scope 3 and supplier-screening requirements, and evidences environmental due diligence in tender submissions.',
    href: 'https://www.apchem.com/s/ISO-14001-Aquapharm-PChem-LLC-Exp-1232029.pdf',
    Icon: Leaf
  },
  {
    std: 'ISO 45001',
    name: 'Occupational health and safety',
    governs:
      'Hazard identification, risk control and worker participation in health and safety across manufacturing operations.',
    means:
      'A prerequisite for most operator and EPC vendor-approval processes, and a signal that site safety is managed systematically.',
    href: 'https://www.apchem.com/s/ISO-45001-Aquapharm-PChem-LLC-Exp-1232029.pdf',
    Icon: Award
  }
];

const documents = [
  { label: 'Technical Data Sheet', note: 'Specification, typical properties and handling guidance for a given grade.' },
  { label: 'Safety Data Sheet', note: 'GHS-format SDS covering hazards, exposure controls and transport classification.' },
  { label: 'Certificate of Analysis', note: 'Batch-specific analytical results against the agreed specification.' },
  { label: 'Regulatory statements', note: 'Compliance and registration confirmations for your destination market.' }
];

function CertificationsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [certRef, certVisible] = useScrollAnimation(0.1);
  const [ecoRef, ecoVisible] = useScrollAnimation(0.1);
  const [docRef, docVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="shero">
        <div className="wrap">
          <div className="shero-g">
            <div className={`shero-l ${isLoaded ? 'animate-left visible' : 'animate-left'}`}>
              <div className="crumb"><Link to="/">Home</Link> / Certifications</div>
              <div className="eyebrow">Certifications</div>
              <h1>Audited, certified, and happy to show the paperwork.</h1>
              <p>
                Aquapharm PChem, LLC operates under three certified management systems covering
                quality, environment and occupational safety, and is rated by EcoVadis. Every
                certificate below links to the current document — no summaries, no screenshots.
              </p>
            </div>
            <div
              className={`shero-r img-zoom ${isLoaded ? 'animate-right visible' : 'animate-right'}`}
              style={{ borderRadius: '12px', overflow: 'hidden' }}
            >
              <img
                className="real-img"
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
                alt="Audit documentation and quality records"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec" ref={certRef}>
        <div className="wrap">
          <div className={`sec-head ${certVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Management systems</div>
              <h2>Three standards, and what each one buys you</h2>
              <p className="lead">
                Most suppliers show you a wall of logos. These are the certificates themselves,
                with a plain account of what the standard governs and why it matters to a buyer.
              </p>
            </div>
          </div>

          <div className="cert-grid">
            {certificates.map(({ std, name, governs, means, href, Icon }, i) => (
              <div
                key={std}
                className={`cert-card ${certVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.05 + i * 0.1}s` }}
              >
                <span className="cert-seal">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <div className="cert-std hf">{std}</div>
                <div className="cert-name">{name}</div>
                <dl>
                  <dt>What it governs</dt>
                  <dd>{governs}</dd>
                  <dt>What it means for you</dt>
                  <dd>{means}</dd>
                </dl>
                <div className="cert-holder">
                  Certificate holder
                  <b>Aquapharm PChem, LLC</b>
                  <span className="cert-valid">Valid until 23 January 2029</span>
                </div>
                <a className="cert-link" href={href} target="_blank" rel="noopener noreferrer">
                  <FileText size={15} strokeWidth={2} />
                  View certificate
                  <ExternalLink size={13} strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" ref={ecoRef}>
        <div className="wrap">
          <div className={`eco ${ecoVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div className="eco-seal">
              <span>ECOVADIS</span>
            </div>
            <div className="eco-tx">
              <h3>EcoVadis rated, 2026</h3>
              <p>
                EcoVadis assesses suppliers across environment, labour and human rights, ethics
                and sustainable procurement. Our rating can be shared directly with your
                procurement team to satisfy supplier-sustainability screening — ask for it with
                your enquiry and we will include it in the response.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" ref={docRef}>
        <div className="wrap">
          <div className={`sec-head ${docVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}>
            <div>
              <div className="kicker">Documentation</div>
              <h2>Product documents, on request</h2>
              <p className="lead">
                Product-level paperwork is issued per grade and per batch rather than published,
                so it always matches what you actually receive. Tick what you need on a sales
                enquiry and it comes back with the quote.
              </p>
            </div>
          </div>

          <div className="doc-grid">
            {documents.map((d, i) => (
              <div
                key={d.label}
                className={`doc-card ${docVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'}`}
                style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
              >
                <FileText size={20} strokeWidth={1.8} />
                <b>{d.label}</b>
                <span>{d.note}</span>
              </div>
            ))}
          </div>

          <p className="page-note">
            Certificate links and the 23 January 2029 expiry are taken from the live documents on
            apchem.com. The buyer-benefit copy is drafted — worth a read-through by quality before
            this goes live, and we should confirm whether Responsible Care and REACH should also
            be listed for the US entity.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}

export default CertificationsPage;
