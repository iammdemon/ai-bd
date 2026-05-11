'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

interface ModelsPageProps {
  setPage: (p: Page) => void;
  openModelPicker: () => void;
  openApiKeys: () => void;
}

export function ModelsPage({ setPage, openModelPicker, openApiKeys }: ModelsPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('models');
  const [filter, setFilter] = useState<'All' | 'Text' | 'Vision' | 'Audio'>('All');

  // Monitor auth status
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
      console.error('Sign out error', err);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      
      {/* 1. LEFT NAVIGATION PANEL */}
      <aside style={styles.sidebar}>
        <div>
          {/* Logo Heading */}
          <div style={styles.logoRow}>
            <div style={styles.logoBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#fff" />
              </svg>
            </div>
            <div>
              <div style={styles.logoText}>OneAI Hub</div>
              <div style={styles.logoSubtext}>Pro Plan</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={styles.navMenu}>
            <button 
              onClick={() => setPage('dashboard')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9" rx="1" />
                <rect x="14" y="3" width="7" height="5" rx="1" />
                <rect x="14" y="12" width="7" height="9" rx="1" />
                <rect x="3" y="16" width="7" height="5" rx="1" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => setPage('history')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>History</span>
            </button>

            <button 
              onClick={() => {}} 
              style={{...styles.navItem, ...styles.navItemActive}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span>Models</span>
            </button>

            <button 
              onClick={() => setPage('playground')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Playground</span>
            </button>

            <button 
              onClick={() => setPage('analytics')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Analytics</span>
            </button>

            <button 
              onClick={() => setPage('settings')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer options */}
        <div style={styles.sidebarFooter}>
          <button onClick={() => alert('Support Portal (Simulated)')} style={styles.footerItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            <span>Help</span>
          </button>

          <button onClick={handleSignOut} style={styles.footerItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>Logout</span>
          </button>

          {/* New Chat pill button at bottom */}
          <button onClick={() => setPage('playground')} style={styles.newChatBtn}>
            <span>+ New Chat</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN HUB CONTENT */}
      <main style={styles.mainHub}>
        
        {/* Header Title block */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>Models</h2>
            <p style={styles.headerSubtitle}>
              Manage your active AI models, configure parameters, and monitor performance across your enterprise deployments.
            </p>
          </div>
          
          <button onClick={() => alert('Simulated Model Deployment Flow')} style={styles.deployBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6 }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Deploy New Model</span>
          </button>
        </header>

        {/* Filter and Categorization Row */}
        <section style={styles.filterRow}>
          {/* Search bar */}
          <div style={styles.searchWrapper}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Search models by name, provider, or ID..." 
              style={styles.searchInput}
            />
            <span style={styles.shortcutBadge}>⌘F</span>
          </div>

          {/* Categories select options */}
          <div style={styles.categoryPills}>
            {(['All Models', 'Text', 'Vision', 'Audio'] as const).map(pill => (
              <button 
                key={pill} 
                onClick={() => setFilter(pill === 'All Models' ? 'All' : pill)}
                style={{
                  ...styles.categoryPill, 
                  ...((filter === 'All' && pill === 'All Models') || filter === pill ? styles.categoryPillActive : {})
                }}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        {/* Scrollable Viewport Cards list */}
        <div style={styles.scrollArea}>
          
          {/* SECTION 1: CORE FOUNDATION MODELS */}
          <section style={styles.modelsSection}>
            <div style={styles.sectionHeader}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" style={{ marginRight: 8 }}>
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#A78BFA" />
              </svg>
              <h3 style={styles.sectionTitle}>Core Foundation Models</h3>
            </div>

            <div style={styles.cardsGrid}>
              
              {/* GPT-4o Card */}
              <div style={styles.modelCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelIconBoxGreen}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.cardModelTitle}>GPT-4o</div>
                    <div style={styles.cardDeveloper}>OPENAI</div>
                  </div>
                  <span style={styles.statusBadgeGreen}>AVAILABLE</span>
                </div>

                <p style={styles.cardDescription}>
                  High-intelligence flagship model for complex, multi-step tasks...
                </p>

                <div style={styles.metricsRow}>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>LATENCY</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      <span>~250ms</span>
                    </div>
                  </div>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>CONTEXT</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>128k tokens</span>
                    </div>
                  </div>
                </div>

                <div style={styles.costBox}>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (IN)</span>
                    <span style={styles.costVal}>$5.00 / 1M</span>
                  </div>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (OUT)</span>
                    <span style={styles.costVal}>$15.00 / 1M</span>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <button onClick={() => alert('Configure GPT-4o parameters')} style={styles.actionBtn}>Configure</button>
                  <button onClick={() => alert('Open GPT-4o in Playground')} style={styles.actionBtnPrimary}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5 }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Playground</span>
                  </button>
                  <button onClick={() => alert('View Code Snippet')} style={styles.actionBtnIcon}>&lt;&gt;</button>
                </div>
              </div>

              {/* Claude 3.5 Sonnet Card */}
              <div style={styles.modelCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelIconBoxPurple}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.cardModelTitle}>Claude 3.5 Sonnet</div>
                    <div style={styles.cardDeveloper}>ANTHROPIC</div>
                  </div>
                  <span style={styles.statusBadgePurple}>IN USE</span>
                </div>

                <p style={styles.cardDescription}>
                  Exceptional speed and reasoning capabilities. Ideal for complex...
                </p>

                <div style={styles.metricsRow}>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>LATENCY</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      <span>~180ms</span>
                    </div>
                  </div>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>CONTEXT</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>200k tokens</span>
                    </div>
                  </div>
                </div>

                <div style={styles.costBox}>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (IN)</span>
                    <span style={styles.costVal}>$3.00 / 1M</span>
                  </div>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (OUT)</span>
                    <span style={styles.costVal}>$15.00 / 1M</span>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <button onClick={() => alert('Configure Claude 3.5 parameters')} style={styles.actionBtn}>Configure</button>
                  <button onClick={() => alert('Open Claude 3.5 in Playground')} style={styles.actionBtnPrimary}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5 }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Playground</span>
                  </button>
                  <button onClick={() => alert('View Code Snippet')} style={styles.actionBtnIcon}>&lt;&gt;</button>
                </div>
              </div>

              {/* Gemini 1.5 Pro Card */}
              <div style={styles.modelCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelIconBoxGreen}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.cardModelTitle}>Gemini 1.5 Pro</div>
                    <div style={styles.cardDeveloper}>GOOGLE</div>
                  </div>
                  <span style={styles.statusBadgeGreen}>AVAILABLE</span>
                </div>

                <p style={styles.cardDescription}>
                  Massive context window suitable for analyzing entire codebases ...
                </p>

                <div style={styles.metricsRow}>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>LATENCY</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      <span>~400ms</span>
                    </div>
                  </div>
                  <div style={styles.metricItem}>
                    <div style={styles.metricHeaderLabel}>CONTEXT</div>
                    <div style={styles.metricValCol}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>1M+ tokens</span>
                    </div>
                  </div>
                </div>

                <div style={styles.costBox}>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (IN)</span>
                    <span style={styles.costVal}>$3.50 / 1M</span>
                  </div>
                  <div style={styles.costItem}>
                    <span style={styles.costLabel}>COST (OUT)</span>
                    <span style={styles.costVal}>$10.50 / 1M</span>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <button onClick={() => alert('Configure Gemini Pro parameters')} style={styles.actionBtn}>Configure</button>
                  <button onClick={() => alert('Open Gemini Pro in Playground')} style={styles.actionBtnPrimary}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5 }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Playground</span>
                  </button>
                  <button onClick={() => alert('View Code Snippet')} style={styles.actionBtnIcon}>&lt;&gt;</button>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2: CUSTOM & FINE-TUNED MODELS */}
          <section style={styles.modelsSection}>
            <div style={styles.sectionHeaderRow}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" style={{ marginRight: 8 }}>
                  <rect x="3" y="3" width="7" height="9" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>
                <h3 style={styles.sectionTitle}>Custom & Fine-Tuned Models</h3>
              </div>
              <button onClick={() => alert('View all fine-tuned models')} style={styles.viewAllBtn}>View All →</button>
            </div>

            <div style={styles.customGrid}>
              
              {/* Llama Fine-tuned card */}
              <div style={styles.customModelCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelIconBoxTeal}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.cardModelTitle}>customer-support...</div>
                    <div style={styles.cardDeveloper}>BASE: LLAMA 3 8B</div>
                  </div>
                  <span style={styles.statusBadgePrivate}>PRIVATE</span>
                </div>

                <div style={styles.progressSection}>
                  <div style={styles.progressLabels}>
                    <span style={styles.progressTitle}>Training Epochs: 4/4</span>
                    <span style={styles.completedBadge}>Completed</span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <div style={{...styles.progressBarFill, width: '100%', background: '#34D399'}} />
                  </div>
                </div>

                <div style={styles.customCardFooter}>
                  <span style={styles.lastUpdated}>LAST UPDATED: 2 days ago</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button onClick={() => alert('Deploy Fine-tuned Model')} style={styles.deploySubBtn}>Deploy</button>
                    <button style={styles.moreOptionsBtn}>⋮</button>
                  </div>
                </div>
              </div>

              {/* Import Custom Model Box */}
              <div style={styles.importCard}>
                <div style={styles.importCenter}>
                  <div style={styles.importPlusBox}>+</div>
                  <h4 style={styles.importTitle}>Import Custom Model</h4>
                  <p style={styles.importDescription}>
                    Connect via API key or upload weights for a specialized local deployment.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// Inline styles mirroring the OneAI Hub Figma design references perfectly
const styles: Record<string, React.CSSProperties> = {
  dashboardContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    background: '#07090c',
    color: '#fff',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    zIndex: 900,
  },
  sidebar: {
    width: '240px',
    background: '#09090c',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px 12px',
    flexShrink: 0,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 8px',
    marginBottom: '24px',
  },
  logoBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '7px',
    background: 'conic-gradient(from 210deg at 50% 50%, #7C3AED, #00D4FF, #7C3AED)',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 0 14px rgba(124, 58, 237, 0.35)',
  },
  logoText: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  logoSubtext: {
    fontSize: '9.5px',
    color: '#4B5563',
    fontWeight: 600,
    letterSpacing: '0.4px',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '10px',
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'background .15s ease, color .15s ease',
  },
  navItemActive: {
    background: 'rgba(124, 58, 237, 0.1)',
    border: '1px solid rgba(124, 58, 237, 0.25)',
    color: '#fff',
    boxShadow: '0 0 12px -3px rgba(124, 58, 237, 0.15)',
  },
  sidebarFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '16px',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: 'transparent',
    border: 'none',
    color: '#4B5563',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  newChatBtn: {
    width: '100%',
    background: 'linear-gradient(180deg, #8a4af0, #6d28d9)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 0',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 8px 24px -8px rgba(124,58,237,0.4)',
  },
  mainHub: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 28px',
    background: '#07090c',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '4px',
  },
  headerSubtitle: {
    fontSize: '13px',
    color: '#71717A',
    maxWidth: '600px',
    lineHeight: '1.5',
  },
  deployBtn: {
    background: 'linear-gradient(180deg, #8a4af0, #6d28d9)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '9px 16px',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: '0 8px 24px -8px rgba(124,58,237,0.4)',
    display: 'inline-flex',
    alignItems: 'center',
  },
  filterRow: {
    padding: '16px 28px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.01)',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    width: '320px',
    position: 'relative',
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: '12.5px',
    flex: 1,
  },
  shortcutBadge: {
    fontSize: '10px',
    color: '#4B5563',
    background: 'rgba(255,255,255,0.03)',
    padding: '2px 5px',
    borderRadius: '4px',
    fontWeight: 600,
  },
  categoryPills: {
    display: 'flex',
    gap: '6px',
  },
  categoryPill: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    color: '#71717A',
    fontSize: '12.5px',
    fontWeight: 500,
    padding: '6px 14px',
    cursor: 'pointer',
    transition: 'background .15s, color .15s',
  },
  categoryPillActive: {
    background: 'rgba(124, 58, 237, 0.12)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    color: '#C4B5FD',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  modelsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15.5px',
    fontWeight: 600,
    color: '#fff',
  },
  viewAllBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '12.5px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  modelCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    marginBottom: '16px',
  },
  modelIconBoxGreen: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(52, 211, 153, 0.08)',
    border: '1px solid rgba(52, 211, 153, 0.2)',
    color: '#34D399',
    display: 'grid',
    placeItems: 'center',
  },
  modelIconBoxPurple: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(124, 58, 237, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    color: '#A78BFA',
    display: 'grid',
    placeItems: 'center',
  },
  cardModelTitle: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '2px',
  },
  cardDeveloper: {
    fontSize: '9.5px',
    color: '#4B5563',
    fontWeight: 600,
  },
  statusBadgeGreen: {
    position: 'absolute',
    right: 0,
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#34D399',
    background: 'rgba(52, 211, 153, 0.08)',
    padding: '2.5px 7px',
    borderRadius: '6px',
    letterSpacing: '0.4px',
  },
  statusBadgePurple: {
    position: 'absolute',
    right: 0,
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#A78BFA',
    background: 'rgba(124, 58, 237, 0.08)',
    padding: '2.5px 7px',
    borderRadius: '6px',
    letterSpacing: '0.4px',
  },
  cardDescription: {
    fontSize: '12.5px',
    color: '#71717A',
    lineHeight: '1.5',
    marginBottom: '18px',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    paddingTop: '14px',
    marginBottom: '14px',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricHeaderLabel: {
    fontSize: '9px',
    fontWeight: 600,
    color: '#4B5563',
    letterSpacing: '0.6px',
  },
  metricValCol: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12.5px',
    color: '#fff',
    fontWeight: 500,
  },
  costBox: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '10px',
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '18px',
  },
  costItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  costLabel: {
    fontSize: '8px',
    fontWeight: 600,
    color: '#4B5563',
    letterSpacing: '0.5px',
  },
  costVal: {
    fontSize: '11.5px',
    fontFamily: 'inherit',
    color: '#fff',
    fontWeight: 500,
  },
  cardFooter: {
    display: 'flex',
    gap: '6px',
  },
  actionBtn: {
    flex: 1,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '12px',
    fontWeight: 500,
    padding: '7px 0',
    cursor: 'pointer',
    textAlign: 'center',
  },
  actionBtnPrimary: {
    flex: 1.2,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    padding: '7px 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnIcon: {
    width: '28px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
    color: '#71717A',
    fontSize: '11px',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
  },
  customGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  customModelCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
  },
  modelIconBoxTeal: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(0, 212, 255, 0.08)',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    color: '#00D4FF',
    display: 'grid',
    placeItems: 'center',
  },
  statusBadgePrivate: {
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#00D4FF',
    background: 'rgba(0, 212, 255, 0.08)',
    padding: '2.5px 7px',
    borderRadius: '6px',
    letterSpacing: '0.4px',
  },
  progressSection: {
    marginTop: '16px',
    marginBottom: '16px',
  },
  progressLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11.5px',
    marginBottom: '8px',
  },
  progressTitle: {
    color: '#71717A',
  },
  completedBadge: {
    color: '#34D399',
    fontWeight: 600,
  },
  customCardFooter: {
    borderTop: '1px solid rgba(255,255,255,0.03)',
    paddingTop: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastUpdated: {
    fontSize: '10.5px',
    color: '#4B5563',
    fontWeight: 500,
  },
  deploySubBtn: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#fff',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '11.5px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  moreOptionsBtn: {
    background: 'transparent',
    border: 'none',
    color: '#4B5563',
    cursor: 'pointer',
    fontSize: '13px',
  },
  importCard: {
    background: 'transparent',
    border: '1px dashed rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '20px',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    transition: 'border-color .15s ease',
  },
  importCenter: {
    textAlign: 'center',
    maxWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  importPlusBox: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#71717A',
    fontSize: '16px',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '12px',
  },
  importTitle: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '6px',
  },
  importDescription: {
    fontSize: '11.5px',
    color: '#4B5563',
    lineHeight: '1.4',
  },
};
