'use client';

import { useState, useEffect } from 'react';
import { Pill } from './shared';
import { ModelGlyph, MODELS, MODEL_BY_ID } from './models';
import { Icon } from './icons';

function costRank(c: string) { return c === 'Free' ? 0 : c === 'Low' ? 1 : c === 'Med' ? 2 : 3; }

function Stat({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
      <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted-2)', letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{value}{suffix && <span style={{ color: 'var(--muted-2)', fontSize: 10, marginLeft: 1 }}>{suffix}</span>}</div>
    </div>
  );
}

export function ModelPickerModal({ open, onClose, currentModel, setCurrentModel }: {
  open: boolean; onClose: () => void; currentModel: string; setCurrentModel: (m: string) => void;
}) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filters = [
    { id: 'all',   label: 'All models' },
    { id: 'fast',  label: 'Fastest'    },
    { id: 'iq',    label: 'Smartest'   },
    { id: 'cheap', label: 'Cheapest'   },
    { id: 'open',  label: 'Open weight'},
  ];

  let list = MODELS.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.best.toLowerCase().includes(q.toLowerCase()));
  if (filter === 'fast')  list = [...list].sort((a, b) => b.speed - a.speed);
  if (filter === 'iq')    list = [...list].sort((a, b) => b.iq - a.iq);
  if (filter === 'cheap') list = [...list].sort((a, b) => costRank(a.cost) - costRank(b.cost));
  if (filter === 'open')  list = list.filter(m => m.id === 'llama' || m.id === 'mistral' || m.id === 'deepseek');

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 20, animation: 'rise .25s ease both' }}>
      <div onClick={e => e.stopPropagation()} className="card glow-ring" style={{ width: 'min(820px, 92vw)', maxHeight: '85vh', display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.7), 0 0 80px -20px rgba(124,58,237,0.4)' }}>
        <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', display: 'grid', placeItems: 'center' }}>
              <Icon name="cube" size={18} stroke="#C4B5FD" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 600 }}>Select a model</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>Choose the brain behind your next answer</div>
            </div>
            <button onClick={onClose} className="btn-ghost" style={{ padding: '8px 10px' }}><Icon name="close" size={14} /></button>
          </div>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
            <Icon name="search" size={15} stroke="#71717A" />
            <input
              autoFocus value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search models, e.g. 'long context' or 'code'…"
              style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, color: '#fff', fontFamily: 'inherit', fontSize: 14 }}
            />
            <span className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}>esc</span>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            {filters.map(f => (
              <div key={f.id} onClick={() => setFilter(f.id)} className={`nav-tab ${filter === f.id ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: 12.5, borderRadius: 8 }}>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-y" style={{ flex: 1, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {list.map(m => {
              const isCurrent = m.id === currentModel;
              return (
                <div key={m.id} onClick={() => { setCurrentModel(m.id); onClose(); }} className="card-hover"
                  style={{ padding: 16, borderRadius: 14, border: '1px solid', borderColor: isCurrent ? 'rgba(124,58,237,0.45)' : 'var(--border)', background: isCurrent ? 'rgba(124,58,237,0.06)' : 'var(--card)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div className={m.halo} style={{ width: 36, height: 36, borderRadius: 10, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
                      <ModelGlyph id={m.id} size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                        {isCurrent && <Pill tone="violet">Current</Pill>}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{m.vendor} · {m.tag}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#E4E4E7', lineHeight: 1.45 }}>{m.best}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    <Stat label="Speed" value={m.speed} suffix="/100" />
                    <Stat label="IQ"    value={m.iq}    suffix="/100" />
                    <Stat label="Cost"  value={m.cost} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>{list.length} models · ↑↓ to navigate · ↵ to select</div>
          <div style={{ flex: 1 }} />
          <Pill tone="cyan">Smart routing on</Pill>
        </div>
      </div>
    </div>
  );
}

interface ApiKey { id: number; provider: string; glyph: string; key: string; status: 'active' | 'expired'; added: string; limit: string; }

const selStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
  outline: 'none', padding: '10px 12px', borderRadius: 10, color: '#fff',
  fontFamily: 'inherit', fontSize: 13,
};

export function ApiKeysModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [keys] = useState<ApiKey[]>([
    { id: 1, provider: 'OpenAI',    glyph: 'gpt5',   key: 'sk-pk-•••••••••••••••••••••••3F2A',  status: 'active',  added: '12 Apr 2026', limit: '$200 / mo' },
    { id: 2, provider: 'Anthropic', glyph: 'claude', key: 'sk-ant-•••••••••••••••••••••a9C1',   status: 'active',  added: '12 Apr 2026', limit: '$150 / mo' },
    { id: 3, provider: 'Google',    glyph: 'gemini', key: 'AIza•••••••••••••••••••••••U7Kp',   status: 'expired', added: '02 Feb 2026', limit: '$50 / mo'  },
  ]);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 20, animation: 'rise .25s ease both' }}>
      <div onClick={e => e.stopPropagation()} className="card" style={{ width: 'min(720px, 92vw)', maxHeight: '85vh', display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden' }}>
        <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', display: 'grid', placeItems: 'center' }}>
            <Icon name="key" size={18} stroke="#7DD3FC" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 600 }}>API key manager</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Use your own provider keys · Ultimate plan</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '8px 10px' }}><Icon name="close" size={14} /></button>
        </div>

        <div className="scroll-y" style={{ flex: 1, padding: '18px 22px' }}>
          <div style={{ padding: '14px 16px', borderRadius: 14, background: 'linear-gradient(120deg, rgba(124,58,237,0.10), rgba(0,212,255,0.08))', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <Icon name="shield" size={18} stroke="#C4B5FD" />
            <div style={{ fontSize: 13, color: '#E4E4E7', lineHeight: 1.5, flex: 1 }}>
              Your keys are encrypted at rest with AES-256 and never logged. We only use them to forward your prompts.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {keys.map(k => (
              <div key={k.id} className="card-hover" style={{ padding: '14px 16px', borderRadius: 14, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#0a0a0a', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                  <ModelGlyph id={k.glyph} size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{k.provider}</div>
                    {k.status === 'active' ? <Pill tone="green">● Active</Pill> : <Pill tone="orange">Expired</Pill>}
                  </div>
                  <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted-2)', marginTop: 3 }}>{k.key}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{k.limit}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', marginTop: 2 }}>added {k.added}</div>
                </div>
                <button className="btn-ghost" style={{ padding: '7px 9px' }}><Icon name="refresh" size={13} /></button>
                <button className="btn-ghost" style={{ padding: '7px 9px' }}><Icon name="close" size={13} /></button>
              </div>
            ))}
          </div>

          {!adding ? (
            <button className="btn-ghost" onClick={() => setAdding(true)} style={{ width: '100%', marginTop: 14, padding: '12px 16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Icon name="plus" size={14} /> Add new key
            </button>
          ) : (
            <div className="card glow-ring" style={{ padding: 16, marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Add provider key</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <select style={selStyle}>
                  <option>OpenAI</option><option>Anthropic</option><option>Google</option>
                  <option>xAI</option><option>Mistral</option><option>DeepSeek</option>
                </select>
                <input placeholder="Monthly limit (USD)" style={selStyle} />
                <input placeholder="sk-..." style={{ ...selStyle, gridColumn: '1 / -1', fontFamily: 'JetBrains Mono, monospace' }} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn-ghost" onClick={() => setAdding(false)} style={{ padding: '9px 14px', fontSize: 13 }}>Cancel</button>
                <div style={{ flex: 1 }} />
                <button className="btn-primary" onClick={() => setAdding(false)} style={{ padding: '9px 16px', fontSize: 13 }}>Save key</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
