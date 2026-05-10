'use client';

export const MODELS = [
  { id: 'gpt5',     name: 'GPT-5',    vendor: 'OpenAI lineage',    hue: 142, accent: '#22C55E', halo: 'halo-green',  speed: 92, iq: 96, cost: 'High', best: 'General reasoning, writing',    tag: 'Generalist' },
  { id: 'claude',   name: 'Claude',   vendor: 'Anthropic lineage', hue: 28,  accent: '#F59E0B', halo: 'halo-orange', speed: 88, iq: 97, cost: 'High', best: 'Long context, analysis',         tag: 'Reasoner'   },
  { id: 'gemini',   name: 'Gemini',   vendor: 'Google lineage',    hue: 200, accent: '#00D4FF', halo: 'halo-blue',   speed: 95, iq: 93, cost: 'Med',  best: 'Multimodal, search-grounded',   tag: 'Multimodal' },
  { id: 'grok',     name: 'Grok',     vendor: 'xAI lineage',       hue: 260, accent: '#A78BFA', halo: 'halo-violet', speed: 90, iq: 91, cost: 'Med',  best: 'Real-time, witty tone',         tag: 'Real-time'  },
  { id: 'kimi',     name: 'Kimi',     vendor: 'Moonshot lineage',  hue: 320, accent: '#EC4899', halo: 'halo-pink',   speed: 89, iq: 90, cost: 'Low',  best: 'Long docs, Chinese + EN',       tag: 'Long-doc'   },
  { id: 'deepseek', name: 'DeepSeek', vendor: 'DeepSeek lineage',  hue: 220, accent: '#60A5FA', halo: 'halo-blue',   speed: 94, iq: 92, cost: 'Low',  best: 'Code, math, cheap+fast',        tag: 'Code'       },
  { id: 'mistral',  name: 'Mistral',  vendor: 'Mistral lineage',   hue: 18,  accent: '#FB923C', halo: 'halo-orange', speed: 96, iq: 88, cost: 'Low',  best: 'Fast, open-weight',             tag: 'Fast'       },
  { id: 'llama',    name: 'Llama',    vendor: 'Meta lineage',      hue: 280, accent: '#C084FC', halo: 'halo-violet', speed: 91, iq: 89, cost: 'Free', best: 'Open-source, self-host',        tag: 'Open'       },
];

export const MODEL_BY_ID = Object.fromEntries(MODELS.map(m => [m.id, m]));
export type Model = typeof MODELS[number];

export function ModelGlyph({ id, size = 22, className = '' }: { id: string; size?: number; className?: string }) {
  const m = MODEL_BY_ID[id];
  if (!m) return null;
  const c = m.accent;
  const common = { width: size, height: size, viewBox: '0 0 24 24', className, style: { display: 'block' } as React.CSSProperties, fill: 'none' as const };
  switch (id) {
    case 'gpt5':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" opacity="0.5"/>
          <circle cx="12" cy="12" r="4" fill={c} opacity="0.9"/>
          <circle cx="12" cy="12" r="2" fill="#090909"/>
        </svg>
      );
    case 'claude':
      return (
        <svg {...common}>
          <path d="M5 17 L9 7 L11 7 L8 17 Z" fill={c}/>
          <path d="M13 7 L15 7 L19 17 L17 17 Z" fill={c} opacity="0.85"/>
        </svg>
      );
    case 'gemini':
      return (
        <svg {...common}>
          <path d="M12 3 L13 11 L21 12 L13 13 L12 21 L11 13 L3 12 L11 11 Z" fill={c}/>
        </svg>
      );
    case 'grok':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" fill={c}/>
          <rect x="13" y="13" width="7" height="7" fill={c}/>
          <rect x="13" y="4" width="7" height="7" stroke={c} strokeWidth="1.6"/>
          <rect x="4" y="13" width="7" height="7" stroke={c} strokeWidth="1.6"/>
        </svg>
      );
    case 'kimi':
      return (
        <svg {...common}>
          <circle cx="8" cy="12" r="5" fill={c} opacity="0.4"/>
          <circle cx="14" cy="12" r="5" fill={c} opacity="0.8"/>
        </svg>
      );
    case 'deepseek':
      return (
        <svg {...common}>
          <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="none" stroke={c} strokeWidth="1.6"/>
          <path d="M12 8 L16 12 L12 16 L8 12 Z" fill={c}/>
        </svg>
      );
    case 'mistral':
      return (
        <svg {...common}>
          <rect x="4"  y="4" width="4" height="16" fill={c}/>
          <rect x="10" y="4" width="4" height="10" fill={c} opacity="0.7"/>
          <rect x="16" y="4" width="4" height="16" fill={c}/>
        </svg>
      );
    case 'llama':
      return (
        <svg {...common}>
          <path d="M4 20 L8 6 L11 10 L14 6 L18 12 L20 20 Z" fill={c}/>
        </svg>
      );
    default:
      return null;
  }
}
