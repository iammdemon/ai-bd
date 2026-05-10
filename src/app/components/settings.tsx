'use client';

import { useState } from 'react';
import { Pill, Page } from './shared';
import { ModelGlyph, MODELS, MODEL_BY_ID } from './models';
import { Icon } from './icons';

const selStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
  outline: 'none', padding: '9px 12px', borderRadius: 10, color: '#fff',
  fontFamily: 'inherit', fontSize: 13, width: 240,
};

function SettingsCard({ title, desc, children, tone }: { title: string; desc?: string; children: React.ReactNode; tone?: 'danger' | 'primary'; }) {
  const isDanger = tone === 'danger';
  return (
    <div className="card" style={{
      padding: '22px 24px',
      borderColor: tone === 'primary' ? 'rgba(124,58,237,0.3)' : isDanger ? 'rgba(239,68,68,0.2)' : 'var(--border)',
      background: tone === 'primary' ? 'linear-gradient(180deg, rgba(124,58,237,0.04), transparent 60%), var(--card)' : 'var(--card)',
    }}>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 600, color: isDanger ? '#FCA5A5' : '#fff' }}>{title}</div>
      {desc && <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{desc}</div>}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'center' }}>
      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange?.(! value)} style={{
      width: 42, height: 24, borderRadius: 14, padding: 2,
      background: value ? 'linear-gradient(135deg, #7C3AED, #00D4FF)' : 'rgba(255,255,255,0.08)',
      cursor: 'pointer', transition: 'background .2s ease',
      boxShadow: value ? '0 0 14px -2px rgba(124,58,237,0.55)' : 'none',
    }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: value ? 'translateX(18px)' : 'translateX(0)', transition: 'transform .2s ease' }} />
    </div>
  );
}

function SegmentedControl({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { id: string; label: string; disabled?: boolean }[] }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10 }}>
      {options.map(o => (
        <div key={o.id} onClick={() => !o.disabled && onChange(o.id)} style={{
          padding: '7px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 500, cursor: o.disabled ? 'not-allowed' : 'pointer',
          background: value === o.id ? 'rgba(255,255,255,0.08)' : 'transparent',
          color: o.disabled ? 'var(--muted-2)' : value === o.id ? '#fff' : 'var(--muted)',
          transition: 'background .15s ease, color .15s ease',
        }}>
          {o.label}
        </div>
      ))}
    </div>
  );
}

export function SettingsPage({ setPage, openApiKeys }: { setPage: (p: Page) => void; openApiKeys: () => void }) {
  const [tab, setTab] = useState('general');
  const [defaultModel, setDefaultModel] = useState('claude');
  const [theme, setTheme] = useState('dark');
  const [streamSpeed, setStreamSpeed] = useState('fast');
  const [voice, setVoice] = useState(true);
  const [autoRoute, setAutoRoute] = useState(true);

  const tabs = [
    { id: 'general',  label: 'General',       icon: 'cog'    },
    { id: 'models',   label: 'Models',         icon: 'cube'   },
    { id: 'routing',  label: 'Smart routing',  icon: 'route'  },
    { id: 'keys',     label: 'API keys',       icon: 'key'    },
    { id: 'billing',  label: 'Billing',        icon: 'card'   },
    { id: 'account',  label: 'Account',        icon: 'shield' },
  ];

  return (
    <div className="page-enter" style={{ padding: '48px 28px 80px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Pill>Settings</Pill>
        <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginTop: 14 }}>Workspace settings</h1>
        <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 15 }}>Configure your AI workspace — defaults, routing rules, keys, and account.</p>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tabs.map(t => (
              <div key={t.id} onClick={() => {
                if (t.id === 'keys') { openApiKeys(); return; }
                if (t.id === 'billing') { setPage('pricing'); return; }
                setTab(t.id);
              }} className={`nav-tab ${tab === t.id ? 'active' : ''}`} style={{ padding: '10px 12px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name={t.icon} size={15} /> <span>{t.label}</span>
              </div>
            ))}
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tab === 'general' && (
              <>
                <SettingsCard title="Appearance" desc="Theme and visual preferences">
                  <Field label="Theme">
                    <SegmentedControl value={theme} onChange={setTheme}
                      options={[{ id: 'dark', label: 'Dark' }, { id: 'system', label: 'System' }, { id: 'light', label: 'Light (soon)', disabled: true }]} />
                  </Field>
                  <Field label="Accent color">
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['#7C3AED', '#00D4FF', '#22C55E', '#F59E0B', '#EC4899'].map((c, i) => (
                        <div key={c} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid', borderColor: i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)', cursor: 'pointer', boxShadow: `0 0 16px -4px ${c}` }} />
                      ))}
                    </div>
                  </Field>
                  <Field label="Reduce motion"><Toggle value={false} /></Field>
                </SettingsCard>

                <SettingsCard title="Chat behavior" desc="How chat looks and feels">
                  <Field label="Stream speed">
                    <SegmentedControl value={streamSpeed} onChange={setStreamSpeed} options={[{ id: 'fast', label: 'Fast' }, { id: 'normal', label: 'Normal' }, { id: 'slow', label: 'Slow' }]} />
                  </Field>
                  <Field label="Voice input"><Toggle value={voice} onChange={setVoice} /></Field>
                  <Field label="Send with Enter"><Toggle value={true} /></Field>
                  <Field label="Show token counts inline"><Toggle value={true} /></Field>
                </SettingsCard>

                <SettingsCard title="Privacy" desc="What we do with your data" tone="danger">
                  <Field label="Use my chats to improve OneAI Hub"><Toggle value={false} /></Field>
                  <Field label="Auto-delete chat history">
                    <select style={selStyle}><option>Never</option><option>After 30 days</option><option>After 90 days</option></select>
                  </Field>
                  <Field label="">
                    <button className="btn-ghost" style={{ padding: '9px 14px', fontSize: 13, color: '#FCA5A5', borderColor: 'rgba(239,68,68,0.3)' }}>Delete all chat history</button>
                  </Field>
                </SettingsCard>
              </>
            )}

            {tab === 'models' && (
              <>
                <SettingsCard title="Default model" desc="The model that opens with every new chat">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {MODELS.map(m => (
                      <div key={m.id} onClick={() => setDefaultModel(m.id)} className="card-hover" style={{
                        padding: 12, borderRadius: 12, border: '1px solid', borderColor: defaultModel === m.id ? 'rgba(124,58,237,0.5)' : 'var(--border)',
                        background: defaultModel === m.id ? 'rgba(124,58,237,0.06)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11,
                      }}>
                        <div className={m.halo} style={{ width: 32, height: 32, borderRadius: 9, background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
                          <ModelGlyph id={m.id} size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.name}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{m.tag}</div>
                        </div>
                        {defaultModel === m.id && <Icon name="check" size={14} stroke="#C4B5FD" />}
                      </div>
                    ))}
                  </div>
                </SettingsCard>

                <SettingsCard title="Hidden models" desc="Models you don't want to see in the picker">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {MODELS.map(m => (
                      <div key={m.id} style={{ padding: '6px 10px 6px 6px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, cursor: 'pointer' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#0a0a0a', display: 'grid', placeItems: 'center' }}>
                          <ModelGlyph id={m.id} size={11} />
                        </div>
                        {m.name}
                        <Icon name="close" size={11} stroke="#71717A" />
                      </div>
                    ))}
                  </div>
                </SettingsCard>
              </>
            )}

            {tab === 'routing' && (
              <>
                <SettingsCard title="Smart routing" desc="Let our router pick the best model for each prompt" tone="primary">
                  <Field label="Enable smart routing"><Toggle value={autoRoute} onChange={setAutoRoute} /></Field>
                  <Field label="Routing strategy">
                    <SegmentedControl value="balanced" onChange={() => {}} options={[{ id: 'cheap', label: 'Cheapest' }, { id: 'balanced', label: 'Balanced' }, { id: 'best', label: 'Best quality' }]} />
                  </Field>
                  <Field label="Monthly budget cap">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input defaultValue="50" style={{ ...selStyle, width: 100 }} />
                      <span style={{ color: 'var(--muted)', fontSize: 13 }}>USD · alert at 80%</span>
                    </div>
                  </Field>
                </SettingsCard>

                <SettingsCard title="Custom routing rules" desc="When this happens → use this model">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { when: 'Prompt contains code', then: 'deepseek' },
                      { when: 'Prompt is in Bangla',  then: 'claude'   },
                      { when: 'File upload > 5MB',    then: 'gemini'   },
                      { when: 'Long context > 50k',   then: 'claude'   },
                    ].map((r, i) => (
                      <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, fontSize: 13.5 }}>
                        <Icon name="lightning" size={13} stroke="#F59E0B" />
                        <span style={{ color: 'var(--muted)' }}>When</span>
                        <span>{r.when}</span>
                        <Icon name="arrow" size={12} stroke="#71717A" />
                        <span style={{ color: 'var(--muted)' }}>use</span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 6px', borderRadius: 8, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)' }}>
                          <ModelGlyph id={r.then} size={13} />
                          <span style={{ fontSize: 12.5, fontWeight: 500 }}>{MODEL_BY_ID[r.then].name}</span>
                        </div>
                        <div style={{ flex: 1 }} />
                        <Icon name="close" size={13} stroke="#71717A" />
                      </div>
                    ))}
                    <button className="btn-ghost" style={{ padding: '9px 14px', fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Icon name="plus" size={12} /> Add rule
                    </button>
                  </div>
                </SettingsCard>
              </>
            )}

            {tab === 'account' && (
              <>
                <SettingsCard title="Profile" desc="">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4FF)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 24 }}>R</div>
                    <button className="btn-ghost" style={{ padding: '8px 12px', fontSize: 13 }}>Change avatar</button>
                  </div>
                  <Field label="Name"><input defaultValue="Rafiul Hasan" style={selStyle} /></Field>
                  <Field label="Email"><input defaultValue="rafiul@example.com" style={selStyle} /></Field>
                </SettingsCard>

                <SettingsCard title="Plan" desc="">
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Icon name="lightning" size={20} stroke="#C4B5FD" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>Pro plan · 990 TK / month</div>
                      <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Renews 12 Jun · 5 frontier models · unlimited chats</div>
                    </div>
                    <button className="btn-ghost" style={{ padding: '9px 14px', fontSize: 13 }} onClick={() => setPage('pricing')}>Change plan</button>
                  </div>
                </SettingsCard>

                <SettingsCard title="Danger zone" desc="" tone="danger">
                  <button className="btn-ghost" style={{ padding: '9px 14px', fontSize: 13, color: '#FCA5A5', borderColor: 'rgba(239,68,68,0.3)' }}>Export all data</button>
                  <button className="btn-ghost" style={{ padding: '9px 14px', fontSize: 13, color: '#FCA5A5', borderColor: 'rgba(239,68,68,0.3)', marginLeft: 8 }}>Delete account</button>
                </SettingsCard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
