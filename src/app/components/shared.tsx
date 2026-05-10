'use client';

import { useState, useEffect } from 'react';
import { ModelGlyph, MODEL_BY_ID } from './models';
import { Icon } from './icons';

type PillTone = 'neutral' | 'violet' | 'cyan' | 'green' | 'orange' | 'red';

export function Pill({ children, tone = 'neutral', className = '' }: { children: React.ReactNode; tone?: PillTone; className?: string }) {
  const tones: Record<PillTone, React.CSSProperties> = {
    neutral: { background: 'rgba(255,255,255,0.05)', color: '#A1A1AA', border: '1px solid rgba(255,255,255,0.08)' },
    violet:  { background: 'rgba(124,58,237,0.14)',  color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.35)' },
    cyan:    { background: 'rgba(0,212,255,0.10)',   color: '#7DD3FC', border: '1px solid rgba(0,212,255,0.30)'  },
    green:   { background: 'rgba(34,197,94,0.10)',   color: '#86EFAC', border: '1px solid rgba(34,197,94,0.30)'  },
    orange:  { background: 'rgba(245,158,11,0.10)',  color: '#FCD34D', border: '1px solid rgba(245,158,11,0.30)' },
    red:     { background: 'rgba(239,68,68,0.10)',   color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.30)'  },
  };
  return (
    <span className={`mono ${className}`} style={{
      ...tones[tone],
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 500,
      letterSpacing: 0.3, textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

export function GradientBorder({ children, radius = 20, padding = 1, style, className }: {
  children: React.ReactNode; radius?: number; padding?: number; style?: React.CSSProperties; className?: string;
}) {
  return (
    <div className={className} style={{
      position: 'relative', borderRadius: radius, padding,
      background: 'linear-gradient(135deg, rgba(124,58,237,0.55), rgba(0,212,255,0.25) 50%, rgba(124,58,237,0) 100%)',
      ...style,
    }}>
      <div style={{ borderRadius: radius - padding, background: 'var(--card)', height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export function StreamText({ text, speed = 18, onDone, startDelay = 0, paused = false }: {
  text: string; speed?: number; onDone?: () => void; startDelay?: number; paused?: boolean;
}) {
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [text]);
  useEffect(() => {
    if (paused) return;
    if (i === 0 && startDelay) {
      const t = setTimeout(() => setI(1), startDelay);
      return () => clearTimeout(t);
    }
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, startDelay, paused, onDone]);
  return (
    <span>
      {text.slice(0, i)}
      {i < text.length && <span className="cursor" />}
    </span>
  );
}

export function OrbBackdrop({ palette = ['#7C3AED', '#00D4FF'], intensity = 1 }: { palette?: string[]; intensity?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="bg-grid" />
      <div className="bg-orb" style={{ width: 520, height: 520, background: palette[0], top: '-120px', left: '10%',   opacity: 0.35 * intensity, animationDelay: '0s'   }} />
      <div className="bg-orb" style={{ width: 420, height: 420, background: palette[1], top: '30%',   right: '-80px', opacity: 0.28 * intensity, animationDelay: '-6s'  }} />
      <div className="bg-orb" style={{ width: 360, height: 360, background: palette[0], bottom: '-100px', left: '40%', opacity: 0.22 * intensity, animationDelay: '-12s' }} />
    </div>
  );
}

export function Wordmark({ size = 18 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size + 8, height: size + 8, borderRadius: 8,
        background: 'conic-gradient(from 210deg at 50% 50%, #7C3AED, #00D4FF, #7C3AED)',
        position: 'relative', display: 'grid', placeItems: 'center',
        boxShadow: '0 0 22px -4px rgba(124,58,237,0.65)',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: '#090909' }} />
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, letterSpacing: -0.5, fontSize: size }}>
        OneAI<span style={{ color: 'var(--muted)', fontWeight: 500 }}>Hub</span>
      </div>
    </div>
  );
}

import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type Page = 'landing' | 'compare' | 'pricing' | 'dashboard' | 'settings' | 'mobile' | 'login' | 'signup';

export function TopNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [user, setUser] = useState<User | null>(null);

  // Sync Auth State to update Nav Buttons
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setPage('landing');
    } catch (err) {
      console.error('Failed to sign out', err);
    }
  };

  const tabs: { id: Page; label: string }[] = [
    { id: 'landing',   label: 'Home'      },
    { id: 'compare',   label: 'Compare'   },
    { id: 'pricing',   label: 'Pricing'   },
    ...(user ? [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'settings',  label: 'Settings'  }
    ] : []),
    { id: 'mobile',    label: 'Mobile'    },
  ];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid var(--border)',
      background: 'rgba(9,9,9,0.78)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
    }}>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '13px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
        <div onClick={() => setPage('landing')} style={{ cursor: 'pointer' }}>
          <Wordmark />
        </div>
        <div style={{ display: 'flex', gap: 2, marginLeft: 14 }}>
          {tabs.map(t => (
            <div key={t.id} className={`nav-tab ${page === t.id ? 'active' : ''}`} onClick={() => setPage(t.id)}>{t.label}</div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: 0.5 }}>MVP · v1.0</div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
              Hi, <span style={{ color: '#fff', fontWeight: 600 }}>{user.displayName || user.email?.split('@')[0] || 'User'}</span>
            </span>
            <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={handleSignOut}>Sign out</button>
          </div>
        ) : (
          <>
            <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => setPage('login')}>Sign in</button>
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => setPage('dashboard')}>Open app →</button>
          </>
        )}
      </div>
    </div>
  );
}

// Re-export for convenience
export { ModelGlyph, MODEL_BY_ID, Icon };
