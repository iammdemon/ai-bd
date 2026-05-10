'use client';

import { useState } from 'react';
import { Pill, StreamText, OrbBackdrop, Page } from './shared';
import { ModelGlyph, MODEL_BY_ID } from './models';
import { Icon } from './icons';

const COMPARE_PROMPTS = [
  "Design a 2-week launch plan for a Bangla AI study app targeting HSC students.",
  "Explain transformers like I'm a smart 12-year-old, in 4 short paragraphs.",
  "Refactor this Python function for readability:\n\ndef p(x): return [i for i in x if i%2==0]",
];

const COMPARE_RESPONSES: Record<string, string> = {
  gpt5: `Two-phase rollout works best here. Phase 1 (Days 1–6): build hype with a launch teaser, partner with 3 mid-tier HSC YouTubers, and seed Facebook groups where students already congregate.

Phase 2 (Days 7–14): open early access with a "study sprint" leaderboard. Daily streaks + free Pro for top 10 each week creates compounding word-of-mouth without paid spend.

Budget: keep paid ads under 30% of total — organic + creator content converts 4× better in this demo.`,

  claude: `Treat the launch as a sequence of forcing functions rather than a calendar.

Week 1 is for credibility: one viral demo video (under 60s) showing a real HSC question solved in Bangla, three creator partnerships scoped tightly enough to ship in 5 days, and a public "build log" thread to recruit your first 200 power users as cohort #0.

Week 2 is for retention. Replace generic onboarding with a 3-question diagnostic that places each student on a track. Track which tracks complete a study session within 24h — that single metric tells you if the wedge is real.

Skip discount-driven acquisition. HSC students respond to peers and outcomes, not promos.`,

  gemini: `Cross-referencing 2025 Bangladesh ed-tech data: the HSC segment has ~1.4M annual candidates, 78% mobile-first, peak study hours 9–11pm.

Recommended launch arc:
• Day 0–3 — pre-launch: landing page + waitlist + 1 hero demo video in Bangla
• Day 4–7 — soft launch to waitlist, push notification cadence every 36h
• Day 8–11 — creator wave with 5 micro-influencers (50k–250k each)
• Day 12–14 — public launch with press kit to 3 local tech outlets

Track north-star: D7 retention of free users. Aim for >32% (top-quartile for the category).`,
};

function CompareCard({ modelId, response, isBest, onMarkBest }: {
  modelId: string; response: string; isBest: boolean; onMarkBest: () => void;
}) {
  const m = MODEL_BY_ID[modelId];
  const [done, setDone] = useState(false);
  const tokens = Math.round(response.length / 3.6);
  const speed = ({ gpt5: '1.4s', claude: '2.1s', gemini: '0.9s' } as Record<string, string>)[modelId];
  const tokRate = ({ gpt5: '78 tok/s', claude: '62 tok/s', gemini: '112 tok/s' } as Record<string, string>)[modelId];

  return (
    <div className={`card ${isBest ? 'glow-ring' : ''}`} style={{
      padding: 0, display: 'flex', flexDirection: 'column',
      borderColor: isBest ? 'rgba(124,58,237,0.5)' : 'var(--border)',
      transition: 'border-color .3s ease',
      minHeight: 480,
    }}>
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className={m.halo} style={{ width: 34, height: 34, borderRadius: 10, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
          <ModelGlyph id={modelId} size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: 0.4, marginTop: 2 }}>{m.vendor.toUpperCase()}</div>
        </div>
        {isBest && <Pill tone="violet">★ Best</Pill>}
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '18px 20px', fontSize: 14, lineHeight: 1.65, color: '#E4E4E7', whiteSpace: 'pre-wrap' }}>
        <StreamText text={response} speed={done ? 999 : 14} onDone={() => setDone(true)} />
      </div>

      <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Pill>{tokens} tok</Pill>
          <Pill>{speed}</Pill>
          <Pill>{tokRate}</Pill>
          <div style={{ flex: 1 }} />
          <button className="btn-ghost" title="Copy" style={{ padding: '7px 9px' }}><Icon name="copy" size={14} /></button>
          <button className="btn-ghost" title="Regenerate" style={{ padding: '7px 9px' }}><Icon name="refresh" size={14} /></button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button className="btn-ghost" style={{ flex: 1, padding: '9px 12px', fontSize: 13 }}>Continue chat</button>
          <button onClick={onMarkBest} className="btn-ghost" style={{
            padding: '9px 14px', fontSize: 13,
            background: isBest ? 'rgba(124,58,237,0.18)' : undefined,
            borderColor: isBest ? 'rgba(124,58,237,0.5)' : undefined,
            color: isBest ? '#C4B5FD' : undefined,
          }}>
            {isBest ? '✓ Best' : 'Mark best'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComparePage({ setPage: _setPage }: { setPage: (p: Page) => void }) {
  const [draft, setDraft] = useState(COMPARE_PROMPTS[0]);
  const [runId, setRunId] = useState(0);
  const [bestId, setBestId] = useState('claude');
  const [merging, setMerging] = useState(false);
  const [mergeOut, setMergeOut] = useState('');
  const selected = ['gpt5', 'claude', 'gemini'];

  const onRun = () => { setRunId(r => r + 1); setBestId('claude'); setMergeOut(''); };

  const onMerge = () => {
    setMerging(true);
    setMergeOut('');
    setTimeout(() => {
      setMergeOut(`Treat the launch as a sequence of forcing functions — not a calendar (Claude).

Week 1: Build credibility via 1 viral 60-second demo in Bangla, partner with 3 mid-tier HSC creators (GPT-5), and seed Facebook study groups (GPT-5). Pre-launch landing page + waitlist captures the first 1,000 emails (Gemini).

Week 2: Open early access on a "study sprint" leaderboard with daily streaks (GPT-5). Replace generic onboarding with a 3-question diagnostic that places students on a track (Claude). Add a creator wave of 5 micro-influencers (50k–250k each) on Day 8–11 (Gemini).

North-star: D7 retention of free users — target >32% (Gemini). Keep paid spend under 30% of budget; organic + creator content converts 4× better here (GPT-5).`);
      setMerging(false);
    }, 1200);
  };

  return (
    <div className="page-enter" style={{ position: 'relative' }}>
      <section style={{ padding: '48px 28px 24px', position: 'relative', overflow: 'hidden' }}>
        <OrbBackdrop intensity={0.7} />
        <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <Pill tone="violet">Compare mode</Pill>
            <Pill tone="green">●  3 models active</Pill>
          </div>
          <h1 style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.05, maxWidth: 900 }}>Ask once. Compare every AI.</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 660, marginTop: 14, fontSize: 15.5, lineHeight: 1.55 }}>
            One prompt streams to three frontier models in parallel. Read side-by-side, mark the best response, or let the merger fuse the strongest paragraphs into one.
          </p>
        </div>
      </section>

      {/* PROMPT BAR */}
      <section style={{ padding: '0 28px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div className="card glow-ring" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Icon name="compare" size={16} stroke="#C4B5FD" />
              <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>Prompt</div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {selected.map(id => (
                  <div key={id} title={MODEL_BY_ID[id].name} style={{ width: 28, height: 28, borderRadius: 8, background: '#0a0a0a', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                    <ModelGlyph id={id} size={15} />
                  </div>
                ))}
                <button className="btn-ghost" style={{ padding: '6px 10px', fontSize: 12, marginLeft: 4 }}>+ Add model</button>
              </div>
            </div>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={2}
              style={{ background: 'transparent', border: 'none', outline: 'none', resize: 'none', width: '100%', color: '#fff', fontSize: 15, fontFamily: 'inherit', lineHeight: 1.5, padding: 0 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn-ghost" style={{ padding: '7px 10px' }}><Icon name="paperclip" size={14} /></button>
              <button className="btn-ghost" style={{ padding: '7px 10px' }}><Icon name="mic" size={14} /></button>
              <div style={{ display: 'flex', gap: 6, marginLeft: 4, flexWrap: 'wrap' }}>
                {COMPARE_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => setDraft(p)} className="btn-ghost" style={{ padding: '6px 10px', fontSize: 11.5, color: 'var(--muted)' }}>
                    Example {i + 1}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <button className="btn-primary" style={{ padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={onRun}>
                Run on 3 models <Icon name="send" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE GRID */}
      <section style={{ padding: '24px 28px 0' }}>
        <div key={runId} style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {selected.map(id => (
            <CompareCard key={id + runId} modelId={id} response={COMPARE_RESPONSES[id]} isBest={bestId === id} onMarkBest={() => setBestId(id)} />
          ))}
        </div>
      </section>

      {/* MERGE CTA */}
      <section style={{ padding: '28px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{
            position: 'relative', borderRadius: 22, padding: 1,
            background: 'linear-gradient(120deg, #7C3AED, #00D4FF, #7C3AED)',
            backgroundSize: '200% 100%', animation: 'flowGradient 6s ease-in-out infinite',
          }}>
            <div style={{ background: 'var(--card)', borderRadius: 21, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: 'grid', placeItems: 'center',
                background: 'radial-gradient(circle at 30% 30%, #7C3AED, #00D4FF 90%)',
                boxShadow: '0 0 28px -4px rgba(124,58,237,0.7)',
              }}>
                <Icon name="sparkles" size={22} stroke="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 600 }}>Combine the best parts</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Our merger reads all three answers and stitches the strongest paragraphs into a single, citation-tagged response.</div>
              </div>
              <button className="btn-primary" style={{ padding: '12px 22px', display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={onMerge} disabled={merging}>
                {merging ? <>Merging <span className="dot" /><span className="dot" /><span className="dot" /></> : <>✦ Merge response</>}
              </button>
            </div>
          </div>

          {(merging || mergeOut) && (
            <div className="card" style={{ marginTop: 14, padding: 24, borderColor: 'rgba(124,58,237,0.35)', background: 'linear-gradient(180deg, rgba(124,58,237,0.06), transparent 60%), var(--card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Icon name="sparkles" size={16} stroke="#C4B5FD" />
                <div style={{ fontSize: 13, fontWeight: 600 }}>Merged response</div>
                <Pill tone="violet">Best of 3</Pill>
                <div style={{ flex: 1 }} />
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>citations inline</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: '#E4E4E7', whiteSpace: 'pre-wrap', minHeight: merging ? 60 : 0 }}>
                {merging
                  ? <span style={{ color: 'var(--muted)' }}>Reading 3 responses, scoring paragraphs, stitching<span className="dot" /><span className="dot" /><span className="dot" /></span>
                  : <StreamText text={mergeOut} speed={10} />
                }
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '48px 28px 80px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { label: 'Models compared', value: '3',      sub: 'this session'   },
            { label: 'Tokens used',     value: '12,840', sub: 'across all 3'   },
            { label: 'Avg first token', value: '1.47s',  sub: 'p50 latency'    },
            { label: 'Cost (est.)',     value: '$0.043', sub: 'this run'        },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: 0.8, textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 600, marginTop: 6 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
