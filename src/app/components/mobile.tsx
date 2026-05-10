'use client';

import { useState } from 'react';
import { Pill, OrbBackdrop, Wordmark } from './shared';
import { ModelGlyph, MODEL_BY_ID } from './models';
import { Icon } from './icons';

function MobileFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div className="mobile-frame">
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 108, height: 34, borderRadius: 18, background: '#000', zIndex: 5 }} />
        <div style={{ height: '100%', background: '#090909', color: '#fff', fontSize: 13, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 28px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
            <span className="mono">9:41</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ width: 16, height: 10, border: '1px solid #fff', borderRadius: 2, position: 'relative', display: 'inline-block' }}>
                <span style={{ position: 'absolute', inset: 1.5, background: '#fff', width: 9, borderRadius: 1, display: 'block' }} />
              </span>
            </span>
          </div>
          {children}
        </div>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function MobileChat() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '8px 18px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
        <Icon name="menu" size={18} stroke="#fff" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px 6px 6px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
          <div className="halo-orange" style={{ width: 22, height: 22, borderRadius: 6, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
            <ModelGlyph id="claude" size={13} />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Claude</div>
          <Icon name="arrow" size={10} stroke="#71717A" />
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 12 }}>R</div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', background: 'linear-gradient(180deg, #1a1530, #15102a)', border: '1px solid rgba(124,58,237,0.25)', fontSize: 13.5, lineHeight: 1.55 }}>
          Help me plan a Bangla AI study app launch for HSC students.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="halo-orange" style={{ width: 24, height: 24, borderRadius: 7, background: '#0a0a0a', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <ModelGlyph id="claude" size={14} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#E4E4E7' }}>
              <strong>Week 1 — Credibility.</strong> One 60-second hero video in Bangla solving a real HSC physics problem. Three creator partnerships, 50k–250k follower range.<span className="cursor" />
            </div>
            <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
              <Pill>1.8k tok</Pill>
              <Pill>1.4s</Pill>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 14px 28px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 18 }}>
          <input placeholder="Message Claude…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13.5 }} />
          <Icon name="mic" size={16} stroke="#A1A1AA" />
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', display: 'grid', placeItems: 'center', boxShadow: '0 0 14px -2px rgba(124,58,237,0.6)' }}>
            <Icon name="send" size={13} stroke="#fff" />
          </div>
        </div>
        <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.4)', margin: '14px auto 0' }} />
      </div>
    </div>
  );
}

function MobileCompare() {
  const [active, setActive] = useState('claude');
  const tabs = ['gpt5', 'claude', 'gemini'];
  const responses: Record<string, string> = {
    gpt5:   'Two-phase rollout: Week 1 hype with creator partnerships, Week 2 early access with a leaderboard.',
    claude: 'Treat launch as a sequence of forcing functions — not a calendar. Week 1 is credibility, Week 2 is retention. Skip discount-driven acquisition.',
    gemini: 'Cross-referencing 2025 ed-tech data, HSC segment is ~1.4M annual candidates, 78% mobile-first. Recommended arc spans 14 days with 4 phases.',
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '8px 18px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
        <Icon name="menu" size={18} stroke="#fff" />
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="compare" size={14} stroke="#C4B5FD" /> Compare
        </div>
        <Pill tone="green">● 3 live</Pill>
      </div>

      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Your prompt</div>
        <div style={{ fontSize: 13, color: '#E4E4E7', marginTop: 4, lineHeight: 1.5 }}>Plan a 2-week launch for a Bangla AI study app for HSC students.</div>
      </div>

      <div style={{ padding: '10px 12px 0', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {tabs.map(t => {
          const m = MODEL_BY_ID[t];
          const on = active === t;
          return (
            <div key={t} onClick={() => setActive(t)} style={{ flexShrink: 0, padding: '8px 12px 8px 8px', borderRadius: 10, background: on ? 'rgba(124,58,237,0.10)' : 'rgba(255,255,255,0.03)', border: '1px solid', borderColor: on ? 'rgba(124,58,237,0.45)' : 'var(--border)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12.5, fontWeight: 500 }}>
              <div className={m.halo} style={{ width: 22, height: 22, borderRadius: 6, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
                <ModelGlyph id={t} size={12} />
              </div>
              {m.name}
            </div>
          );
        })}
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '16px' }}>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#E4E4E7' }}>{responses[active]}</div>
          <div style={{ display: 'flex', gap: 5, marginTop: 12 }}>
            <Pill>3.2k tok</Pill>
            <Pill>1.4s</Pill>
            {active === 'claude' && <Pill tone="violet">★ Best</Pill>}
          </div>
        </div>
        <div style={{ marginTop: 14, padding: 1, borderRadius: 14, background: 'linear-gradient(120deg, #7C3AED, #00D4FF, #7C3AED)', backgroundSize: '200% 100%', animation: 'flowGradient 6s ease-in-out infinite' }}>
          <div style={{ background: 'var(--card)', borderRadius: 13, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="sparkles" size={16} stroke="#C4B5FD" />
            <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>Combine best parts</div>
            <Icon name="arrow" size={12} stroke="#A1A1AA" />
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 14px 28px', borderTop: '1px solid var(--border)', background: 'rgba(9,9,9,0.85)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 18 }}>
          <input placeholder="Compare again…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13.5 }} />
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', display: 'grid', placeItems: 'center' }}>
            <Icon name="send" size={13} stroke="#fff" />
          </div>
        </div>
        <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.4)', margin: '14px auto 0' }} />
      </div>
    </div>
  );
}

function MobileHome() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '8px 18px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Wordmark size={15} />
        <div style={{ flex: 1 }} />
        <Icon name="bell" size={17} stroke="#fff" />
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 12 }}>R</div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: 0.8 }} className="mono">Good evening, Rafiul</div>
        <h2 style={{ fontSize: 24, lineHeight: 1.1 }}>What do you want to think about?</h2>

        <div className="card glow-ring" style={{ padding: 14, marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name="compare" size={14} stroke="#C4B5FD" />
            <div style={{ fontSize: 13, fontWeight: 600 }}>Compare mode</div>
            <Pill tone="violet">New</Pill>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>Send one prompt to 3 models at once and pick the winner.</div>
        </div>

        <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 6 }}>Recent</div>
        {[
          { t: 'Bangla AI launch plan',   sub: '2 min ago', model: 'claude'   },
          { t: 'Refactor Python utils',   sub: '1h ago',    model: 'deepseek' },
          { t: 'Cover letter — Senior PM',sub: 'Yesterday', model: 'gpt5'     },
        ].map((r, i) => (
          <div key={i} className="card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#0a0a0a', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
              <ModelGlyph id={r.model} size={15} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.t}</div>
              <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>{r.sub}</div>
            </div>
            <Icon name="arrow" size={12} stroke="#71717A" />
          </div>
        ))}

        <div className="card" style={{ padding: 14, marginTop: 6 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', letterSpacing: 0.6, textTransform: 'uppercase' }}>This month</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 600 }}>1.42M</div>
            <div className="mono" style={{ fontSize: 11, color: '#22C55E' }}>+18%</div>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>tokens used · Pro plan</div>
        </div>
      </div>

      <div style={{ padding: '10px 0 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', background: 'rgba(9,9,9,0.9)', backdropFilter: 'blur(20px)' }}>
        {[
          { i: 'spark',   l: 'Home',    on: true  },
          { i: 'compare', l: 'Compare', on: false },
          { i: 'history', l: 'History', on: false },
          { i: 'cog',     l: 'Settings',on: false },
        ].map(t => (
          <div key={t.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: t.on ? '#C4B5FD' : 'var(--muted)' }}>
            <Icon name={t.i} size={20} stroke={t.on ? '#C4B5FD' : '#71717A'} />
            <div style={{ fontSize: 10, fontWeight: 500 }}>{t.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobilePage() {
  return (
    <div className="page-enter" style={{ padding: '40px 28px 80px', position: 'relative' }}>
      <OrbBackdrop intensity={0.5} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Pill tone="cyan">Mobile</Pill>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: 14 }}>Native-quality on every screen</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '14px auto 0', fontSize: 15 }}>
            Compare mode adapts into swipeable tabs. The prompt input sticks to the bottom. Everything else gets out of the way.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          <MobileFrame label="Home"><MobileHome /></MobileFrame>
          <MobileFrame label="Chat"><MobileChat /></MobileFrame>
          <MobileFrame label="Compare · tab view"><MobileCompare /></MobileFrame>
        </div>
      </div>
    </div>
  );
}
