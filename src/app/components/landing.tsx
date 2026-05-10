'use client';

import { Pill, OrbBackdrop, Wordmark, Page } from './shared';
import { ModelGlyph } from './models';
import { MODELS } from './models';
import { Icon } from './icons';

function HeroVisual() {
  return (
    <div style={{ position: 'relative', height: 460, marginTop: 8 }}>
      <div style={{ position: 'absolute', inset: '10% 10% 0 10%', background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.35), transparent 60%)', filter: 'blur(40px)' }} />

      {/* GPT tile */}
      <div className="card card-hover" style={{ position: 'absolute', left: '4%', top: 30, width: 280, padding: 18, transform: 'rotate(-3deg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div className="halo-green" style={{ width: 30, height: 30, borderRadius: 8, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
            <ModelGlyph id="gpt5" size={18} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>GPT-5</div>
          <div style={{ flex: 1 }} />
          <Pill tone="green">Live</Pill>
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>
          A market-entry plan for São Paulo should prioritize tier-1 retail districts<span style={{ color: '#22C55E' }}>…</span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
          <Pill>3.2k tok</Pill>
          <Pill>1.4s</Pill>
        </div>
      </div>

      {/* Claude tile (front, highlighted) */}
      <div className="card glow-ring" style={{ position: 'absolute', left: '30%', top: 0, width: 340, padding: 20, zIndex: 2, boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(124,58,237,0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div className="halo-orange" style={{ width: 32, height: 32, borderRadius: 9, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
            <ModelGlyph id="claude" size={20} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Claude</div>
          <div style={{ flex: 1 }} />
          <Pill tone="violet">Best response</Pill>
        </div>
        <div style={{ fontSize: 13.5, color: '#E4E4E7', lineHeight: 1.6 }}>
          For São Paulo, the strongest entry play is a <span style={{ color: '#F59E0B' }}>two-phase rollout</span>: a curated flagship in Jardins to anchor brand, paired with marketplace fulfillment to test SKU velocity before signing a second lease.
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
          <Pill>5.8k tok</Pill>
          <Pill>2.1s</Pill>
          <div style={{ flex: 1 }} />
          <Icon name="copy" size={14} stroke="#71717A" />
          <Icon name="refresh" size={14} stroke="#71717A" />
        </div>
      </div>

      {/* Gemini tile */}
      <div className="card card-hover" style={{ position: 'absolute', right: '4%', top: 60, width: 280, padding: 18, transform: 'rotate(3deg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div className="halo-blue" style={{ width: 30, height: 30, borderRadius: 8, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
            <ModelGlyph id="gemini" size={18} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Gemini</div>
          <div style={{ flex: 1 }} />
          <Pill tone="cyan">Streaming</Pill>
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>
          Cross-referencing 2025 retail data with logistics zones suggests<span className="dot" /><span className="dot" /><span className="dot" />
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
          <Pill>2.1k tok</Pill>
          <Pill>0.9s</Pill>
        </div>
      </div>

      {/* Analytics tile */}
      <div className="card" style={{ position: 'absolute', left: '18%', bottom: 0, width: 260, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Icon name="pulse" size={14} stroke="#A1A1AA" />
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>Usage · this month</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 600 }}>1.42M</div>
          <div className="mono" style={{ fontSize: 11, color: '#22C55E' }}>+18%</div>
        </div>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 38, marginTop: 10 }}>
          {[35, 52, 40, 68, 55, 80, 62, 90, 72, 85, 60, 95].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg, #7C3AED, rgba(124,58,237,0.2))', borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Compare CTA tile */}
      <div className="card" style={{ position: 'absolute', right: '12%', bottom: 14, width: 240, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="compare" size={14} stroke="#7C3AED" />
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>Compare mode</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>3 models running on your prompt</div>
        <div style={{ display: 'flex' }}>
          {(['gpt5', 'claude', 'gemini'] as const).map((id, i) => (
            <div key={id} style={{ marginLeft: i === 0 ? 0 : -6, width: 26, height: 26, borderRadius: 8, background: '#0a0a0a', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
              <ModelGlyph id={id} size={14} />
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#22C55E' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
            running
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ position: 'relative', padding: '80px 28px 60px', overflow: 'hidden' }}>
        <OrbBackdrop />
        <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid rgba(124,58,237,0.35)',
              background: 'rgba(124,58,237,0.08)',
              color: '#C4B5FD', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', boxShadow: '0 0 8px #7C3AED', animation: 'pulseGlow 2s infinite' }} />
              Now in public beta · 8 frontier models
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 7vw, 84px)', lineHeight: 1.02, textAlign: 'center', maxWidth: 1080, margin: '0 auto' }}>
            One subscription.<br />
            <span style={{
              background: 'linear-gradient(120deg, #FFFFFF 0%, #C4B5FD 35%, #00D4FF 65%, #FFFFFF 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              animation: 'flowGradient 8s ease-in-out infinite',
            }}>Every top AI model.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', textAlign: 'center', color: 'var(--muted)', maxWidth: 720, margin: '24px auto 0', lineHeight: 1.55 }}>
            Access GPT-5, Claude, Gemini, Grok, Kimi, DeepSeek and more from one unified AI workspace.
            Compare answers, route to the best model, never pay 8 bills again.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }} onClick={() => setPage('dashboard')}>Start free →</button>
            <button className="btn-ghost" style={{ padding: '14px 24px', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icon name="play" size={14} stroke="#fff" /> Watch demo
            </button>
          </div>

          <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textAlign: 'center', marginTop: 16, letterSpacing: 0.6 }}>
            No credit card · 50 free messages / day · cancel anytime
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* TRUST */}
      <section style={{ padding: '40px 28px 80px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--muted-2)', textAlign: 'center', marginBottom: 32 }}>
            Powered by leading AI models
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 0,
            border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden',
            background: 'rgba(255,255,255,0.015)',
          }}>
            {MODELS.map((m, i) => (
              <div key={m.id} style={{
                padding: '28px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                borderRight: i !== MODELS.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background .25s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <div style={{ filter: 'grayscale(1) brightness(0.7)', transition: 'filter .3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0) brightness(1.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(1) brightness(0.7)'; }}
                >
                  <ModelGlyph id={m.id} size={28} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{m.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 28px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Pill tone="violet">Workspace</Pill>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginTop: 18, lineHeight: 1.05 }}>
              Built for people who think<br />
              <span style={{ color: 'var(--muted)' }}>across</span> models.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { icon: 'cube',      title: 'One subscription access', body: 'Stop juggling 6 bills. One plan unlocks every frontier model behind a single, fast interface.' },
              { icon: 'compare',   title: 'Multi-AI compare',        body: 'Send a prompt to up to 4 models at once. Read side-by-side, mark the winner, merge the best parts.', highlight: true },
              { icon: 'key',       title: 'Bring your own keys',     body: 'Already paying providers directly? Plug your keys into our orchestrator and pay us only a thin platform fee.' },
              { icon: 'lightning', title: 'Lightning fast',          body: 'Edge routing, persistent connections and stream-first rendering. First token in under 400ms on most models.' },
              { icon: 'route',     title: 'Smart model routing',     body: 'Let our router pick the right model per prompt — cheap models for chat, frontier for hard reasoning.' },
              { icon: 'history',   title: 'Searchable chat history', body: 'Every conversation is indexed and re-runnable on a different model. Forks, branches and pin-favorites included.' },
              { icon: 'file',      title: 'File & image upload',     body: 'PDFs, slide decks, code repos, screenshots. We parse, chunk and feed only what each model needs.' },
              { icon: 'mic',       title: 'Voice prompt',            body: 'Hold to dictate. Whisper-class transcription is built in — no extra hardware, no extra subscription.' },
              { icon: 'chart',     title: 'Token analytics',         body: 'Track spend per model, per project, per teammate. Weekly digests and per-prompt cost estimates.' },
            ].map((f, i) => (
              <div key={i} className={`card card-hover ${f.highlight ? 'glow-ring' : ''}`} style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center',
                  background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.25)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 24px -8px rgba(124,58,237,0.5)',
                }}>
                  <Icon name={f.icon} size={20} stroke="#C4B5FD" />
                </div>
                <h3 style={{ fontSize: 17, marginTop: 18, fontWeight: 600 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, marginTop: 8 }}>{f.body}</p>
                {f.highlight && (
                  <div className="mono" style={{ marginTop: 14, fontSize: 11, color: '#C4B5FD', letterSpacing: 0.5 }}>
                    → Main USP · see compare page
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE TEASER */}
      <section style={{ padding: '80px 28px', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <OrbBackdrop palette={['#7C3AED', '#00D4FF']} intensity={0.6} />
        <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
          <Pill tone="cyan">Main feature</Pill>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 18, lineHeight: 1.05 }}>
            Ask once. <span style={{ color: 'var(--muted-2)' }}>Compare every AI.</span>
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: 620, margin: '18px auto 36px', fontSize: 16, lineHeight: 1.55 }}>
            One prompt, parallel answers from your favorite models. Pick the winner — or let us merge the best parts into a single response.
          </p>
          <button className="btn-primary" style={{ padding: '14px 24px', fontSize: 15 }} onClick={() => setPage('compare')}>
            Try compare mode →
          </button>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '80px 28px', borderTop: '1px solid var(--border)' }}>
        <div className="card" style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1 }}>Start using the best AI<br />without the best budget.</h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
            <button className="btn-primary" style={{ padding: '14px 26px' }} onClick={() => setPage('pricing')}>See pricing</button>
            <button className="btn-ghost" style={{ padding: '14px 22px' }} onClick={() => setPage('dashboard')}>Open the app</button>
          </div>
        </div>
        <div style={{ maxWidth: 1240, margin: '40px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Wordmark />
          <div style={{ display: 'flex', gap: 24, color: 'var(--muted-2)', fontSize: 13 }}>
            <span>© 2026 OneAI Hub</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status · all systems normal</span>
          </div>
        </div>
      </section>
    </div>
  );
}
