'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

interface SettingsPageProps {
  setPage: (p: Page) => void;
  openApiKeys: () => void;
}

export function SettingsPage({ setPage, openApiKeys }: SettingsPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('settings');
  const [settingsSection, setSettingsSection] = useState<'profile' | 'team' | 'security' | 'api'>('profile');
  
  // Form States
  const [firstName, setFirstName] = useState('Elena');
  const [lastName, setLastName] = useState('Rostova');
  const [email, setEmail] = useState('elena@oneai.com');
  const [workspaceName, setWorkspaceName] = useState('Core Engineering');
  const [workspaceId, setWorkspaceId] = useState('wrk_9f92e4bc');

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        setEmail(currentUser.email);
        if (currentUser.displayName) {
          const names = currentUser.displayName.split(' ');
          setFirstName(names[0] || 'Elena');
          setLastName(names[1] || 'Rostova');
        }
      }
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

  const handleCopyId = () => {
    navigator.clipboard.writeText(workspaceId);
    alert('Workspace ID copied to clipboard!');
  };

  const handleSaveChanges = () => {
    alert('Workspace and Profile preferences saved successfully.');
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
              onClick={() => setPage('analytics')} 
              style={styles.navItem}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Analytics</span>
            </button>

            <button 
              onClick={() => setActiveTab('settings')} 
              style={{...styles.navItem, ...styles.navItemActive}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer & Chat Button Options */}
        <div style={styles.sidebarFooter}>
          <button onClick={() => alert('Support Portal (Simulated)')} style={styles.footerItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            <span>Support</span>
          </button>

          {/* Plan badge row */}
          <button onClick={() => alert('Plan Details')} style={styles.footerPlanBadge}>
            <div style={styles.avatarMini}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
              </svg>
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#fff', flex: 1, textAlign: 'left' }}>Pro Plan</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button onClick={() => setPage('playground')} style={styles.newChatBtn}>
            <span>+ New Chat</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN HUB CONTENT */}
      <main style={styles.mainHub}>
        
        {/* Settings Header */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>Settings</h2>
            <p style={styles.headerSubtitle}>Manage your account, team members, and platform preferences.</p>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div style={styles.scrollArea}>
          
          {/* Horizontal settings tabs */}
          <nav style={styles.subTabsRow}>
            <button 
              onClick={() => setSettingsSection('profile')} 
              style={{...styles.subTab, ...(settingsSection === 'profile' ? styles.subTabActive : {})}}
            >
              Profile
            </button>
            <button 
              onClick={() => setSettingsSection('team')} 
              style={{...styles.subTab, ...(settingsSection === 'team' ? styles.subTabActive : {})}}
            >
              Team
            </button>
            <button 
              onClick={() => setSettingsSection('security')} 
              style={{...styles.subTab, ...(settingsSection === 'security' ? styles.subTabActive : {})}}
            >
              Security
            </button>
            <button 
              onClick={() => openApiKeys()} 
              style={{...styles.subTab, ...(settingsSection === 'api' ? styles.subTabActive : {})}}
            >
              API Preferences
            </button>
          </nav>

          {/* TWO COLUMN GRID LAYOUT */}
          <div style={styles.settingsGrid}>
            
            {/* LEFT MAIN EDITING COLUMN */}
            <section style={styles.mainSettingsCol}>
              
              {/* Card 1: Personal Information */}
              <div style={styles.settingsCard}>
                <h3 style={styles.cardTitle}>Personal Information</h3>
                
                {/* Avatar Section */}
                <div style={styles.avatarSection}>
                  <div style={styles.profileAvatarBox}>
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
                      alt="Profile Avatar" 
                      style={styles.avatarImg}
                      onError={(e) => {
                        // Fallback to high-quality gradient if external resource isn't loaded
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div style={styles.avatarFallback}>ER</div>
                  </div>

                  <div style={styles.avatarActionCol}>
                    <button onClick={() => alert('Trigger image upload file explorer')} style={styles.uploadBtn}>Upload New</button>
                    <p style={styles.uploadSubtext}>JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                {/* Input Fields */}
                <div style={styles.inputFormStack}>
                  <div style={styles.inputRow}>
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>First Name</label>
                      <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        style={styles.textInput}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Last Name</label>
                      <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        style={styles.textInput}
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.textInput}
                    />
                    <p style={styles.fieldSubtext}>Email change requires admin verification.</p>
                  </div>
                </div>

              </div>

              {/* Card 2: Workspace */}
              <div style={styles.settingsCard}>
                <h3 style={styles.cardTitle}>Workspace</h3>

                <div style={styles.inputFormStack}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Workspace Name</label>
                    <input 
                      type="text" 
                      value={workspaceName} 
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      style={styles.textInput}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Workspace ID</label>
                    <div style={styles.copyInputContainer}>
                      <input 
                        type="text" 
                        value={workspaceId} 
                        readOnly
                        style={styles.readOnlyInput}
                      />
                      <button onClick={handleCopyId} style={styles.copyBtn} title="Copy Workspace ID">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={styles.saveBar}>
                    <button onClick={handleSaveChanges} style={styles.saveChangesBtn}>Save Changes</button>
                  </div>
                </div>
              </div>

            </section>

            {/* RIGHT SUB INFORMATION COLUMN */}
            <section style={styles.asideSettingsCol}>
              
              {/* Card 1: Pro Plan Info */}
              <div style={styles.settingsCard}>
                <div style={styles.planHeaderRow}>
                  <div style={styles.planIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#A78BFA" />
                    </svg>
                  </div>
                  <h3 style={styles.planTitle}>Pro Plan</h3>
                </div>

                <p style={styles.planDescription}>
                  You are currently on the Pro plan, billed annually.
                </p>

                <div style={styles.seatsMetrics}>
                  <div style={styles.seatsLabelRow}>
                    <span>Seats</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>5 / 10</span>
                  </div>
                  <div style={styles.seatsProgressBg}>
                    <div style={{...styles.seatsProgressFill, width: '50%'}} />
                  </div>
                </div>

                <button onClick={() => alert('Manage Stripe Billing Portal')} style={styles.manageSubscriptionBtn}>
                  Manage Subscription
                </button>
              </div>

              {/* Card 2: Danger Zone */}
              <div style={styles.settingsCard}>
                <h3 style={{...styles.cardTitle, color: '#F87171'}}>Danger Zone</h3>
                <p style={styles.planDescription}>
                  Permanently delete this workspace and all associated data.
                </p>

                <button onClick={() => {
                  if (confirm('Are you absolutely sure you want to permanently delete this workspace? This action cannot be undone.')) {
                    alert('Workspace deletion queued.');
                  }
                }} style={styles.deleteWorkspaceBtn}>
                  Delete Workspace
                </button>
              </div>

            </section>

          </div>

        </div>
      </main>

    </div>
  );
}

// Full premium styling matching the user reference mockups
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
    gap: '10px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '16px',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    color: '#4B5563',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  footerPlanBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  avatarMini: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'conic-gradient(from 180deg at 50% 50%, #7C3AED, #00D4FF, #7C3AED)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    boxShadow: '0 0 8px rgba(124, 58, 237, 0.3)',
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
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 28px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  subTabsRow: {
    display: 'flex',
    gap: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    paddingBottom: '10px',
    marginBottom: '8px',
  },
  subTab: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '4px 0 10px',
    position: 'relative',
  },
  subTabActive: {
    color: '#fff',
    fontWeight: 600,
    borderBottom: '2px solid #7C3AED',
  },
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  mainSettingsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  asideSettingsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  settingsCard: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '24px',
  },
  cardTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15.5px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
    marginBottom: '20px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '24px',
  },
  profileAvatarBox: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(135deg, #7C3AED, #00D4FF)',
    border: '2px solid rgba(255,255,255,0.1)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  avatarActionCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  uploadBtn: {
    background: '#7C3AED',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    width: 'fit-content',
    boxShadow: '0 4px 12px rgba(124,58,237,0.25)',
  },
  uploadSubtext: {
    fontSize: '11px',
    color: '#4B5563',
    margin: 0,
  },
  inputFormStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  inputLabel: {
    fontSize: '12.5px',
    color: '#71717A',
    fontWeight: 500,
  },
  textInput: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fff',
    fontFamily: 'inherit',
    fontSize: '13.5px',
    outline: 'none',
  },
  fieldSubtext: {
    fontSize: '11.5px',
    color: '#4B5563',
    margin: 0,
    marginTop: '2px',
  },
  copyInputContainer: {
    position: 'relative',
    display: 'flex',
  },
  readOnlyInput: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '10px 48px 10px 14px',
    color: '#71717A',
    fontFamily: 'monospace',
    fontSize: '13px',
    outline: 'none',
  },
  copyBtn: {
    position: 'absolute',
    right: '6px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '7px',
    width: '28px',
    height: '28px',
    color: '#71717A',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
  },
  saveBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  saveChangesBtn: {
    background: '#7C3AED',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
  },
  planHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  planIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    background: 'rgba(124,58,237,0.08)',
    border: '1px solid rgba(124,58,237,0.2)',
    display: 'grid',
    placeItems: 'center',
  },
  planTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
  },
  planDescription: {
    fontSize: '12.5px',
    color: '#71717A',
    lineHeight: '1.5',
    margin: 0,
    marginBottom: '20px',
  },
  seatsMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  seatsLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12.5px',
    color: '#71717A',
    fontWeight: 500,
  },
  seatsProgressBg: {
    height: '4px',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  seatsProgressFill: {
    height: '100%',
    background: '#7C3AED',
    borderRadius: '2px',
  },
  manageSubscriptionBtn: {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 0',
    cursor: 'pointer',
    textAlign: 'center',
  },
  deleteWorkspaceBtn: {
    width: '100%',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '10px',
    color: '#FCA5A5',
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 0',
    cursor: 'pointer',
    textAlign: 'center',
  },
};
