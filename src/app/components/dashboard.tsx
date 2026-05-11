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

export function DashboardPage({ setPage, openModelPicker, openApiKeys }: DashboardPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartRange, setChartRange] = useState<'7D' | '30D' | 'All'>('7D');

  // Monitor Auth State for display
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

      {/* 2. MAIN HUB SPACE */}
      <main style={styles.mainHub}>
        
        {/* Dynamic Navigation Header */}
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>Overview</h2>
          
          <div style={styles.headerControls}>
            {/* Search inputs */}
            <div style={styles.searchWrapper}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text" 
                placeholder="Search models, projects..." 
                style={styles.searchInput}
              />
            </div>

            {/* Notification bell */}
            <button style={styles.bellButton}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={styles.bellBadge} />
            </button>

            {/* User profile avatar info */}
            <div style={styles.avatar}>
              {user?.displayName ? user.displayName[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : 'U')}
            </div>
          </div>
        </header>

        {/* Dashboard Rows scrolling viewport */}
        <div style={styles.scrollArea}>
          
          {/* STATS METRIC ROW */}
          <section style={styles.statsGrid}>
            
            {/* Total Tokens Used Card */}
            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <div style={styles.metricIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <span style={styles.metricPill}>+12.5%</span>
              </div>
              <div style={styles.metricValue}>12.4M</div>
              <div style={styles.metricLabel}>Total Tokens Used</div>
            </div>

            {/* Active Sessions Card */}
            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <div style={{...styles.metricIconBox, color: '#A78BFA'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 10s linear infinite'}}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              </div>
              <div style={styles.metricValue}>142</div>
              <div style={styles.metricLabel}>Active Sessions</div>
            </div>

            {/* API Health Card */}
            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <div style={{...styles.metricIconBox, color: '#00D4FF'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <span style={{...styles.metricPill, background: 'rgba(0, 212, 255, 0.08)', color: '#7DD3FC'}}>Last 24h</span>
              </div>
              <div style={{...styles.metricValue, color: '#00D4FF'}}>99.9%</div>
              <div style={styles.metricLabel}>API Health</div>
            </div>

            {/* Credit Balance Card */}
            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <div style={{...styles.metricIconBox, color: '#F59E0B'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                  </svg>
                </div>
                <button onClick={() => setPage('pricing')} style={styles.metricButton}>Top up</button>
              </div>
              <div style={styles.metricValue}>$4,250<span style={{ fontSize: '18px', opacity: 0.5 }}>.00</span></div>
              <div style={styles.metricLabel}>Credit Balance</div>
            </div>

          </section>

          {/* TWO COLUMN GRID ROWS */}
          <div style={styles.twoColRow}>
            
            {/* LEFT AREA: Workspaces + Usage Timeline */}
            <div style={styles.leftColumn}>
              
              {/* Active Workspaces block */}
              <div style={styles.panelSection}>
                <div style={styles.sectionTitleRow}>
                  <h3 style={styles.sectionTitle}>Active Workspaces</h3>
                  <button onClick={() => setActiveTab('workspaces')} style={styles.viewAllBtn}>View All →</button>
                </div>

                <div style={styles.workspaceGrid}>
                  
                  {/* Workspace 1 */}
                  <div style={styles.workspaceCard}>
                    <div style={styles.workspaceHeader}>
                      <div style={styles.workspaceIconPurple}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div style={styles.workspaceTitleBlock}>
                        <div style={styles.workspaceName}>Customer Support Bot</div>
                        <div style={styles.statusBox}>
                          <span style={styles.statusIndicatorGreen} />
                          <span style={styles.statusTextGreen}>Running</span>
                        </div>
                      </div>
                      <button style={styles.optionDot}>•••</button>
                    </div>

                    <div style={styles.tagsContainer}>
                      <span style={styles.tag}>GPT-4 TURBO</span>
                      <span style={styles.tag}>RETRIEVAL</span>
                    </div>

                    <div style={styles.workspaceFooter}>
                      <span style={styles.footerStats}>Tokens Today: <strong style={{ color: '#fff' }}>457k</strong></span>
                      <button style={styles.actionButton}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Resume</span>
                      </button>
                    </div>
                  </div>

                  {/* Workspace 2 */}
                  <div style={styles.workspaceCard}>
                    <div style={styles.workspaceHeader}>
                      <div style={styles.workspaceIconTeal}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <div style={styles.workspaceTitleBlock}>
                        <div style={styles.workspaceName}>Legal Doc Analysis</div>
                        <div style={styles.statusBox}>
                          <span style={styles.statusIndicatorOrange} />
                          <span style={styles.statusTextOrange}>Paused</span>
                        </div>
                      </div>
                      <button style={styles.optionDot}>•••</button>
                    </div>

                    <div style={styles.tagsContainer}>
                      <span style={styles.tag}>CLAUDE 3.5</span>
                      <span style={styles.tag}>VISION</span>
                    </div>

                    <div style={styles.workspaceFooter}>
                      <span style={styles.footerStats}>Tokens Today: <strong style={{ color: '#fff' }}>12k</strong></span>
                      <button style={styles.actionButton}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Resume</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Usage Over Time (Chart section) */}
              <div style={styles.panelSection}>
                <div style={styles.sectionTitleRow}>
                  <h3 style={styles.sectionTitle}>Usage Over Time</h3>
                  <div style={styles.tabButtons}>
                    {(['7D', '30D', 'All'] as const).map(item => (
                      <button 
                        key={item} 
                        onClick={() => setChartRange(item)} 
                        style={{...styles.tabBtn, ...(chartRange === item ? styles.tabBtnActive : {})}}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.chartWrapper}>
                  {/* Premium Vector SVG Graphic for static wave rendering */}
                  <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00D4FF" floodOpacity="0.4" />
                      </filter>
                    </defs>

                    {/* Faint Horizontal Helper Gridlines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                    {/* Gradient Area Fill Under Curve */}
                    <path 
                      d="M 0 135 C 50 115, 100 80, 150 95 C 200 110, 250 100, 300 85 C 350 70, 400 35, 450 65 C 500 95, 550 115, 600 50 L 600 160 L 0 160 Z" 
                      fill="url(#chartGradient)" 
                    />

                    {/* Glowing Accent Main Path Line */}
                    <path 
                      d="M 0 135 C 50 115, 100 80, 150 95 C 200 110, 250 100, 300 85 C 350 70, 400 35, 450 65 C 500 95, 550 115, 600 50" 
                      fill="none" 
                      stroke="#00D4FF" 
                      strokeWidth="3.5" 
                      filter="url(#glow)" 
                      strokeLinecap="round"
                    />

                    {/* Interactive nodes or highlight indicators */}
                    <circle cx="450" cy="65" r="5" fill="#fff" stroke="#00D4FF" strokeWidth="2.5" />
                    <circle cx="300" cy="85" r="3.5" fill="#00D4FF" />
                  </svg>

                  {/* Horizontal Axis labels */}
                  <div style={styles.chartXLabels}>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div style={styles.panelSection}>
                <div style={styles.sectionTitleRow}>
                  <h3 style={styles.sectionTitle}>Recent Activity</h3>
                  <button onClick={() => alert('Filter Active Activity')} style={styles.filterBtn}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <span>Filter</span>
                  </button>
                </div>

                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>MODEL</th>
                        <th style={styles.th}>WORKSPACE</th>
                        <th style={styles.th}>TIMESTAMP</th>
                        <th style={styles.th}>TOKENS</th>
                        <th style={styles.th}>COST</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.modelDotCol}>
                            <span style={{...styles.dotIndicator, background: '#A78BFA'}} />
                            <strong style={{ color: '#fff' }}>GPT-4 Turbo</strong>
                          </div>
                        </td>
                        <td style={styles.td}>Customer Support Bot</td>
                        <td style={styles.td}>10:42:05 AM</td>
                        <td style={styles.td}>1,248</td>
                        <td style={{...styles.td, color: '#34D399', fontWeight: 600}}>$0.012</td>
                      </tr>

                      <tr style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.modelDotCol}>
                            <span style={{...styles.dotIndicator, background: '#00D4FF'}} />
                            <strong style={{ color: '#fff' }}>Claude 3.5 Sonnet</strong>
                          </div>
                        </td>
                        <td style={styles.td}>Legal Doc Analysis</td>
                        <td style={styles.td}>10:38:12 AM</td>
                        <td style={styles.td}>8,458</td>
                        <td style={{...styles.td, color: '#34D399', fontWeight: 600}}>$0.025</td>
                      </tr>

                      <tr style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.modelDotCol}>
                            <span style={{...styles.dotIndicator, background: '#A78BFA'}} />
                            <strong style={{ color: '#fff' }}>GPT-4 Turbo</strong>
                          </div>
                        </td>
                        <td style={styles.td}>Internal KB Search</td>
                        <td style={styles.td}>10:15:00 AM</td>
                        <td style={styles.td}>420</td>
                        <td style={{...styles.td, color: '#34D399', fontWeight: 600}}>$0.004</td>
                      </tr>

                      <tr style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.modelDotCol}>
                            <span style={{...styles.dotIndicator, background: '#F59E0B'}} />
                            <strong style={{ color: '#fff' }}>DALL-E 3</strong>
                          </div>
                        </td>
                        <td style={styles.td}>Marketing Asset Gen</td>
                        <td style={styles.td}>09:55:22 AM</td>
                        <td style={styles.td}>1 img</td>
                        <td style={{...styles.td, color: '#34D399', fontWeight: 600}}>$0.040</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Quick Actions, Top Models, Status Indicator */}
            <div style={styles.rightColumn}>
              
              {/* Quick Actions Panel */}
              <div style={styles.sidebarPanel}>
                <h4 style={styles.panelTitle}>Quick Actions</h4>
                
                <div style={styles.actionStack}>
                  
                  {/* Action 1 */}
                  <button onClick={() => openApiKeys()} style={styles.actionRow}>
                    <div style={styles.actionLabelCol}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3" />
                      </svg>
                      <span>New API Key</span>
                    </div>
                    <div style={styles.actionButtonBox}>+</div>
                  </button>

                  {/* Action 2 */}
                  <button onClick={() => setPage('pricing')} style={styles.actionRow}>
                    <div style={styles.actionLabelCol}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span>Buy Credits</span>
                    </div>
                    <div style={styles.actionButtonBox}>→</div>
                  </button>

                  {/* Action 3 */}
                  <button onClick={() => alert('Invite Team Members flow (Simulated)')} style={styles.actionRowDashed}>
                    <div style={styles.actionLabelCol}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span style={{ color: '#71717A' }}>Invite Team</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Top Models Stack */}
              <div style={styles.sidebarPanel}>
                <h4 style={styles.panelTitle}>Top Models</h4>
                
                <div style={styles.modelsStack}>
                  
                  {/* Model row 1 */}
                  <div style={styles.modelUsageRow}>
                    <div style={styles.modelRowHeader}>
                      <div style={styles.modelBadgeAndLabel}>
                        <div style={styles.modelSymbolPurple}>G4</div>
                        <div>
                          <div style={styles.modelTextLabel}>GPT-4 Turbo</div>
                          <div style={styles.modelUsageSubtitle}>64% of usage</div>
                        </div>
                      </div>
                      <span style={styles.modelCount}>7.8M</span>
                    </div>
                    <div style={styles.progressContainer}>
                      <div style={{...styles.progressBar, width: '64%', background: '#7C3AED'}} />
                    </div>
                  </div>

                  {/* Model row 2 */}
                  <div style={styles.modelUsageRow}>
                    <div style={styles.modelRowHeader}>
                      <div style={styles.modelBadgeAndLabel}>
                        <div style={styles.modelSymbolTeal}>C3</div>
                        <div>
                          <div style={styles.modelTextLabel}>Claude 3.5</div>
                          <div style={styles.modelUsageSubtitle}>28% of usage</div>
                        </div>
                      </div>
                      <span style={styles.modelCount}>3.4M</span>
                    </div>
                    <div style={styles.progressContainer}>
                      <div style={{...styles.progressBar, width: '28%', background: '#00D4FF'}} />
                    </div>
                  </div>

                  {/* Model row 3 */}
                  <div style={styles.modelUsageRow}>
                    <div style={styles.modelRowHeader}>
                      <div style={styles.modelBadgeAndLabel}>
                        <div style={styles.modelSymbolGray}>L3</div>
                        <div>
                          <div style={styles.modelTextLabel}>Llama 3 70B</div>
                          <div style={styles.modelUsageSubtitle}>8% of usage</div>
                        </div>
                      </div>
                      <span style={styles.modelCount}>1.2M</span>
                    </div>
                    <div style={styles.progressContainer}>
                      <div style={{...styles.progressBar, width: '8%', background: '#4B5563'}} />
                    </div>
                  </div>

                </div>
              </div>

              {/* System Connection Status Box */}
              <div style={styles.statusPanel}>
                <div style={styles.statusIconRow}>
                  <div style={styles.systemPulseCircle}>
                    <span style={styles.pulseRing} />
                    <span style={styles.pulseDot} />
                  </div>
                  <div>
                    <div style={styles.statusTitle}>All Systems Nominal</div>
                    <div style={styles.statusLatency}>Latency: 42ms (us-east-1)</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

// Inline styles for pixel-perfect match of OneAI Hub high-fidelity layout
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
    transition: 'color .15s ease',
  },
  mainHub: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    height: '68px',
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
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '7px 12px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    width: '220px',
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
  bellButton: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    cursor: 'pointer',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    padding: '6px',
  },
  bellBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#EF4444',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7C3AED, #00D4FF)',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 600,
    fontSize: '13px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
  metricCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  metricIconBox: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#A78BFA',
    display: 'grid',
    placeItems: 'center',
  },
  metricPill: {
    fontSize: '11px',
    fontWeight: 600,
    background: 'rgba(52, 211, 153, 0.08)',
    color: '#34D399',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  metricValue: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '26px',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#fff',
  },
  metricLabel: {
    fontSize: '12.5px',
    color: '#71717A',
    fontWeight: 500,
  },
  metricButton: {
    background: 'rgba(245, 158, 11, 0.08)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    borderRadius: '6px',
    color: '#F59E0B',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 8px',
    cursor: 'pointer',
  },
  twoColRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '24px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  panelSection: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '16px',
    padding: '20px 24px',
  },
  sectionTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '16px',
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
  workspaceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  workspaceCard: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '14px',
    padding: '16px',
  },
  workspaceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
  },
  workspaceIconPurple: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    background: 'rgba(124, 58, 237, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    color: '#A78BFA',
    display: 'grid',
    placeItems: 'center',
  },
  workspaceIconTeal: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    background: 'rgba(0, 212, 255, 0.08)',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    color: '#00D4FF',
    display: 'grid',
    placeItems: 'center',
  },
  workspaceTitleBlock: {
    flex: 1,
  },
  workspaceName: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '2px',
  },
  statusBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  statusIndicatorGreen: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#34D399',
    boxShadow: '0 0 6px #34D399',
  },
  statusTextGreen: {
    fontSize: '11px',
    color: '#34D399',
    fontWeight: 500,
  },
  statusIndicatorOrange: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#F59E0B',
    boxShadow: '0 0 6px #F59E0B',
  },
  statusTextOrange: {
    fontSize: '11px',
    color: '#F59E0B',
    fontWeight: 500,
  },
  optionDot: {
    background: 'transparent',
    border: 'none',
    color: '#4B5563',
    cursor: 'pointer',
    fontSize: '12px',
  },
  tagsContainer: {
    display: 'flex',
    gap: '6px',
    marginTop: '16px',
    marginBottom: '16px',
  },
  tag: {
    fontSize: '9.5px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#71717A',
    padding: '2px 6px',
    borderRadius: '5px',
  },
  workspaceFooter: {
    borderTop: '1px solid rgba(255,255,255,0.03)',
    paddingTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerStats: {
    fontSize: '11.5px',
    color: '#71717A',
  },
  actionButton: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '7px',
    padding: '5px 10px',
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '11.5px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tabButtons: {
    display: 'inline-flex',
    padding: '3px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
  },
  tabBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '11.5px',
    fontWeight: 500,
    padding: '4px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background .1s ease, color .1s ease',
  },
  tabBtnActive: {
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
  },
  chartWrapper: {
    marginTop: '8px',
  },
  chartXLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 6px 0',
    fontSize: '11.5px',
    color: '#4B5563',
    fontFamily: 'inherit',
  },
  filterBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '12.5px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tableWrapper: {
    overflowX: 'auto',
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
    transition: 'background .15s ease',
  },
  td: {
    padding: '12px 0',
    fontSize: '12.5px',
    color: '#71717A',
  },
  modelDotCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dotIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  sidebarPanel: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '16px',
    padding: '20px 24px',
  },
  panelTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '14.5px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '16px',
  },
  actionStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  actionRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    padding: '12px 14px',
    cursor: 'pointer',
    transition: 'border-color .1s ease, background .1s ease',
  },
  actionRowDashed: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    border: '1px dashed rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 14px',
    cursor: 'pointer',
    transition: 'border-color .1s ease',
  },
  actionLabelCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
  },
  actionButtonBox: {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#71717A',
    fontSize: '12px',
    display: 'grid',
    placeItems: 'center',
  },
  modelsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  modelUsageRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modelRowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelBadgeAndLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  modelSymbolPurple: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(124, 58, 237, 0.1)',
    border: '1px solid rgba(124, 58, 237, 0.25)',
    color: '#C4B5FD',
    fontSize: '10px',
    fontWeight: 700,
    display: 'grid',
    placeItems: 'center',
  },
  modelSymbolTeal: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.25)',
    color: '#00D4FF',
    fontSize: '10px',
    fontWeight: 700,
    display: 'grid',
    placeItems: 'center',
  },
  modelSymbolGray: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#A1A1AA',
    fontSize: '10px',
    fontWeight: 700,
    display: 'grid',
    placeItems: 'center',
  },
  modelTextLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
  },
  modelUsageSubtitle: {
    fontSize: '11px',
    color: '#4B5563',
  },
  modelCount: {
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'inherit',
    color: '#A1A1AA',
  },
  progressContainer: {
    height: '4px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '2px',
  },
  statusPanel: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '16px',
    padding: '16px 24px',
  },
  statusIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  systemPulseCircle: {
    width: '20px',
    height: '20px',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(0, 212, 255, 0.25)',
    animation: 'pulse 2s infinite ease-out',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00D4FF',
    boxShadow: '0 0 8px #00D4FF',
    zIndex: 2,
  },
  statusTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '2px',
  },
  statusLatency: {
    fontSize: '11px',
    color: '#4B5563',
  },
};
