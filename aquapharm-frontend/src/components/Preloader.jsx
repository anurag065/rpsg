import { useState, useEffect, useCallback } from 'react';
import logo from '../assets/logo-rpsg-group.jpeg';

function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'holding' | 'fading' | 'done'
  const [shouldShow, setShouldShow] = useState(false);

  // Check if we should show the preloader
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Always show on every refresh
    setShouldShow(true);
  }, [onComplete]);

  // Animation timeline
  useEffect(() => {
    if (!shouldShow) return;

    // Phase 1: Logo animates in (~1000ms)
    const holdTimer = setTimeout(() => {
      setPhase('holding');
    }, 1000);

    // Phase 2: Hold (~2700ms), then start fade
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 3700);

    // Phase 3: Fade out complete (~800ms)
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 4500);

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
      aria-label="Loading animation - click or press any key to skip"
    >
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <div className="preloader-tagline">
            {'Part of the'.split('').map((char, i) => (
              <span
                key={i}
                className="preloader-tagline-char"
                style={{ animationDelay: `${0.1 + i * 0.03}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <img
            src={logo}
            alt="RP-Sanjiv Goenka Group"
            className="preloader-logo-mark"
          />
        </div>
        <div className="preloader-progress">
          <div className="preloader-progress-bar"></div>
        </div>
      </div>
      <button className="preloader-skip" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}

export default Preloader;
