'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

interface AnalyticsPageProps {
  setPage: (p: Page) => void;
}

export function AnalyticsPage({ setPage }: AnalyticsPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('analytics');

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
              onClick={() => {}} 
              style={{...styles.navItem, ...styles.navItemActive}}
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
        
        {/* Analytics Header panel */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>Analytics</h2>
            <p style={styles.headerSubtitle}>Comprehensive performance and usage insights.</p>
          </div>

          <div style={styles.headerControls}>
            <button onClick={() => alert('Date range picker trigger')} style={styles.dateSelector}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Last 30 Days</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 6 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <button onClick={() => alert('Report download queued')} style={styles.exportBtn}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div style={styles.scrollArea}>
          
          {/* OVERVIEW STATS ROW */}
          <section style={styles.statsGrid}>
            
            {/* Total Token Usage */}
            <div style={styles.statCard}>
              <div style={styles.statCardHeader}>
                <span style={styles.statLabel}>Total Token Usage</span>
                <div style={styles.statIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
              </div>
              <div style={styles.statValue}>84.2M</div>
              <div style={{...styles.statSubtext, color: '#34D399'}}>
                <span style={{ marginRight: 4 }}>↗</span>
                <span>+12% vs last month</span>
              </div>
            </div>

            {/* Avg. Latency */}
            <div style={styles.statCard}>
              <div style={styles.statCardHeader}>
                <span style={styles.statLabel}>Avg. Latency</span>
                <div style={styles.statIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
              </div>
              <div style={styles.statValue}>342 <span style={{ fontSize: '15px', color: '#71717A' }}>ms</span></div>
              <div style={{...styles.statSubtext, color: '#00D4FF'}}>
                <span style={{ marginRight: 4 }}>↘</span>
                <span>-15ms improvement</span>
              </div>
            </div>

            {/* Total Spend */}
            <div style={styles.statCard}>
              <div style={styles.statCardHeader}>
                <span style={styles.statLabel}>Total Spend</span>
                <div style={styles.statIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                  </svg>
                </div>
              </div>
              <div style={styles.statValue}>$1,240<span style={{ fontSize: '16px', opacity: 0.5 }}>.50</span></div>
              <div style={{...styles.statSubtext, color: '#34D399'}}>
                <span style={{ marginRight: 4 }}>↗</span>
                <span>+5% vs last month</span>
              </div>
            </div>

            {/* Success Rate */}
            <div style={styles.statCard}>
              <div style={styles.statCardHeader}>
                <span style={styles.statLabel}>Success Rate</span>
                <div style={styles.statIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 8 12 12 14 14" />
                  </svg>
                </div>
              </div>
              <div style={styles.statValue}>99.98%</div>
              <div style={{...styles.statSubtext, color: '#71717A'}}>
                <span style={{ marginRight: 4 }}>–</span>
                <span>Stable</span>
              </div>
            </div>

          </section>

          {/* DUAL CHART GRID ROW */}
          <div style={styles.chartsGrid}>
            
            {/* Usage Over Time line chart */}
            <div style={styles.chartPanelCard}>
              <div style={styles.panelHeader}>
                <h3 style={styles.panelTitle}>Usage Over Time</h3>
                <div style={styles.legendsRow}>
                  <div style={styles.legendItem}>
                    <span style={styles.legendDotPurple} />
                    <span>Text</span>
                  </div>
                  <div style={styles.legendItem}>
                    <span style={styles.legendDotTeal} />
                    <span>Vision</span>
                  </div>
                </div>
              </div>

              <div style={styles.chartWrapper}>
                <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Subtle Gridlines */}
                  <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.02)" />
                  <line x1="0" y1="110" x2="600" y2="110" stroke="rgba(255,255,255,0.02)" />
                  <line x1="0" y1="170" x2="600" y2="170" stroke="rgba(255,255,255,0.02)" />

                  {/* Wave Line 1: Text (Purple Curve) */}
                  <path 
                    d="M 0 180 C 100 170, 150 140, 200 110 C 250 80, 300 40, 350 110 C 400 180, 430 140, 480 30 C 530 -20, 560 120, 600 20" 
                    fill="none" 
                    stroke="#7C3AED" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />

                  {/* Wave Line 2: Vision (Teal Curve) */}
                  <path 
                    d="M 0 190 C 100 180, 150 160, 200 145 C 250 130, 300 110, 350 130 C 400 150, 450 100, 500 105 C 550 110, 570 190, 600 110" 
                    fill="none" 
                    stroke="#00D4FF" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />

                  {/* Nodes highlight */}
                  <circle cx="480" cy="30" r="4.5" fill="#fff" stroke="#7C3AED" strokeWidth="2" />
                  <circle cx="500" cy="105" r="4" fill="#00D4FF" />
                </svg>

                {/* X Axis Labels */}
                <div style={styles.chartXLabels}>
                  <span>Oct 1</span>
                  <span>Oct 8</span>
                  <span>Oct 15</span>
                  <span>Oct 22</span>
                  <span>Oct 30</span>
                </div>
              </div>
            </div>

            {/* Cost Distribution donut chart */}
            <div style={styles.chartPanelCard}>
              <h3 style={styles.panelTitle}>Cost Distribution</h3>
              
              <div style={styles.donutWrapper}>
                <div style={styles.donutRelative}>
                  {/* SVG Radial Donut slice */}
                  <svg width="140" height="140" viewBox="0 0 36 36" style={styles.donutSvg}>
                    {/* Gray helper track */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="3" />
                    
                    {/* Purple Segment (55%) */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#7C3AED" strokeWidth="3" 
                            strokeDasharray="55 45" strokeDashoffset="25" />
                            
                    {/* Teal Segment (30%) */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00D4FF" strokeWidth="3" 
                            strokeDasharray="30 70" strokeDashoffset="70" />
                            
                    {/* Orange Segment (15%) */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="3" 
                            strokeDasharray="15 85" strokeDashoffset="40" />
                  </svg>
                  
                  {/* Text value in Center of Donut */}
                  <div style={styles.donutCenter}>
                    <div style={styles.donutCenterValue}>$1.2k</div>
                    <div style={styles.donutCenterSub}>Total</div>
                  </div>
                </div>
              </div>

              {/* Legends list with percentages */}
              <div style={styles.donutLegends}>
                <div style={styles.donutLegendRow}>
                  <div style={styles.donutLegendLabel}>
                    <span style={styles.sqPurple} />
                    <span>GPT-4 Turbo</span>
                  </div>
                  <span style={styles.donutLegendPct}>55%</span>
                </div>

                <div style={styles.donutLegendRow}>
                  <div style={styles.donutLegendLabel}>
                    <span style={styles.sqTeal} />
                    <span>Claude 3.5 Sonnet</span>
                  </div>
                  <span style={styles.donutLegendPct}>30%</span>
                </div>

                <div style={styles.donutLegendRow}>
                  <div style={styles.donutLegendLabel}>
                    <span style={styles.sqOrange} />
                    <span>Whisper v3</span>
                  </div>
                  <span style={styles.donutLegendPct}>15%</span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: PERFORMANCE DEEP DIVE SPREADSHEET */}
          <section style={styles.deepDivePanel}>
            <h3 style={styles.panelTitle}>Model Performance Deep Dive</h3>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>MODEL NAME</th>
                    <th style={styles.th}>REQUESTS</th>
                    <th style={styles.th}>AVG. TOKENS/REQ</th>
                    <th style={styles.th}>ERROR RATE</th>
                    <th style={styles.th}>COST</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Row 1 */}
                  <tr style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.modelCol}>
                        <div style={styles.modelIconPurple}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                          </svg>
                        </div>
                        <strong style={{ color: '#fff' }}>GPT-4 Turbo</strong>
                      </div>
                    </td>
                    <td style={styles.td}>124,592</td>
                    <td style={styles.td}>450</td>
                    <td style={{...styles.td, color: '#00D4FF', fontWeight: 600}}>0.01%</td>
                    <td style={{...styles.td, color: '#fff', fontWeight: 500}}>$682.20</td>
                  </tr>

                  {/* Row 2 */}
                  <tr style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.modelCol}>
                        <div style={styles.modelIconTeal}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="4" />
                          </svg>
                        </div>
                        <strong style={{ color: '#fff' }}>Claude 3.5 Sonnet</strong>
                      </div>
                    </td>
                    <td style={styles.td}>89,204</td>
                    <td style={styles.td}>820</td>
                    <td style={{...styles.td, color: '#00D4FF', fontWeight: 600}}>0.02%</td>
                    <td style={{...styles.td, color: '#fff', fontWeight: 500}}>$372.15</td>
                  </tr>

                  {/* Row 3 */}
                  <tr style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.modelCol}>
                        <div style={styles.modelIconOrange}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 2 22 22 22 12 2" />
                          </svg>
                        </div>
                        <strong style={{ color: '#fff' }}>Whisper v3</strong>
                      </div>
                    </td>
                    <td style={styles.td}>12,400</td>
                    <td style={styles.td}>N/A</td>
                    <td style={{...styles.td, color: '#F59E0B', fontWeight: 500}}>0.15%</td>
                    <td style={{...styles.td, color: '#fff', fontWeight: 500}}>$185.15</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// Custom Premium styling tokens matching OneAI Hub
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
  newChatBtn: {
    width: '100%',
    background: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '10px',
    color: '#C4B5FD',
    fontSize: '13px',
    fontWeight: 600,
    padding: '9px 0',
    cursor: 'pointer',
    marginBottom: '10px',
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
  dateSelector: {
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
  exportBtn: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
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
    gap: '24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '18px 20px',
  },
  statCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  statLabel: {
    fontSize: '13px',
    color: '#71717A',
    fontWeight: 500,
  },
  statIconBox: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    color: '#71717A',
    display: 'grid',
    placeItems: 'center',
  },
  statValue: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '26px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '6px',
  },
  statSubtext: {
    fontSize: '11.5px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '24px',
  },
  chartPanelCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '16px',
    padding: '20px 24px',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  panelTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
  },
  legendsRow: {
    display: 'flex',
    gap: '14px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#71717A',
    fontWeight: 500,
  },
  legendDotPurple: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#7C3AED',
  },
  legendDotTeal: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00D4FF',
  },
  chartWrapper: {
    position: 'relative',
  },
  chartXLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 8px 0',
    fontSize: '11.5px',
    color: '#4B5563',
    fontWeight: 500,
  },
  donutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '160px',
    position: 'relative',
  },
  donutRelative: {
    position: 'relative',
    width: '140px',
    height: '140px',
  },
  donutSvg: {
    transform: 'rotate(-90deg)',
  },
  donutCenter: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenterValue: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
  },
  donutCenterSub: {
    fontSize: '11px',
    color: '#4B5563',
    fontWeight: 600,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
  },
  donutLegends: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px',
  },
  donutLegendRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12.5px',
  },
  donutLegendLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#71717A',
    fontWeight: 500,
  },
  sqPurple: {
    width: '8px',
    height: '8px',
    borderRadius: '2.5px',
    background: '#7C3AED',
  },
  sqTeal: {
    width: '8px',
    height: '8px',
    borderRadius: '2.5px',
    background: '#00D4FF',
  },
  sqOrange: {
    width: '8px',
    height: '8px',
    borderRadius: '2.5px',
    background: '#F59E0B',
  },
  donutLegendPct: {
    fontWeight: 600,
    color: '#fff',
  },
  deepDivePanel: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '16px',
    padding: '20px 24px',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    fontSize: '10.5px',
    color: '#4B5563',
    fontWeight: 600,
    letterSpacing: '0.5px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.02)',
  },
  td: {
    padding: '14px 0',
    fontSize: '13px',
    color: '#71717A',
  },
  modelCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  modelIconPurple: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(124, 58, 237, 0.1)',
    border: '1px solid rgba(124, 58, 237, 0.25)',
    color: '#A78BFA',
    display: 'grid',
    placeItems: 'center',
  },
  modelIconTeal: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.25)',
    color: '#00D4FF',
    display: 'grid',
    placeItems: 'center',
  },
  modelIconOrange: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.25)',
    color: '#F59E0B',
    display: 'grid',
    placeItems: 'center',
  },
};
