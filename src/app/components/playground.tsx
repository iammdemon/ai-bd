'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

interface PlaygroundPageProps {
  setPage: (p: Page) => void;
}

export function PlaygroundPage({ setPage }: PlaygroundPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('playground');
  const [temperature, setTemperature] = useState(0.7);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      role: 'user',
      content: 'Can you write a Python script that uses multiprocessing to process a large CSV file efficiently? Please include comments explaining the core logic.'
    },
    {
      role: 'assistant',
      content: 'Certainly. Here is an optimized Python script utilizing the `multiprocessing` module to handle large CSV files in chunks. This approach prevents memory overload by processing the data concurrently.',
      code: `import multiprocessing as mp
import pandas as pd

def process_chunk(chunk):
    # Core logic: apply your transformations here
    # Example: filtering out rows where 'value' is negative
    processed = chunk[chunk['value'] > 0]
    return processed

def main(file_path):
    chunk_size = 100000
    pool = mp.Pool(mp.cpu_count())

    # Read CSV in chunks and map to pool
    chunks = pd.read_csv(file_path, chunksize=chunk_size)
    results = pool.map(process_chunk, chunks)

    pool.close()
    pool.join()`
    }
  ]);

  // Monitor Auth Status
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

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatLog([
      ...chatLog,
      { role: 'user', content: chatMessage },
      { 
        role: 'assistant', 
        content: `Simulated Response from GPT-4 Turbo (Temperature: ${temperature}):\nReceived your message: "${chatMessage}". This playground is currently running in static preview mode.`,
      }
    ]);
    setChatMessage('');
  };

  return (
    <div style={styles.playgroundContainer}>
      
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
              onClick={() => {}} 
              style={{...styles.navItem, ...styles.navItemActive}}
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
          <button onClick={() => {
            setChatLog([]);
            alert('New Chat conversation started.');
          }} style={styles.newChatBtn}>
            <span>+ New Chat</span>
          </button>
        </div>
      </aside>

      {/* 2. CHAT FEED COLUMN */}
      <section style={styles.chatSection}>
        {/* Model dropdown indicator bar */}
        <header style={styles.chatHeader}>
          <button onClick={() => alert('Change active model')} style={styles.modelPicker}>
            <span>GPT-4 Turbo</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div style={styles.latencyRow}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>120ms ping</span>
            
            <button style={styles.headerIconButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: -2 }}>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>
        </header>

        {/* Dynamic chat viewport */}
        <div style={styles.chatViewport}>
          {chatLog.map((msg, idx) => (
            <div key={idx} style={msg.role === 'user' ? styles.userMsgRow : styles.aiMsgRow}>
              
              {/* Message box */}
              <div style={msg.role === 'user' ? styles.userBubble : styles.aiBubbleWrapper}>
                {msg.role === 'assistant' && (
                  <div style={styles.aiSparkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                    </svg>
                  </div>
                )}
                
                <div style={msg.role === 'assistant' ? styles.aiMsgBlock : {}}>
                  <p style={styles.msgText}>{msg.content}</p>
                  
                  {/* Code Snippet Box inside assistant message */}
                  {msg.code && (
                    <div style={styles.codeContainer}>
                      <div style={styles.codeHeader}>
                        <span>PYTHON</span>
                        <button onClick={() => {
                          navigator.clipboard.writeText(msg.code || '');
                          alert('Code copied to clipboard!');
                        }} style={styles.copyBtn}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 5 }}>
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre style={styles.codePre}>
                        <code style={styles.codeVal}>{msg.code}</code>
                      </pre>
                    </div>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Input box zone */}
        <footer style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <button onClick={() => alert('Simulated File upload attachment')} style={styles.inputIconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message OneAI... (Shift+Enter for new line)" 
              style={styles.inputBox}
            />
            <button onClick={() => alert('Voice input trigger')} style={styles.inputIconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
            </button>
            <button onClick={handleSendMessage} style={styles.sendBtn}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
          <p style={styles.disclaimerText}>OneAI can make mistakes. Consider verifying critical information.</p>
        </footer>
      </section>

      {/* 3. RIGHT PARAMETER PANEL */}
      <aside style={styles.paramPanel}>
        
        {/* Session Metrics */}
        <section style={styles.paramGroup}>
          <h4 style={styles.paramHeading}>Session Metrics</h4>
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricLabelRow}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5" style={{ marginRight: 6 }}>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>Tokens</span>
              </div>
              <div style={styles.metricValue}>4.2k</div>
            </div>

            <div style={styles.metricCard}>
              <div style={styles.metricLabelRow}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2.5" style={{ marginRight: 6 }}>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Speed</span>
              </div>
              <div style={{...styles.metricValue, color: '#00D4FF'}}>85 t/s</div>
            </div>
          </div>
        </section>

        {/* Current Model Strengths */}
        <section style={styles.paramGroup}>
          <h4 style={styles.paramHeading}>Current Model Strengths</h4>
          <div style={styles.strengthsStack}>
            
            <div style={styles.strengthItem}>
              <div style={styles.strengthHeader}>
                <span>Coding & Logic</span>
              </div>
              <div style={styles.strengthProgressBg}>
                <div style={{...styles.strengthProgressFill, width: '95%', background: '#7C3AED'}} />
              </div>
            </div>

            <div style={styles.strengthItem}>
              <div style={styles.strengthHeader}>
                <span>Creative Writing</span>
              </div>
              <div style={styles.strengthProgressBg}>
                <div style={{...styles.strengthProgressFill, width: '80%', background: '#00D4FF'}} />
              </div>
            </div>

            <div style={styles.strengthItem}>
              <div style={styles.strengthHeader}>
                <span>Data Analysis</span>
              </div>
              <div style={styles.strengthProgressBg}>
                <div style={{...styles.strengthProgressFill, width: '88%', background: '#A78BFA'}} />
              </div>
            </div>

          </div>
        </section>

        {/* Parameters (Temperature Slider) */}
        <section style={styles.paramGroup}>
          <h4 style={styles.paramHeading}>Parameters</h4>
          <div style={styles.sliderRow}>
            <span style={styles.sliderLabel}>Temperature</span>
            <span style={styles.sliderVal}>{temperature.toFixed(1)}</span>
          </div>
          <div style={styles.sliderContainer}>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              style={styles.slider}
            />
          </div>
        </section>

      </aside>

    </div>
  );
}

// Custom CSS in JS mapping to perfectly reflect the sandbox design aesthetics
const styles: Record<string, React.CSSProperties> = {
  playgroundContainer: {
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
    marginBottom: '16px',
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
    marginBottom: '20px',
    boxShadow: '0 8px 24px -8px rgba(124,58,237,0.4)',
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
  chatSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#07090c',
    position: 'relative',
  },
  chatHeader: {
    height: '60px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  },
  modelPicker: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    color: '#fff',
    padding: '6px 12px',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  latencyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11.5px',
    color: '#71717A',
    fontWeight: 500,
  },
  headerIconButton: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    padding: '6px',
    marginLeft: '6px',
  },
  chatViewport: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  userMsgRow: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  aiMsgRow: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  userBubble: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '14px',
    padding: '16px 20px',
    maxWidth: '680px',
    width: '100%',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#E4E4E7',
  },
  aiBubbleWrapper: {
    display: 'flex',
    gap: '16px',
    maxWidth: '680px',
    width: '100%',
    alignItems: 'flex-start',
  },
  aiSparkIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(124, 58, 237, 0.15)',
    color: '#A78BFA',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },
  aiMsgBlock: {
    flex: 1,
  },
  msgText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#E4E4E7',
    margin: 0,
    marginBottom: '16px',
  },
  codeContainer: {
    background: '#090a0f',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  codeHeader: {
    background: 'rgba(255, 255, 255, 0.01)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: 700,
    color: '#4B5563',
    letterSpacing: '0.6px',
  },
  copyBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '11px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  },
  codePre: {
    margin: 0,
    padding: '16px 20px',
    overflowX: 'auto',
  },
  codeVal: {
    fontFamily: 'JetBrains Mono, SFMono-Regular, Consolas, monospace',
    fontSize: '12.5px',
    lineHeight: '1.6',
    color: '#D4D4D8',
    whiteSpace: 'pre-wrap',
  },
  inputArea: {
    padding: '0 48px 32px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    maxWidth: '680px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
  },
  inputIconBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    padding: '6px',
  },
  inputBox: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: '13.5px',
  },
  sendBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: '#7C3AED',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
  },
  disclaimerText: {
    fontSize: '11px',
    color: '#4B5563',
    marginTop: '12px',
    margin: 0,
  },
  paramPanel: {
    width: '260px',
    background: '#09090c',
    borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    flexShrink: 0,
  },
  paramGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  paramHeading: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '-0.2px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  metricCard: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    padding: '12px',
  },
  metricLabelRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10.5px',
    color: '#4B5563',
    fontWeight: 600,
    letterSpacing: '0.4px',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: 'inherit',
    color: '#fff',
  },
  strengthsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  strengthItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  strengthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#71717A',
    fontWeight: 500,
  },
  strengthProgressBg: {
    height: '4px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  strengthProgressFill: {
    height: '100%',
    borderRadius: '2px',
  },
  sliderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sliderLabel: {
    fontSize: '12.5px',
    color: '#71717A',
    fontWeight: 500,
  },
  sliderVal: {
    fontSize: '13.5px',
    fontFamily: 'inherit',
    fontWeight: 600,
    color: '#fff',
  },
  sliderContainer: {
    marginTop: '4px',
  },
  slider: {
    width: '100%',
    appearance: 'none',
    background: 'rgba(255,255,255,0.05)',
    height: '4px',
    borderRadius: '2px',
    outline: 'none',
  },
};
