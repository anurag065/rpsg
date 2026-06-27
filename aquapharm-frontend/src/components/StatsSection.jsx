import { useState, useEffect, useRef, useCallback } from 'react';
import { Users, MapPin, Truck, Factory, FlaskConical, Microscope } from 'lucide-react';

// Custom hook for count-up animation
function useCountUp(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentCount = Math.floor(easeOut * end);

    if (currentCount !== countRef.current) {
      countRef.current = currentCount;
      setCount(currentCount);
    }

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
    }
  }, [end, duration]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    if (startCounting) {
      startTimeRef.current = null;
      countRef.current = 0;
      setCount(0);
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [startCounting, end, animate, prefersReducedMotion]);

  return count;
}

// Individual stat item component
function StatItem({ value, suffix, label, sublabel, icon: Icon, isVisible }) {
  const numericValue = parseInt(value, 10);
  const count = useCountUp(numericValue, 1800, isVisible);

  return (
    <div className="stat-item">
      <div className="stat-content">
        <div className="stat-number-row">
          <span className="stat-number">{count}{suffix}</span>
          {sublabel && <span className="stat-sublabel">{sublabel}</span>}
        </div>
        <p className="stat-label">{label}</p>
      </div>
      <div className="stat-icon-badge">
        <Icon size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: '700',
      suffix: '+',
      label: 'Number of Employees',
      icon: Users
    },
    {
      value: '60',
      suffix: '',
      sublabel: 'Countries',
      label: 'Global Presence',
      icon: MapPin
    },
    {
      value: '11',
      suffix: '',
      label: 'Warehouses in India, Europe, USA and Canada',
      icon: Truck
    },
    {
      value: '4',
      suffix: '',
      label: 'Manufacturing Facilities',
      icon: Factory
    },
    {
      value: '275',
      suffix: '+',
      label: 'Number of Products',
      icon: FlaskConical
    },
    {
      value: '1',
      suffix: '',
      label: 'Innovation Centre in India',
      icon: Microscope
    }
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="wrap">
        <div className="stats-header">
          <h2 className="stats-title hf">About Aquapharm</h2>
          <span className="stats-subtitle">Key Numbers</span>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              icon={stat.icon}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
