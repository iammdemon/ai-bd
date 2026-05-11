'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

interface DashboardPageProps {
  setPage: (p: Page) => void;
  currentModel: string;
  setCurrentModel: (m: string) => void;
  openModelPicker: () => void;
  openApiKeys: () => void;
}

export function DashboardPage({ setPage }: DashboardPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFilter, setRecentFilter] = useState<'today' | 'all'>('today');

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
              onClick={() => {}} 
              style={{...styles.navItem, ...styles.navItemActive}}
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
              onClick={() => setPage('models')} 
              style={styles.navItem}
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

      {/* 2. MAIN HUB */}
      <main style={styles.mainHub}>
        
        {/* Chat History Header */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>Chat History</h2>
            <p style={styles.headerSubtitle}>Review and resume your past aetheric interactions.</p>
          </div>

          <div style={styles.headerControls}>
            {/* Search Input */}
            <div style={styles.searchWrapper}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..." 
                style={styles.searchInput}
              />
            </div>

            {/* Filters Button */}
            <button onClick={() => alert('Toggle Advanced Filters')} style={styles.filtersBtn}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </header>

        {/* Scrollable Workspace panel */}
        <div style={styles.scrollArea}>
          
          {/* PINNED THREADS SECTION */}
          <section style={styles.sectionBlock}>
            <div style={styles.sectionHeader}>
              <span style={{ marginRight: 8, color: '#F59E0B' }}>📌</span>
              <h3 style={styles.sectionTitle}>Pinned Threads</h3>
            </div>

            <div style={styles.pinnedGrid}>
              
              {/* Card 1 */}
              <div style={styles.pinnedCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelBadgeBlue}>
                    <span style={styles.blueDot} />
                    <span>GPT-4o</span>
                  </div>
                  <span style={styles.cardTime}>2 hrs ago</span>
                  <div style={styles.pinIconBoxActive}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                    </svg>
                  </div>
                </div>

                <h4 style={styles.cardTitle}>Quantum Computing Optimization Pipeline</h4>
                <p style={styles.cardSnippet}>
                  The proposed algorithm reduces decoherence by...
                </p>

                <div style={styles.cardFooter}>
                  <span style={styles.cardMetric}>4,201 tkns</span>
                  <span style={styles.cardMetric}>~$0.04</span>
                  <button onClick={() => setPage('playground')} style={styles.resumeLink}>
                    <span>Resume</span>
                    <span style={{ marginLeft: 4 }}>→</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div style={styles.pinnedCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.modelBadgePurple}>
                    <span style={styles.purpleDot} />
                    <span>Claude 3.5 Sonnet</span>
                  </div>
                  <span style={styles.cardTime}>Yesterday</span>
                  <div style={styles.pinIconBoxActive}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                    </svg>
                  </div>
                </div>

                <h4 style={styles.cardTitle}>Q3 Marketing Strategy Narrative</h4>
                <p style={styles.cardSnippet}>
                  To position the new platform effectively, we...
                </p>

                <div style={styles.cardFooter}>
                  <span style={styles.cardMetric}>12,840 tkns</span>
                  <span style={styles.cardMetric}>~$0.12</span>
                  <button onClick={() => setPage('playground')} style={styles.resumeLink}>
                    <span>Resume</span>
                    <span style={{ marginLeft: 4 }}>→</span>
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* RECENT ACTIVITY SECTION */}
          <section style={styles.sectionBlock}>
            <div style={styles.recentHeaderRow}>
              <h3 style={styles.sectionTitle}>Recent Activity</h3>
              <div style={styles.recentToggles}>
                <span 
                  onClick={() => setRecentFilter('today')} 
                  style={{...styles.toggleLabel, ...(recentFilter === 'today' ? styles.toggleActive : {})}}
                >
                  Today
                </span>
                <span 
                  onClick={() => setRecentFilter('all')} 
                  style={{...styles.toggleLabel, ...(recentFilter === 'all' ? styles.toggleActive : {})}}
                >
                  Last 7 Days
                </span>
              </div>
            </div>

            {/* List group stream */}
            <div style={styles.activityList}>
              
              {/* Item 1 */}
              <div style={styles.activityRow}>
                <div style={styles.iconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div style={styles.textBlock}>
                  <h5 style={styles.rowTitle}>React Native Navigation Refactor</h5>
                  <div style={styles.snippetContainer}>
                    <span style={styles.modelTag}>GPT-4o</span>
                    <p style={styles.rowSnippet}>
                      I need help transitioning from React Navigation v5 to v6, specifically handling the neste...
                    </p>
                  </div>
                </div>
                <div style={styles.rowTimeCol}>10:42 AM</div>
                <div style={styles.rowStatsCol}>
                  <div style={styles.rowTokens}>854 tkns</div>
                  <div style={styles.rowCost}>~$0.01</div>
                </div>
              </div>

              {/* Item 2 */}
              <div style={styles.activityRow}>
                <div style={styles.iconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div style={styles.textBlock}>
                  <h5 style={styles.rowTitle}>Drafting Investor Update Email</h5>
                  <div style={styles.snippetContainer}>
                    <span style={styles.modelTag}>Claude 3 Haiku</span>
                    <p style={styles.rowSnippet}>
                      Please review this draft for tone. It needs to sound optimistic but grounded regar...
                    </p>
                  </div>
                </div>
                <div style={styles.rowTimeCol}>Yesterday</div>
                <div style={styles.rowStatsCol}>
                  <div style={styles.rowTokens}>2,100 tkns</div>
                  <div style={styles.rowCost}>~$0.00</div>
                </div>
              </div>

              {/* Item 3 */}
              <div style={styles.activityRow}>
                <div style={styles.iconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div style={styles.textBlock}>
                  <h5 style={styles.rowTitle}>SQL Query Optimization for User Logs</h5>
                  <div style={styles.snippetContainer}>
                    <span style={styles.modelTag}>GPT-4o</span>
                    <p style={styles.rowSnippet}>
                      This query is taking 5 seconds to run on a table with 10M rows. How can we optimize ...
                    </p>
                  </div>
                </div>
                <div style={styles.rowTimeCol}>Oct 24</div>
                <div style={styles.rowStatsCol}>
                  <div style={styles.rowTokens}>5,320 tkns</div>
                  <div style={styles.rowCost}>~$0.05</div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>

    </div>
  );
}

// Complete CSS-in-JS style mappings reflecting the design mockup pixel-perfectly
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
    fontSize: '10.5px',
    color: '#4B5563',
    fontWeight: 500,
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
    height: '76px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    background: '#07090c',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '3px',
  },
  headerSubtitle: {
    fontSize: '12.5px',
    color: '#71717A',
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    width: '260px',
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
  filtersBtn: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    color: '#fff',
    padding: '8px 14px',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 28px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  sectionBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15.5px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
  },
  pinnedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  pinnedCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
    position: 'relative',
    width: '100%',
  },
  modelBadgeBlue: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#60A5FA',
    background: 'rgba(96, 165, 251, 0.08)',
    border: '1px solid rgba(96, 165, 251, 0.15)',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  blueDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#3B82F6',
  },
  modelBadgePurple: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#C4B5FD',
    background: 'rgba(196, 181, 253, 0.08)',
    border: '1px solid rgba(196, 181, 253, 0.15)',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  purpleDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#8B5CF6',
  },
  cardTime: {
    fontSize: '11.5px',
    color: '#4B5563',
    fontWeight: 500,
  },
  pinIconBoxActive: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    cursor: 'pointer',
  },
  cardTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    margin: '0 0 8px 0',
    lineHeight: '1.4',
  },
  cardSnippet: {
    fontSize: '13px',
    color: '#71717A',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: 'auto',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    paddingTop: '12px',
  },
  cardMetric: {
    fontSize: '11.5px',
    color: '#4B5563',
    fontWeight: 500,
  },
  resumeLink: {
    marginLeft: 'auto',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  recentHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    paddingBottom: '12px',
    marginBottom: '8px',
  },
  recentToggles: {
    display: 'flex',
    gap: '16px',
  },
  toggleLabel: {
    fontSize: '12.5px',
    color: '#4B5563',
    fontWeight: 500,
    cursor: 'pointer',
  },
  toggleActive: {
    color: '#fff',
    fontWeight: 600,
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  activityRow: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#fff',
    margin: '0 0 4px 0',
  },
  snippetContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  modelTag: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#4B5563',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '2px 6px',
    borderRadius: '4px',
    flexShrink: 0,
  },
  rowSnippet: {
    fontSize: '12.5px',
    color: '#71717A',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  rowTimeCol: {
    fontSize: '11.5px',
    color: '#4B5563',
    fontWeight: 500,
    flexShrink: 0,
  },
  rowStatsCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '80px',
    flexShrink: 0,
  },
  rowTokens: {
    fontSize: '12px',
    color: '#71717A',
    fontWeight: 500,
  },
  rowCost: {
    fontSize: '11px',
    color: '#4B5563',
    marginTop: '2px',
  },
};
