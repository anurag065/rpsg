import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle, Beaker, Check, ChevronLeft, ChevronRight, Clock, FileText,
  Handshake, Loader2, Mail, MapPin, Phone, Send, ShieldCheck, X,
} from 'lucide-react';
import { searchProducts, categoryColor } from '../data/products';

const STEPS = ['Requirement', 'Specification', 'Contact'];

const enquiryTypes = [
  { id: 'quote', label: 'Request a quote', Icon: FileText },
  { id: 'sample', label: 'Request a sample', Icon: Beaker },
  { id: 'technical', label: 'Technical support', Icon: ShieldCheck },
  { id: 'partner', label: 'Distribution', Icon: Handshake },
];

const documents = [
  { id: 'tds', label: 'TDS', note: 'Technical Data Sheet' },
  { id: 'sds', label: 'SDS', note: 'Safety Data Sheet' },
  { id: 'coa', label: 'CoA', note: 'Certificate of Analysis' },
  { id: 'reach', label: 'Regulatory', note: 'REACH / compliance' },
];

const contacts = [
  { title: 'Crockett, TX — Manufacturing', addr: '3985 U.S. 287, Crockett, TX 75835', Icon: MapPin },
  { title: 'Sales & technical', addr: 'info@apchem.com', href: 'mailto:info@apchem.com', Icon: Mail },
  { title: 'Direct line', addr: '(346) 237-4300', href: 'tel:+13462374300', Icon: Phone },
];

const certs = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'EcoVadis 2026'];

const emptyForm = {
  type: 'quote',
  products: [],
  application: '',
  grade: '',
  packaging: '',
  quantity: '',
  unit: 'MT',
  frequency: '',
  incoterm: '',
  destination: '',
  needBy: '',
  docs: [],
  name: '',
  company: '',
  role: '',
  country: '',
  email: '',
  phone: '',
  notes: '',
  consent: false,
};

/* Required fields per step — drives both validation and the completion meter */
const required = {
  0: ['products'],
  1: ['quantity', 'destination'],
  2: ['name', 'company', 'email', 'consent'],
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function validate(step, form) {
  const errs = {};
  if (step === 0 && form.products.length === 0) {
    errs.products = 'Add at least one product so we can quote accurately.';
  }
  if (step === 1) {
    if (!form.quantity.trim()) errs.quantity = 'Tell us roughly how much you need.';
    else if (!/\d/.test(form.quantity)) errs.quantity = 'Include a number, e.g. 20.';
    if (!form.destination.trim()) errs.destination = 'We quote landed cost, so we need a destination.';
  }
  if (step === 2) {
    if (!form.name.trim()) errs.name = 'Please tell us who to reply to.';
    if (!form.company.trim()) errs.company = 'Company name is required.';
    if (!form.email.trim()) errs.email = 'A work email is required.';
    else if (!isEmail(form.email)) errs.email = 'That email address looks incomplete.';
    if (!form.consent) errs.consent = 'Please confirm before submitting.';
  }
  return errs;
}

/* ---------------- Product token picker ---------------- */
function ProductPicker({ selected, onChange, invalid }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const matches = useMemo(() => {
    const chosen = new Set(selected.map((s) => s.id));
    return searchProducts(query).filter((p) => !chosen.has(p.id));
  }, [query, selected]);

  useEffect(() => setCursor(0), [query]);

  // Close the menu on an outside click
  useEffect(() => {
    const onDocDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const add = useCallback(
    (product) => {
      onChange([...selected, product]);
      setQuery('');
      setOpen(false);
      inputRef.current?.focus();
    },
    [selected, onChange]
  );

  const addCustom = useCallback(() => {
    const label = query.trim();
    if (!label) return;
    add({ id: `custom:${label.toLowerCase()}`, name: label, category: 'CUSTOM', custom: true });
  }, [query, add]);

  const remove = (id) => onChange(selected.filter((p) => p.id !== id));

  const onKeyDown = (e) => {
    if (e.key === 'Backspace' && !query && selected.length) {
      remove(selected[selected.length - 1].id);
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setCursor((c) => Math.min(c + 1, Math.max(matches.length - 1, 0)));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matches[cursor]) add(matches[cursor]);
      else addCustom();
    }
  };

  const showMenu = open && focused && query.trim().length > 0;

  return (
    <div className="enq-picker-wrap" ref={wrapRef}>
      <div
        className={`enq-picker ${focused ? 'is-focus' : ''} ${invalid ? 'has-error' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((p) => {
          const color = p.custom ? '#55677A' : categoryColor(p.category);
          return (
            <span
              key={p.id}
              className="enq-chip"
              style={{ background: `${color}18`, color }}
            >
              {p.name}
              <button
                type="button"
                className="enq-chip-x"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(p.id);
                }}
                aria-label={`Remove ${p.name}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={selected.length ? 'Add another…' : 'Search by product, CAS number or application…'}
          aria-label="Search products"
          aria-invalid={invalid || undefined}
        />
      </div>

      {showMenu && (
        <div className="enq-menu" role="listbox">
          {matches.map((p, i) => (
            <button
              type="button"
              key={p.id}
              role="option"
              aria-selected={i === cursor}
              className={`enq-menu-item ${i === cursor ? 'is-cursor' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => add(p)}
            >
              <span className="enq-menu-dot" style={{ background: categoryColor(p.category) }} />
              <span className="enq-menu-txt">
                <b>{p.name}</b>
                <span>{p.brand}</span>
              </span>
              <span className="enq-menu-cas">{p.cas}</span>
            </button>
          ))}
          {matches.length === 0 && (
            <div className="enq-menu-empty">
              No catalogue match.{' '}
              <button type="button" className="enq-menu-add" onClick={addCustom}>
                Add “<b>{query.trim()}</b>” anyway
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */
function ContactPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState('');
  const cardRef = useRef(null);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === 'checkbox' ? checked : value);
  };

  const toggleDoc = (id) =>
    set('docs', form.docs.includes(id) ? form.docs.filter((d) => d !== id) : [...form.docs, id]);

  // Completion across every required field, not just the current step
  const completion = useMemo(() => {
    const all = [...required[0], ...required[1], ...required[2]];
    const done = all.filter((k) => {
      const v = form[k];
      return Array.isArray(v) ? v.length > 0 : Boolean(typeof v === 'string' ? v.trim() : v);
    });
    return Math.round((done.length / all.length) * 100);
  }, [form]);

  const goTo = (next) => {
    setStep(next);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    goTo(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(2, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    /* TODO: POST to the CRM/sales endpoint once the backend exists */
    setTimeout(() => {
      setReference(`APC-${new Date().getFullYear()}-${Date.now().toString(36).slice(-5).toUpperCase()}`);
      setSending(false);
    }, 900);
  };

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setStep(0);
    setReference('');
  };

  const typeLabel = enquiryTypes.find((t) => t.id === form.type)?.label || '—';
  const volume = [form.quantity, form.quantity && form.unit, form.frequency]
    .filter(Boolean)
    .join(' ');
  const shipTo = [form.destination, form.incoterm].filter(Boolean).join(' · ');
  const docLabels = documents.filter((d) => form.docs.includes(d.id)).map((d) => d.label);

  return (
    <>
      <section className="enq-head">
        <svg className="enq-head-lattice" aria-hidden="true">
          <defs>
            <pattern id="enqHex" width="56" height="97" patternUnits="userSpaceOnUse">
              <path
                d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L56 80 M28 64 L0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enqHex)" />
        </svg>

        <div className="wrap">
          <div className="enq-crumb">
            <Link to="/">Home</Link> / Sales Enquiry
          </div>
          <h1>Tell us what you need.</h1>
          <p className="enq-lede">
            Three short steps. Our technical sales team reviews every enquiry personally and
            comes back with grades, packaging and landed pricing — not an auto-reply.
          </p>
          <div className="enq-assure">
            <span><Clock size={15} strokeWidth={2} />Reply within 1 business day</span>
            <span><Beaker size={15} strokeWidth={2} />Samples available on request</span>
            <span><ShieldCheck size={15} strokeWidth={2} />NDA on request</span>
          </div>
        </div>
      </section>

      <section className="enq">
        <div className="wrap">
          <div className="enq-g">
            <div className="enq-main" ref={cardRef}>
              <div className="enq-card">
                {reference ? (
                  <div className="enq-done">
                    <div className="enq-done-ic">
                      <Check size={32} strokeWidth={2.6} />
                    </div>
                    <h2>Enquiry received</h2>
                    <p>
                      Thanks {form.name.split(' ')[0]} — your enquiry is with our technical sales
                      team. A copy is on its way to {form.email}.
                    </p>
                    <div className="enq-ref">
                      Reference <b>{reference}</b>
                    </div>

                    <div className="enq-next">
                      <div className="enq-next-step">
                        <i>1</i>
                        <b>Technical review</b>
                        <span>We match your application to the right grade and concentration.</span>
                      </div>
                      <div className="enq-next-step">
                        <i>2</i>
                        <b>Commercial offer</b>
                        <span>Pricing, packaging and lead time for your destination.</span>
                      </div>
                      <div className="enq-next-step">
                        <i>3</i>
                        <b>Samples & documents</b>
                        <span>Any TDS, SDS or CoA you asked for, plus samples where relevant.</span>
                      </div>
                    </div>

                    <div className="enq-done-actions">
                      <button className="enq-btn enq-btn-pri" onClick={handleReset}>
                        Submit another enquiry
                      </button>
                      <Link className="enq-btn enq-btn-gho" to="/products">
                        Back to products
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="enq-steps">
                      {STEPS.map((label, i) => (
                        <button
                          type="button"
                          key={label}
                          className={`enq-step ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}
                          onClick={() => i < step && goTo(i)}
                          disabled={i >= step}
                        >
                          <span className="enq-step-node">
                            {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                          </span>
                          <span className="enq-step-label">{label}</span>
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="enq-body">
                        {step === 0 && (
                          <>
                            <div className="enq-legend">
                              <h2>What can we help with?</h2>
                              <p>Pick the products you are interested in — search by name, CAS number or application.</p>
                            </div>

                            <div className="enq-block">
                              <span className="enq-label">Type of enquiry</span>
                              <div className="enq-seg">
                                {enquiryTypes.map(({ id, label, Icon }) => (
                                  <button
                                    type="button"
                                    key={id}
                                    className={form.type === id ? 'is-on' : ''}
                                    onClick={() => set('type', id)}
                                    aria-pressed={form.type === id}
                                  >
                                    <Icon size={19} strokeWidth={1.8} />
                                    <b>{label}</b>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="enq-block">
                              <span className="enq-label">
                                Products of interest <span className="enq-req">*</span>
                              </span>
                              <ProductPicker
                                selected={form.products}
                                onChange={(v) => set('products', v)}
                                invalid={Boolean(errors.products)}
                              />
                              {errors.products ? (
                                <div className="enq-err">
                                  <AlertCircle size={14} strokeWidth={2.2} />
                                  {errors.products}
                                </div>
                              ) : (
                                <div className="enq-hint">
                                  Not sure which grade? Add the closest match — our team will advise.
                                </div>
                              )}
                            </div>

                            <div className="enq-row one">
                              <div className="enq-field">
                                <label htmlFor="application">
                                  Application or use case <span className="enq-opt">optional</span>
                                </label>
                                <textarea
                                  id="application"
                                  name="application"
                                  value={form.application}
                                  onChange={handleChange}
                                  placeholder="Tell us about your formulation, system or water chemistry so we can recommend the right grade…"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <div className="enq-legend">
                              <h2>Volume and logistics</h2>
                              <p>Enough detail to price it properly. Estimates are fine — nothing here is binding.</p>
                            </div>

                            <div className="enq-row">
                              <div className="enq-field">
                                <label htmlFor="grade">
                                  Grade or concentration <span className="enq-opt">optional</span>
                                </label>
                                <input
                                  id="grade"
                                  name="grade"
                                  value={form.grade}
                                  onChange={handleChange}
                                  placeholder="e.g. HEDP 60% liquid"
                                />
                              </div>
                              <div className="enq-field">
                                <label htmlFor="packaging">
                                  Packaging <span className="enq-opt">optional</span>
                                </label>
                                <select id="packaging" name="packaging" value={form.packaging} onChange={handleChange}>
                                  <option value="">Advise me</option>
                                  <option>Drums (200 – 250 kg)</option>
                                  <option>IBC totes (1,000 – 1,250 kg)</option>
                                  <option>ISO tank / bulk</option>
                                  <option>Bags (25 kg)</option>
                                </select>
                              </div>
                            </div>

                            <div className="enq-row qty">
                              <div className={`enq-field ${errors.quantity ? 'has-error' : ''}`}>
                                <label htmlFor="quantity">
                                  Quantity <span className="enq-req">*</span>
                                </label>
                                <input
                                  id="quantity"
                                  name="quantity"
                                  value={form.quantity}
                                  onChange={handleChange}
                                  placeholder="e.g. 20"
                                  aria-invalid={Boolean(errors.quantity)}
                                />
                                {errors.quantity && (
                                  <div className="enq-err">
                                    <AlertCircle size={14} strokeWidth={2.2} />
                                    {errors.quantity}
                                  </div>
                                )}
                              </div>
                              <div className="enq-field">
                                <label htmlFor="unit">Unit</label>
                                <select id="unit" name="unit" value={form.unit} onChange={handleChange}>
                                  <option>MT</option>
                                  <option>kg</option>
                                  <option>Litres</option>
                                  <option>Drums</option>
                                  <option>Containers</option>
                                </select>
                              </div>
                              <div className="enq-field">
                                <label htmlFor="frequency">
                                  Frequency <span className="enq-opt">optional</span>
                                </label>
                                <select id="frequency" name="frequency" value={form.frequency} onChange={handleChange}>
                                  <option value="">One-off</option>
                                  <option>per month</option>
                                  <option>per quarter</option>
                                  <option>per year</option>
                                </select>
                              </div>
                            </div>

                            <div className="enq-row">
                              <div className={`enq-field ${errors.destination ? 'has-error' : ''}`}>
                                <label htmlFor="destination">
                                  Destination <span className="enq-req">*</span>
                                </label>
                                <input
                                  id="destination"
                                  name="destination"
                                  value={form.destination}
                                  onChange={handleChange}
                                  placeholder="Port, city or country"
                                  aria-invalid={Boolean(errors.destination)}
                                />
                                {errors.destination && (
                                  <div className="enq-err">
                                    <AlertCircle size={14} strokeWidth={2.2} />
                                    {errors.destination}
                                  </div>
                                )}
                              </div>
                              <div className="enq-field">
                                <label htmlFor="incoterm">
                                  Incoterm <span className="enq-opt">optional</span>
                                </label>
                                <select id="incoterm" name="incoterm" value={form.incoterm} onChange={handleChange}>
                                  <option value="">Advise me</option>
                                  <option>EXW</option>
                                  <option>FOB</option>
                                  <option>CFR</option>
                                  <option>CIF</option>
                                  <option>DAP</option>
                                  <option>DDP</option>
                                </select>
                              </div>
                            </div>

                            <div className="enq-row one">
                              <div className="enq-field">
                                <label htmlFor="needBy">
                                  Needed by <span className="enq-opt">optional</span>
                                </label>
                                <input
                                  id="needBy"
                                  name="needBy"
                                  type="date"
                                  value={form.needBy}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="enq-block">
                              <span className="enq-label">
                                Documents to include <span className="enq-opt">optional</span>
                              </span>
                              <div className="enq-tiles">
                                {documents.map((d) => (
                                  <label key={d.id} className={`enq-tile ${form.docs.includes(d.id) ? 'is-on' : ''}`}>
                                    <input
                                      type="checkbox"
                                      checked={form.docs.includes(d.id)}
                                      onChange={() => toggleDoc(d.id)}
                                    />
                                    {form.docs.includes(d.id) ? (
                                      <Check size={17} strokeWidth={2.4} />
                                    ) : (
                                      <FileText size={17} strokeWidth={1.8} />
                                    )}
                                    <span className="enq-tile-txt">
                                      <b>{d.label}</b>
                                      <span>{d.note}</span>
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <div className="enq-legend">
                              <h2>Where should we send it?</h2>
                              <p>A named contact means we can route your enquiry to the right specialist first time.</p>
                            </div>

                            <div className="enq-row">
                              <div className={`enq-field ${errors.name ? 'has-error' : ''}`}>
                                <label htmlFor="name">
                                  Full name <span className="enq-req">*</span>
                                </label>
                                <input
                                  id="name"
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  placeholder="Jane Doe"
                                  autoComplete="name"
                                  aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && (
                                  <div className="enq-err">
                                    <AlertCircle size={14} strokeWidth={2.2} />
                                    {errors.name}
                                  </div>
                                )}
                              </div>
                              <div className={`enq-field ${errors.company ? 'has-error' : ''}`}>
                                <label htmlFor="company">
                                  Company <span className="enq-req">*</span>
                                </label>
                                <input
                                  id="company"
                                  name="company"
                                  value={form.company}
                                  onChange={handleChange}
                                  placeholder="Company name"
                                  autoComplete="organization"
                                  aria-invalid={Boolean(errors.company)}
                                />
                                {errors.company && (
                                  <div className="enq-err">
                                    <AlertCircle size={14} strokeWidth={2.2} />
                                    {errors.company}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="enq-row">
                              <div className="enq-field">
                                <label htmlFor="role">
                                  Role <span className="enq-opt">optional</span>
                                </label>
                                <input
                                  id="role"
                                  name="role"
                                  value={form.role}
                                  onChange={handleChange}
                                  placeholder="e.g. Procurement Manager"
                                  autoComplete="organization-title"
                                />
                              </div>
                              <div className="enq-field">
                                <label htmlFor="country">
                                  Country <span className="enq-opt">optional</span>
                                </label>
                                <input
                                  id="country"
                                  name="country"
                                  value={form.country}
                                  onChange={handleChange}
                                  placeholder="Company location"
                                  autoComplete="country-name"
                                />
                              </div>
                            </div>

                            <div className="enq-row">
                              <div className={`enq-field ${errors.email ? 'has-error' : ''}`}>
                                <label htmlFor="email">
                                  Work email <span className="enq-req">*</span>
                                </label>
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={form.email}
                                  onChange={handleChange}
                                  placeholder="jane@company.com"
                                  autoComplete="email"
                                  aria-invalid={Boolean(errors.email)}
                                />
                                {errors.email && (
                                  <div className="enq-err">
                                    <AlertCircle size={14} strokeWidth={2.2} />
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                              <div className="enq-field">
                                <label htmlFor="phone">
                                  Phone <span className="enq-opt">optional</span>
                                </label>
                                <input
                                  id="phone"
                                  name="phone"
                                  value={form.phone}
                                  onChange={handleChange}
                                  placeholder="+1 555 000 0000"
                                  autoComplete="tel"
                                />
                              </div>
                            </div>

                            <div className="enq-row one">
                              <div className="enq-field">
                                <label htmlFor="notes">
                                  Anything else <span className="enq-opt">optional</span>
                                </label>
                                <textarea
                                  id="notes"
                                  name="notes"
                                  value={form.notes}
                                  onChange={handleChange}
                                  placeholder="Existing supplier, target price, tender deadline, compliance requirements…"
                                />
                              </div>
                            </div>

                            <div className="enq-block">
                              <label className={`enq-consent ${errors.consent ? 'has-error' : ''}`}>
                                <input
                                  type="checkbox"
                                  name="consent"
                                  checked={form.consent}
                                  onChange={handleChange}
                                />
                                <span>
                                  I agree to be contacted by the APChem sales team about this
                                  enquiry. We will not share your details with anyone else.
                                </span>
                              </label>
                              {errors.consent && (
                                <div className="enq-err">
                                  <AlertCircle size={14} strokeWidth={2.2} />
                                  {errors.consent}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="enq-actions">
                        <span className="enq-count">
                          Step {step + 1} of {STEPS.length}
                        </span>
                        <div className="enq-actions-r">
                          {step > 0 && (
                            <button type="button" className="enq-btn enq-btn-gho" onClick={() => goTo(step - 1)}>
                              <ChevronLeft size={17} strokeWidth={2.2} />
                              Back
                            </button>
                          )}
                          {step < STEPS.length - 1 ? (
                            <button type="button" className="enq-btn enq-btn-pri" onClick={handleNext}>
                              Continue
                              <ChevronRight size={17} strokeWidth={2.2} />
                            </button>
                          ) : (
                            <button type="submit" className="enq-btn enq-btn-pri" disabled={sending}>
                              {sending ? (
                                <>
                                  <Loader2 size={16} strokeWidth={2.4} className="enq-spin-ic" />
                                  Sending…
                                </>
                              ) : (
                                <>
                                  <Send size={16} strokeWidth={2.2} />
                                  Submit enquiry
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            <aside className="enq-rail">
              <div className="enq-sum">
                <div className="enq-sum-h">
                  <h3>Your enquiry</h3>
                  <span className="enq-sum-pct">{completion}% complete</span>
                </div>
                <dl className="enq-sum-b">
                  <div className="enq-sum-row">
                    <dt>Type</dt>
                    <dd>{typeLabel}</dd>
                  </div>
                  <div className="enq-sum-row">
                    <dt>Products</dt>
                    <dd className={form.products.length ? '' : 'is-empty'}>
                      {form.products.length ? (
                        <span className="enq-sum-chips">
                          {form.products.map((p) => {
                            const color = p.custom ? '#55677A' : categoryColor(p.category);
                            return (
                              <span
                                key={p.id}
                                className="enq-sum-chip"
                                style={{ background: `${color}18`, color }}
                              >
                                {p.name}
                              </span>
                            );
                          })}
                        </span>
                      ) : (
                        'Nothing selected yet'
                      )}
                    </dd>
                  </div>
                  <div className="enq-sum-row">
                    <dt>Volume</dt>
                    <dd className={volume ? '' : 'is-empty'}>{volume || 'Not specified'}</dd>
                  </div>
                  <div className="enq-sum-row">
                    <dt>Ship to</dt>
                    <dd className={shipTo ? '' : 'is-empty'}>{shipTo || 'Not specified'}</dd>
                  </div>
                  <div className="enq-sum-row">
                    <dt>Documents</dt>
                    <dd className={docLabels.length ? '' : 'is-empty'}>
                      {docLabels.length ? docLabels.join(' · ') : 'None requested'}
                    </dd>
                  </div>
                  <div className="enq-sum-row">
                    <dt>Contact</dt>
                    <dd className={form.name || form.company ? '' : 'is-empty'}>
                      {[form.name, form.company].filter(Boolean).join(' · ') || 'Not provided'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="enq-side">
                <h4>Prefer to talk?</h4>
                <p>Reach the plant and technical sales directly.</p>
                {contacts.map(({ title, addr, href, Icon }) => (
                  <div key={title} className="enq-contact">
                    <span className="enq-contact-ic">
                      <Icon size={15} strokeWidth={2} />
                    </span>
                    <span className="enq-contact-tx">
                      <b>{title}</b>
                      {href ? <a href={href}>{addr}</a> : <span className="enq-contact-addr">{addr}</span>}
                    </span>
                  </div>
                ))}
              </div>

              <div className="enq-side">
                <h4>Audited and certified</h4>
                <p>Every shipment leaves under these systems.</p>
                <div className="enq-certs">
                  {certs.map((c) => (
                    <span key={c} className="enq-cert">{c}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
