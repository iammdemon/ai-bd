'use client';

import { Pill, OrbBackdrop, Page } from './shared';
import { Icon } from './icons';

function th(highlight?: boolean): React.CSSProperties {
  return {
    padding: '16px 20px', textAlign: 'left', fontSize: 11.5, letterSpacing: 0.8, textTransform: 'uppercase',
    color: highlight ? '#C4B5FD' : '#71717A', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace',
    background: highlight ? 'rgba(124,58,237,0.06)' : 'transparent',
  };
}
function td(kind?: string): React.CSSProperties {
  const base: React.CSSProperties = { padding: '14px 20px', fontSize: 13.5, color: '#E4E4E7' };
  if (kind === 'label') return { ...base, color: '#A1A1AA' };
  if (kind === 'pro')   return { ...base, background: 'rgba(124,58,237,0.04)', color: '#fff', fontWeight: 500 };
  return base;
}

export function PricingPage({ setPage }: { setPage: (p: Page) => void }) {
  const tiers = [
    {
      id: 'free', name: 'Free', tagline: 'For tinkerers and students',
      price: '0', unit: 'TK / month', cta: 'Start free', ctaStyle: 'ghost',
      features: ['1 AI model at a time', '50 messages / day', 'Basic chat + history (7 days)', 'Compare mode (1 prompt/day)', 'Community support'],
      excluded: ['Frontier models locked', 'No file upload'],
      popular: false,
    },
    {
      id: 'pro', name: 'Pro', tagline: 'For serious daily users',
      price: '990', unit: 'TK / month', cta: 'Upgrade to Pro', ctaStyle: 'primary',
      features: ['GPT-5, Claude, Gemini, Grok, Kimi', 'Unlimited chats', 'File & image upload (50MB)', 'Full searchable history', 'Multi-AI compare (4 models)', 'Smart routing + merge', 'Faster response queue', 'Email support'],
      excluded: [],
      popular: true,
    },
    {
      id: 'ultimate', name: 'Ultimate', tagline: 'For agencies & power users',
      price: '200', unit: 'TK platform fee + your API keys', cta: 'Go Ultimate', ctaStyle: 'ghost',
      features: ['Bring your own API keys', 'Unlimited personal usage', 'Advanced model settings', 'API key manager + rotation', 'Full analytics dashboard', 'Team seats (5 included)', 'Priority email + chat support', 'SSO + audit log'],
      excluded: [],
      popular: false,
    },
  ];

  return (
    <div className="page-enter" style={{ position: 'relative' }}>
      <section style={{ padding: '72px 28px 48px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <OrbBackdrop intensity={0.6} />
        <div style={{ position: 'relative', maxWidth: 980, margin: '0 auto' }}>
          <Pill tone="violet">Pricing</Pill>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, marginTop: 18 }}>
            Less than one frontier subscription.<br />
            <span style={{ color: 'var(--muted)' }}>Access to all of them.</span>
          </h1>
          <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '18px auto 0', fontSize: 16, lineHeight: 1.55 }}>
            Cancel anytime. No card on free. Switch tiers in one click — we prorate to the second.
          </p>
          <div style={{ display: 'inline-flex', marginTop: 30, padding: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', fontSize: 13, fontWeight: 500 }}>Monthly</div>
            <div style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Yearly <Pill tone="green">Save 20%</Pill>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '12px 28px 60px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.08fr 1fr', gap: 18, alignItems: 'stretch' }}>
          {tiers.map(t => (
            <div key={t.id}
              className={t.popular ? 'glow-ring' : ''}
              style={{
                background: t.popular ? 'linear-gradient(180deg, rgba(124,58,237,0.10), transparent 30%), var(--card)' : 'var(--card)',
                border: '1px solid', borderColor: t.popular ? 'rgba(124,58,237,0.45)' : 'var(--border)',
                borderRadius: 22, padding: t.popular ? '34px 30px' : '30px 28px',
                position: 'relative', boxShadow: t.popular ? '0 24px 70px -20px rgba(124,58,237,0.35)' : 'none',
                display: 'flex', flexDirection: 'column',
              }}>
              {t.popular && (
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="mono" style={{
                    fontSize: 10.5, letterSpacing: 1.2, textTransform: 'uppercase',
                    padding: '6px 14px', borderRadius: 999,
                    background: 'linear-gradient(135deg, #7C3AED, #00D4FF)',
                    color: 'white', fontWeight: 600, boxShadow: '0 4px 14px -2px rgba(124,58,237,0.6)',
                  }}>
                    ★  Most popular
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center',
                  background: t.popular ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid', borderColor: t.popular ? 'rgba(124,58,237,0.35)' : 'var(--border)',
                }}>
                  <Icon name={t.id === 'free' ? 'spark' : t.id === 'pro' ? 'lightning' : 'shield'} size={18} stroke={t.popular ? '#C4B5FD' : '#A1A1AA'} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{t.tagline}</div>
                </div>
              </div>

              <div style={{ marginTop: 26, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 52, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1 }}>
                  <span style={{ color: 'var(--muted-2)', fontSize: 24, fontWeight: 500, marginRight: 2 }}>৳</span>{t.price}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6, minHeight: 32 }}>{t.unit}</div>

              <button
                className={t.ctaStyle === 'primary' ? 'btn-primary' : 'btn-ghost'}
                style={{ marginTop: 22, padding: '13px 18px', fontSize: 14, width: '100%' }}
                onClick={() => setPage('dashboard')}>
                {t.cta}
              </button>

              <div style={{ marginTop: 26, borderTop: '1px solid var(--border)', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: 0.8, color: 'var(--muted-2)', textTransform: 'uppercase' }}>What&apos;s included</div>
                {t.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#E4E4E7', lineHeight: 1.5 }}>
                    <div style={{
                      marginTop: 2, width: 18, height: 18, borderRadius: '50%',
                      background: t.popular ? 'rgba(124,58,237,0.18)' : 'rgba(34,197,94,0.12)',
                      display: 'grid', placeItems: 'center', flexShrink: 0,
                    }}>
                      <Icon name="check" size={11} stroke={t.popular ? '#C4B5FD' : '#86EFAC'} />
                    </div>
                    {f}
                  </div>
                ))}
                {t.excluded.map((f, i) => (
                  <div key={'ex' + i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--muted-2)', lineHeight: 1.5, textDecoration: 'line-through' }}>
                    <div style={{ marginTop: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Icon name="close" size={11} stroke="#71717A" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              {t.id === 'ultimate' && (
                <div style={{ marginTop: 22, padding: '12px 14px', borderRadius: 12, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.20)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name="key" size={16} stroke="#7DD3FC" />
                  <div style={{ fontSize: 12.5, color: '#BAE6FD', lineHeight: 1.4 }}>Best for agencies & power users — only pay providers directly.</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '40px 28px 80px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Pill>Compare plans</Pill>
            <h2 style={{ fontSize: 32, marginTop: 14 }}>Detailed breakdown</h2>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th style={th()}>Feature</th>
                  <th style={th()}>Free</th>
                  <th style={th(true)}>Pro</th>
                  <th style={th()}>Ultimate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Frontier models', 'GPT-5 only',    'All 8 models',    'All + your keys'],
                  ['Daily messages',  '50',             'Unlimited',        'Unlimited'],
                  ['Compare models',  '1 / day',        'Up to 4',         'Up to 8'],
                  ['File upload',     '—',              '50 MB',           'No limit'],
                  ['Chat history',    '7 days',         'Forever',         'Forever + export'],
                  ['Smart routing',   '—',              '✓',               '✓ + custom rules'],
                  ['API keys',        '—',              '—',               '✓ Unlimited'],
                  ['Team seats',      '—',              '—',               '5 included'],
                  ['Support',         'Community',      'Email · 24h',     'Priority · 4h'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={td('label')}>{row[0]}</td>
                    <td style={td()}>{row[1]}</td>
                    <td style={td('pro')}>{row[2]}</td>
                    <td style={td()}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 28px 100px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 32 }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'Why is this cheaper than buying each AI separately?', a: 'We negotiate volume pricing with every provider and route prompts efficiently. Combined with our own infrastructure for caching and streaming, we pass the savings on.' },
              { q: 'What does "Bring your own API key" mean?', a: 'On Ultimate, you plug in your existing keys from OpenAI, Anthropic, Google, etc. We orchestrate, you pay providers directly. We only charge the 200 TK platform fee.' },
              { q: 'Can I switch between models mid-conversation?', a: 'Yes — pick any model from the top selector at any time. We keep the full conversation context and re-feed it to the new model.' },
              { q: 'How does the merge feature work?', a: 'After comparing 2–4 models, the merger reads all responses, scores paragraphs, and stitches the strongest sections into a single answer with inline citations.' },
            ].map((f, i) => (
              <details key={i} className="card" style={{ padding: '18px 22px', cursor: 'pointer' }}>
                <summary style={{ display: 'flex', alignItems: 'center', gap: 12, listStyle: 'none', cursor: 'pointer' }}>
                  <Icon name="plus" size={14} stroke="#A1A1AA" />
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{f.q}</div>
                </summary>
                <div style={{ marginTop: 12, marginLeft: 26, color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
