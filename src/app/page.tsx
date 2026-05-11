'use client';

import { useState, useEffect } from 'react';
import { TopNav, Page } from './components/shared';
import { LandingPage } from './components/landing';
import { ComparePage } from './components/compare';
import { PricingPage } from './components/pricing';
import { DashboardPage } from './components/dashboard';
import { SettingsPage } from './components/settings';
import { ModelsPage } from './components/models-page';
import { PlaygroundPage } from './components/playground';
import { AnalyticsPage } from './components/analytics';
import { AuthPage } from './components/auth';
import { ModelPickerModal, ApiKeysModal } from './components/modals';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakButton } from './components/tweaks-panel';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const ACCENT_PALETTES: Record<string, { primary: string; secondary: string }> = {
  violet: { primary: '#7C3AED', secondary: '#00D4FF' },
  cyan:   { primary: '#00D4FF', secondary: '#7C3AED' },
  green:  { primary: '#22C55E', secondary: '#00D4FF' },
  pink:   { primary: '#EC4899', secondary: '#F59E0B' },
};

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [currentModel, setCurrentModel] = useState('claude');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [keysOpen, setKeysOpen] = useState(false);
  const [t, setTweak] = useTweaks({ accent: 'violet', showOrbs: true, denseDashboard: false, compareLayout: '3-col' });
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Monitor Firebase Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      // Redirect authenticated users trying to access login/signup directly to dashboard
      if (currentUser && (page === 'login' || page === 'signup')) {
        setPage('dashboard');
      }
    });
    return () => unsubscribe();
  }, [page]);

  // Client-Side Route Guard for Protected Pages
  useEffect(() => {
    if (!authLoading && !user && (page === 'dashboard' || page === 'settings' || page === 'models' || page === 'playground' || page === 'analytics')) {
      setPage('login');
    }
  }, [user, authLoading, page]);

  useEffect(() => {
    const palette = ACCENT_PALETTES[t.accent as string] ?? ACCENT_PALETTES.violet;
    document.documentElement.style.setProperty('--accent', palette.primary);
    document.documentElement.style.setProperty('--accent-2', palette.secondary);
  }, [t.accent]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPickerOpen(p => !p);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isAuthPage = page === 'login' || page === 'signup';

  return (
    <>
      {!isAuthPage && page !== 'dashboard' && page !== 'models' && page !== 'playground' && page !== 'analytics' && <TopNav page={page} setPage={setPage} />}

      <main>
        {page === 'landing'    && <LandingPage setPage={setPage} />}
        {page === 'compare'    && <ComparePage setPage={setPage} />}
        {page === 'pricing'    && <PricingPage setPage={setPage} />}
        {page === 'dashboard'  && <DashboardPage setPage={setPage} currentModel={currentModel} setCurrentModel={setCurrentModel} openModelPicker={() => setPickerOpen(true)} openApiKeys={() => setKeysOpen(true)} />}
        {page === 'models'     && <ModelsPage setPage={setPage} openModelPicker={() => setPickerOpen(true)} openApiKeys={() => setKeysOpen(true)} />}
        {page === 'playground' && <PlaygroundPage setPage={setPage} />}
        {page === 'analytics'  && <AnalyticsPage setPage={setPage} />}
        {page === 'settings'   && <SettingsPage setPage={setPage} openApiKeys={() => setKeysOpen(true)} />}
        {isAuthPage            && <AuthPage page={page} setPage={setPage} />}
      </main>

      <ModelPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
      />

      <ApiKeysModal
        open={keysOpen}
        onClose={() => setKeysOpen(false)}
      />

      {!isAuthPage && (
        <TweaksPanel>
          <TweakSection title="Accent color">
            <TweakRadio label="Accent" value={t.accent as string} options={['violet', 'cyan', 'green', 'pink']} onChange={v => setTweak('accent', v)} />
          </TweakSection>

          <TweakSection title="Background orbs">
            <TweakToggle label="Show orbs" value={t.showOrbs as boolean} onChange={v => setTweak('showOrbs', v)} />
          </TweakSection>

          <TweakSection title="Dashboard density">
            <TweakToggle label="Dense layout" value={t.denseDashboard as boolean} onChange={v => setTweak('denseDashboard', v)} />
          </TweakSection>

          <TweakSection title="Compare layout">
            <TweakRadio label="Layout" value={t.compareLayout as string} options={['3-col', '2-col', 'stack']} onChange={v => setTweak('compareLayout', v)} />
          </TweakSection>

          <TweakSection title="Quick navigation">
            <TweakButton onClick={() => setPage('landing')}>Landing</TweakButton>
            <TweakButton onClick={() => setPage('compare')}>Compare</TweakButton>
            <TweakButton onClick={() => setPage('dashboard')}>Dashboard</TweakButton>
            <TweakButton onClick={() => setPage('pricing')}>Pricing</TweakButton>
            <TweakButton onClick={() => setPage('settings')}>Settings</TweakButton>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}
