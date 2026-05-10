'use client';

import { useState, useEffect } from 'react';
import { Page } from './shared';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';

interface AuthPageProps {
  page: 'login' | 'signup';
  setPage: (p: Page) => void;
}

export function AuthPage({ page, setPage }: AuthPageProps) {
  const isLogin = page === 'login';

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear errors on page switch
  useEffect(() => {
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
  }, [page]);

  // Handle Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Logged in successfully! Redirecting...');
      setTimeout(() => {
        setPage('dashboard');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'An error occurred during log in.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Email/Password Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      setSuccess('Account created successfully! Welcome to OneAI Hub.');
      setTimeout(() => {
        setPage('dashboard');
      }, 1200);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError(err.message || 'An error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Third-Party Sign In (Google)
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess('Connected with Google! Redirecting...');
      setTimeout(() => {
        setPage('dashboard');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Third-Party Sign In (GitHub)
  const handleGithubLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess('Connected with GitHub! Redirecting...');
      setTimeout(() => {
        setPage('dashboard');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to authenticate with GitHub.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE: ABSTRACT GRAPHIC VIEWPORT */}
      <div style={styles.leftPane}>
        <div style={styles.graphicOverlay} />
        
        {/* Brand details near the bottom */}
        <div style={styles.brandContainer}>
          <div style={styles.logoRow}>
            {/* Logo Sparkle Icon */}
            <div style={styles.logoBadge}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#fff" />
              </svg>
            </div>
            <span style={styles.logoText}>OneAI<span style={{ fontWeight: 400, opacity: 0.6 }}>Hub</span></span>
          </div>

          <p style={styles.brandParagraph}>
            The definitive portal for artificial intelligence. Access, manage, and deploy multiple models from a singular, cinematic interface.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTHENTICATION FORMS PANEL */}
      <div style={styles.rightPane}>
        
        {/* Absolute top-right back button */}
        <button onClick={() => setPage('landing')} style={styles.backToHome}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div style={styles.formContainer}>
          
          {/* Main Titles */}
          <h1 style={styles.formTitle}>{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p style={styles.formSubtitle}>
            {isLogin ? 'Enter your credentials to access your terminal.' : 'Get started with your cinematic AI terminal.'}
          </p>

          {/* Alert messages */}
          {error && (
            <div style={styles.errorAlert}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div style={styles.successAlert}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Social Sign In Buttons Grid */}
          <div style={styles.socialGrid}>
            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              disabled={loading} 
              style={styles.socialButton}
            >
              {/* Google Brand Color Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>

            <button 
              type="button" 
              onClick={handleGithubLogin} 
              disabled={loading} 
              style={styles.socialButton}
            >
              {/* GitHub White Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Visual Separator */}
          <div style={styles.separatorContainer}>
            <div style={styles.separatorLine} />
            <span style={styles.separatorText}>or continue with</span>
            <div style={styles.separatorLine} />
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={isLogin ? handleLogin : handleSignup} style={styles.form}>
            
            {/* Full Name field (Only in Signup) */}
            {!isLogin && (
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Full Name</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={loading}
                    style={styles.input}
                  />
                </div>
              </div>
            )}

            {/* Email Address field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={loading}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={styles.fieldGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>Password</label>
                {isLogin && (
                  <button 
                    type="button" 
                    onClick={() => alert('Forgot password? Reset flow will be triggered (Simulated).')} 
                    style={styles.forgotPassword}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Submit purple button */}
            <button 
              type="submit" 
              disabled={loading} 
              style={styles.submitButton}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Continue as Guest Button */}
            <button 
              type="button" 
              onClick={() => setPage('dashboard')} 
              style={styles.guestButton}
            >
              Continue as Guest
            </button>
          </form>

          {/* Toggle footer link */}
          <p style={styles.footerPrompt}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setPage(isLogin ? 'signup' : 'login')} 
              style={styles.toggleLink}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

// Inline Styles to guarantee correct rendering with the "OneAI Hub" theme
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    width: '100vw',
    height: '100vh',
    background: '#09090c',
    color: '#fff',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    zIndex: 1000, // covers other layouts perfectly
  },
  leftPane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    background: '#000',
    backgroundImage: 'url("/auth_graphic.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '48px',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
  },
  graphicOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(9, 9, 12, 0.2), rgba(9, 9, 12, 0.8) 100%)',
    zIndex: 1,
  },
  brandContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '480px',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  logoBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'conic-gradient(from 210deg at 50% 50%, #7C3AED, #00D4FF, #7C3AED)',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 0 16px rgba(124, 58, 237, 0.5)',
  },
  logoText: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  brandParagraph: {
    fontSize: '13.5px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: 400,
  },
  rightPane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '40px 24px',
    background: '#09090c',
    overflowY: 'auto',
  },
  backToHome: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'transparent',
    border: 'none',
    color: '#71717A',
    fontSize: '12.5px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'color .15s ease',
  },
  formContainer: {
    width: '100%',
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  formTitle: {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  formSubtitle: {
    fontSize: '13px',
    color: '#71717A',
    marginBottom: '20px',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#FCA5A5',
    fontSize: '12.5px',
    marginBottom: '16px',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(34, 197, 94, 0.08)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#86EFAC',
    fontSize: '12.5px',
    marginBottom: '16px',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '20px',
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px',
    padding: '10px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background .15s ease, border-color .15s ease',
  },
  separatorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    marginBottom: '20px',
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    background: 'rgba(255,255,255,0.05)',
  },
  separatorText: {
    fontSize: '11px',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '12.5px',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 500,
  },
  forgotPassword: {
    background: 'transparent',
    border: 'none',
    color: '#7C3AED',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: '#4B5563',
    display: 'grid',
    placeItems: 'center',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px',
    padding: '10px 12px 10px 38px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color .15s ease, box-shadow .15s ease',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#7C3AED',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '11px',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'background .15s ease, transform .1s ease',
    boxShadow: '0 0 16px -2px rgba(124, 58, 237, 0.4)',
  },
  guestButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background .15s ease',
  },
  footerPrompt: {
    fontSize: '12.5px',
    color: '#71717A',
    textAlign: 'center',
    marginTop: '20px',
  },
  toggleLink: {
    background: 'transparent',
    border: 'none',
    color: '#7C3AED',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
  },
};
