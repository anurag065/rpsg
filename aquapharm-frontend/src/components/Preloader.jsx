import { useState, useEffect, useRef, useCallback } from 'react';
import rpsgLogo from '../assets/logo-rpsg.jpeg';

/* Timeline (ms) — kept deliberately short; a splash that outstays its
   welcome reads as a slow site, not a premium one. */
const FILL_START = 150;
const FILL_MS = 2200;
const HOLD_MS = 420;
const FADE_MS = 700;

/* easeOutCubic — the counter should decelerate into 100, not hit it flat */
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'holding' | 'fading' | 'done'
  const [shouldShow, setShouldShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  // Check if we should show the preloader
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Always show on every refresh
    setShouldShow(true);
  }, [onComplete]);

  // Counter drives both the readout and the meniscus height, so they can never desync
  useEffect(() => {
    if (!shouldShow) return;

    let start = null;
    const step = (now) => {
      if (start === null) start = now;
      const t = Math.min(1, Math.max(0, (now - start - FILL_START) / FILL_MS));
      setProgress(Math.round(easeOut(t) * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldShow]);

  // Phase timeline
  useEffect(() => {
    if (!shouldShow) return;

    const holdAt = FILL_START + FILL_MS;
    const fadeAt = holdAt + HOLD_MS;
    const doneAt = fadeAt + FADE_MS;

    const holdTimer = setTimeout(() => setPhase('holding'), holdAt);
    const fadeTimer = setTimeout(() => setPhase('fading'), fadeAt);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, doneAt);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [shouldShow, onComplete]);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (phase === 'done') return;
    setPhase('done');
    onComplete?.();
  }, [phase, onComplete]);

  // Listen for keypress to skip
  useEffect(() => {
    if (!shouldShow || phase === 'done') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldShow, phase, handleSkip]);

  if (!shouldShow || phase === 'done') {
    return null;
  }

  return (
    <div
      className={`preloader ${phase}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label="Loading APChem — click or press any key to skip"
    >
      {/* Hex lattice — a chemical structure, held at the edge of visibility */}
      <svg className="pl-lattice" aria-hidden="true">
        <defs>
          <pattern id="plHex" width="56" height="97" patternUnits="userSpaceOnUse">
            <path
              d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L56 80 M28 64 L0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plHex)" />
      </svg>

      <div className="pl-glow" aria-hidden="true"></div>

      <div className="preloader-content">
        <div className="pl-eyebrow">Aquapharm PChem, LLC</div>

        {/* Wordmark fills from the bottom like a vessel reaching level */}
        <div className="pl-wordmark">
          <span className="pl-wm-ghost" aria-hidden="true">
            APCHEM<sup>&reg;</sup>
          </span>
          <span
            className="pl-wm-fill"
            style={{ height: `${progress}%` }}
            aria-hidden="true"
          >
            <span className="pl-wm-fill-inner">
              APCHEM<sup>&reg;</sup>
            </span>
          </span>
          <span className="pl-wm-meniscus" style={{ bottom: `${progress}%` }} aria-hidden="true"></span>
        </div>

        <div className="pl-meter">
          <div className="pl-meter-track">
            <div className="pl-meter-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="pl-meter-val">{String(progress).padStart(3, '0')}</span>
        </div>

        <div className="pl-endorse">
          <span className="pl-endorse-label">Part of the</span>
          <img src={rpsgLogo} alt="RP-Sanjiv Goenka Group" className="pl-endorse-logo" />
        </div>
      </div>

      <button className="preloader-skip" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}

export default Preloader;
