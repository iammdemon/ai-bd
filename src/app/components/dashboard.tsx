'use client';

import { useState, useEffect, useRef } from 'react';
import { Pill, StreamText, Page } from './shared';
import { ModelGlyph, MODEL_BY_ID, MODELS } from './models';
import { Icon } from './icons';

interface ChatMsg { role: 'user' | 'ai'; text: string; model?: string; tokens?: number; latency?: string; }

const CHAT_HISTORY_INITIAL: ChatMsg[] = [
  { role: 'user', text: 'Help me plan a 2-week launch for a Bangla AI study app for HSC students. Budget under 50k TK.' },
  { role: 'ai', model: 'claude', text: `Here's a forcing-functions plan, not a calendar.\n\n**Week 1 — Credibility**\n1. One 60-second hero video in Bangla solving a real 2024 HSC physics problem\n2. Three creator partnerships (50k–250k follower range), each producing 1 reel + 1 IG story\n3. Public "build log" thread on Facebook for daily progress\n\n**Week 2 — Retention**\n4. Open early access with a 3-question diagnostic that places each student on a track\n5. Track D7 of free users — north star is >32% retention\n\nSkip discount-driven acquisition. HSC students respond to peers and outcomes, not promos.\n\nBudget split: 60% creator deals, 25% production, 15% paid amplification of the top-performing organic post.`, tokens: 3420, latency: '2.1s' },
  { role: 'user', text: 'Good. Now give me a creator brief I can send to a YouTuber tomorrow.' },
];

function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.startsWith('**') && b.endsWith('**')) {
          return <div key={i} style={{ fontWeight: 600, fontSize: 14, marginTop: i ? 14 : 0, marginBottom: 6 }}>{b.replace(/\*\*/g, '')}</div>;
        }
        if (/^\d+\./.test(b.trim())) {
          const items = b.split('\n').filter(Boolean);
          return (
            <ol key={i} style={{ paddingLeft: 22, margin: i ? '8px 0' : '0' }}>
              {items.map((it, j) => <li key={j} style={{ margin: '4px 0' }}>{it.replace(/^\d+\.\s*/, '')}</li>)}
            </ol>
          );
        }
        return (
          <p key={i} style={{ margin: i ? '10px 0' : '0', lineHeight: 1.7 }}>
            {b.split(/(\*\*.+?\*\*)/g).map((part, k) =>
              part.startsWith('**') ? <strong key={k}>{part.replace(/\*\*/g, '')}</strong> : <span key={k}>{part}</span>
            )}
          </p>
        );
      })}
    </div>
  );
}

function ChatBubble({ msg, isStreaming }: { msg: ChatMsg; isStreaming: boolean }) {
  if (msg.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <div style={{
          maxWidth: '72%', padding: '14px 18px', borderRadius: '18px 18px 4px 18px',
          background: 'linear-gradient(180deg, #1a1530, #15102a)',
          border: '1px solid rgba(124,58,237,0.25)',
          fontSize: 14.5, lineHeight: 1.6, color: '#E4E4E7',
        }}>
          {msg.text}
        </div>
      </div>
    );
  }
  const m = MODEL_BY_ID[msg.model || 'claude'];
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
      <div className={m.halo} style={{ width: 32, height: 32, borderRadius: 9, background: '#0a0a0a', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <ModelGlyph id={m.id} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
          <Pill>{msg.tokens || 0} tok</Pill>
          <Pill>{msg.latency || '–'}</Pill>
          {isStreaming && <Pill tone="cyan">streaming</Pill>}
        </div>
        <div style={{ fontSize: 14.5, lineHeight: 1.7, color: '#E4E4E7' }}>
          {isStreaming ? <StreamText text={msg.text} speed={10} /> : <Markdown text={msg.text} />}
        </div>
        {!isStreaming && (
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            <button className="btn-ghost" style={{ padding: '6px 8px' }}><Icon name="copy" size={13} /></button>
            <button className="btn-ghost" style={{ padding: '6px 8px' }}><Icon name="refresh" size={13} /></button>
            <button className="btn-ghost" style={{ padding: '6px 8px' }}><Icon name="compare" size={13} /></button>
            <div style={{ flex: 1 }} />
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>est. cost · $0.012</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, badge, onClick, collapsed }: {
  icon: string; label: string; active: boolean; badge?: { text: string; tone: string } | null;
  onClick: () => void; collapsed: boolean;
}) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? '11px 12px' : '10px 12px',
      borderRadius: 10, cursor: 'pointer', position: 'relative',
      background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
      border: '1px solid', borderColor: active ? 'rgba(124,58,237,0.3)' : 'transparent',
      color: active ? '#fff' : 'var(--muted)', transition: 'background .15s ease, color .15s ease',
    }}
      onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLDivElement).style.color = '#fff'; } }}
      onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--muted)'; } }}
    >
      {active && <div style={{ position: 'absolute', left: -1, top: 8, bottom: 8, width: 2, borderRadius: 2, background: '#7C3AED', boxShadow: '0 0 8px #7C3AED' }} />}
      <Icon name={icon} size={17} stroke={active ? '#C4B5FD' : 'currentColor'} />
      {!collapsed && <div style={{ fontSize: 13.5, fontWeight: active ? 500 : 450, flex: 1 }}>{label}</div>}
      {!collapsed && badge && <Pill tone={badge.tone as 'violet'}>{badge.text}</Pill>}
    </div>
  );
}

function Metric({ label, value, bar, tone }: { label: string; value: string; bar: number; tone: string }) {
  const colors: Record<string, string> = { green: '#22C55E', violet: '#A78BFA', cyan: '#00D4FF', orange: '#F59E0B' };
  const c = colors[tone] || '#7C3AED';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--muted)' }}>{label}</span>
        <span className="mono" style={{ color: '#E4E4E7' }}>{value}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${bar}%`, height: '100%', background: c, boxShadow: `0 0 8px ${c}` }} />
      </div>
    </div>
  );
}

export function DashboardPage({ setPage, openModelPicker, currentModel, setCurrentModel, openApiKeys }: {
  setPage: (p: Page) => void;
  openModelPicker: () => void;
  currentModel: string;
  setCurrentModel: (m: string) => void;
  openApiKeys: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('new');
  const [history, setHistory] = useState<ChatMsg[]>(CHAT_HISTORY_INITIAL);
  const [draft, setDraft] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const m = MODEL_BY_ID[currentModel];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history.length, streaming]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft('');
    setHistory(h => [...h, { role: 'user', text }]);
    setStreaming(true);
    setTimeout(() => {
      setHistory(h => [...h, { role: 'ai', model: currentModel, text: "Here's a creator brief you can send tomorrow.\n\n**Subject:** Sponsored reel — Bangla AI study app for HSC\n\nWe'd love a 60–75s reel where you solve one real HSC physics problem with our app on screen. Tone: like helping a younger sibling. Show: scan a question → app explains in Bangla → solve in <90 seconds.\n\nDeliverables: 1 reel, 1 IG story sequence (3 frames), permission to whitelist for paid amplification.\nTimeline: 5 days from brief approval.\nBudget: 12,000 TK + a 1-year Pro account.\n\nLet me know if you want me to draft the script too.", tokens: 1820, latency: '1.4s' }]);
      setStreaming(false);
    }, 1400);
  };

  const sidebar = [
    { id: 'compare',  icon: 'compare', label: 'Compare mode', badge: { text: 'USP', tone: 'violet' } },
    { id: 'history',  icon: 'history', label: 'Chat history',  badge: null },
    { id: 'fav',      icon: 'star',    label: 'Favorites',     badge: null },
    { id: 'models',   icon: 'cube',    label: 'Models',        badge: null },
    { id: 'keys',     icon: 'key',     label: 'API keys',      badge: null },
    { id: 'billing',  icon: 'card',    label: 'Billing',       badge: null },
    { id: 'settings', icon: 'cog',     label: 'Settings',      badge: null },
  ];

  const recent = [
    { t: 'Bangla AI launch plan',    sub: '2 min ago',  model: 'claude'   },
    { t: 'Refactor Python utils',    sub: '1h ago',     model: 'deepseek' },
    { t: 'Cover letter — Senior PM', sub: 'Yesterday',  model: 'gpt5'     },
    { t: 'Compare: marketing copy',  sub: '2 days ago', model: 'gemini'   },
    { t: 'Translate contract → BN',  sub: '3 days ago', model: 'kimi'     },
  ];

  return (
    <div className="page-enter" style={{ display: 'grid', gridTemplateColumns: `${collapsed ? 68 : 248}px 1fr 320px`, height: 'calc(100vh - 60px)', background: '#0a0a0a' }}>
      {/* SIDEBAR */}
      <aside style={{ borderRight: '1px solid var(--border)', background: 'rgba(13,13,13,0.6)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        <button className="btn-primary" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, justifyContent: collapsed ? 'center' : 'flex-start', fontSize: 13.5 }}>
          <Icon name="plus" size={15} />
          {!collapsed && 'New chat'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sidebar.map(s => (
            <SidebarItem key={s.id} {...s} active={active === s.id} onClick={() => {
              setActive(s.id);
              if (s.id === 'compare') setPage('compare');
              if (s.id === 'billing') setPage('pricing');
              if (s.id === 'settings') setPage('settings');
              if (s.id === 'keys') openApiKeys();
              if (s.id === 'models') openModelPicker();
            }} collapsed={collapsed} />
          ))}
        </div>

        {!collapsed && (
          <>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--muted-2)', padding: '12px 8px 4px' }}>Recent</div>
            <div className="scroll-y" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, marginRight: -6, paddingRight: 6 }}>
              {recent.map((r, i) => (
                <div key={i} style={{ padding: '8px 10px', borderRadius: 8, cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', minWidth: 0, transition: 'background .15s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <ModelGlyph id={r.model} size={14} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#E4E4E7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 13 }}>R</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Rafiul Hasan</div>
                <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>Pro plan</div>
              </div>
              <Icon name="cog" size={14} stroke="#71717A" />
            </div>
          ) : (
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 13 }}>R</div>
            </div>
          )}
          <button className="btn-ghost" style={{ width: '100%', marginTop: 8, padding: '6px 8px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => setCollapsed(c => !c)}>
            <Icon name="menu" size={12} /> {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: 60, borderBottom: '1px solid var(--border)', padding: '0 22px', display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(10px)' }}>
          <button onClick={openModelPicker} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, padding: '7px 12px 7px 8px', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
            <div className={m.halo} style={{ width: 24, height: 24, borderRadius: 7, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
              <ModelGlyph id={m.id} size={14} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', letterSpacing: 0.4 }}>{m.tag}</div>
            </div>
            <Icon name="arrow" size={12} stroke="#71717A" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', flex: 1, maxWidth: 420 }}>
            <Icon name="search" size={14} stroke="#71717A" />
            <input placeholder="Search across all chats…" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 13, flex: 1 }} />
            <span className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}>⌘K</span>
          </div>

          <div style={{ flex: 1 }} />
          <div style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
            <span className="mono" style={{ fontSize: 11, color: '#86EFAC' }}>1.42M tok · this mo</span>
          </div>
          <button className="btn-ghost" style={{ padding: '8px 10px', position: 'relative' }}>
            <Icon name="bell" size={14} />
            <span style={{ position: 'absolute', top: 6, right: 7, width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 13 }}>R</div>
        </div>

        <div ref={scrollRef} className="scroll-y" style={{ flex: 1, padding: '32px 64px', maxWidth: 920, width: '100%', margin: '0 auto' }}>
          {history.map((msg, i) => <ChatBubble key={i} msg={msg} isStreaming={false} />)}
          {streaming && <ChatBubble msg={{ role: 'ai', model: currentModel, text: '' }} isStreaming={true} />}
          {streaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 12.5, marginLeft: 44 }}>
              <span className="mono">{m.name} is thinking</span>
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          )}
        </div>

        <div style={{ padding: '0 64px 24px' }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div className={`card ${compareMode ? 'glow-ring' : ''}`} style={{ padding: 14, background: 'rgba(17,17,17,0.85)', backdropFilter: 'blur(20px)', borderColor: compareMode ? 'rgba(124,58,237,0.45)' : 'var(--border)', boxShadow: '0 -10px 40px -10px rgba(0,0,0,0.6)' }}>
              <textarea
                rows={2} value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={compareMode ? 'Compare mode · send to 3 models at once…' : `Message ${m.name}…`}
                style={{ background: 'transparent', border: 'none', outline: 'none', resize: 'none', width: '100%', color: '#fff', fontSize: 15, fontFamily: 'inherit', lineHeight: 1.5, padding: '4px 4px 8px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="btn-ghost" style={{ padding: '8px 10px' }}><Icon name="paperclip" size={15} /></button>
                <button className="btn-ghost" style={{ padding: '8px 10px' }}><Icon name="mic" size={15} /></button>
                <button onClick={() => setCompareMode(c => !c)} style={{
                  background: compareMode ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)',
                  borderColor: compareMode ? 'rgba(124,58,237,0.45)' : 'var(--border)',
                  color: compareMode ? '#C4B5FD' : '#E4E4E7',
                  border: '1px solid', borderRadius: 10, padding: '8px 12px', fontFamily: 'inherit', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                }}>
                  <Icon name="compare" size={14} /> Compare
                </button>
                <div style={{ flex: 1 }} />
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>↵ to send · ⇧↵ for newline</div>
                <button className="btn-primary" style={{ padding: '9px 14px', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }} onClick={send} disabled={streaming}>
                  Send <Icon name="send" size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside style={{ borderLeft: '1px solid var(--border)', background: 'rgba(13,13,13,0.6)', padding: '20px 18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--muted-2)' }}>Current model</div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className={m.halo} style={{ width: 42, height: 42, borderRadius: 11, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
              <ModelGlyph id={m.id} size={24} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{m.vendor}</div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Metric label="Speed"           value={`${m.speed}/100`} bar={m.speed} tone="green" />
            <Metric label="Intelligence"    value={`${m.iq}/100`}   bar={m.iq}    tone="violet" />
            <Metric label="Cost efficiency" value={m.cost}          bar={m.cost === 'Free' ? 100 : m.cost === 'Low' ? 80 : m.cost === 'Med' ? 55 : 30} tone="cyan" />
          </div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Context window</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 600 }}>200K</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>tokens</div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: '18%', height: '100%', background: 'linear-gradient(90deg, #7C3AED, #00D4FF)' }} />
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', marginTop: 6 }}>36,420 / 200,000 used</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', letterSpacing: 0.6, textTransform: 'uppercase' }}>This chat</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 6 }}>5,240</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>tokens used</div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Est. cost</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 6 }}>$0.21</div>
            <div style={{ fontSize: 11, color: '#22C55E' }}>↓ 38% vs direct</div>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="sparkles" size={14} stroke="#C4B5FD" />
            <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name} excels at</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(m.id === 'claude' ? ['Long-context analysis', 'Nuanced writing', 'Code review', 'Multi-step reasoning'] :
              m.id === 'gpt5'  ? ['General reasoning', 'Creative writing', 'Image understanding', 'Tool use'] :
              ['Multimodal tasks', 'Search-grounded answers', 'Fast retrieval', 'Translation']).map((s, i) => (
              <div key={i} style={{ fontSize: 12.5, color: '#E4E4E7', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: m.accent, boxShadow: `0 0 8px ${m.accent}` }} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <button className="btn-ghost" style={{ padding: '10px 14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13 }} onClick={openModelPicker}>
          <Icon name="route" size={14} /> Switch model
        </button>
      </aside>
    </div>
  );
}
