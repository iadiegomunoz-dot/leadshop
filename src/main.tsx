import {createRoot} from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

// Visit beacon: one ping per browser session for the admin dashboard stats
if (typeof window !== 'undefined' && !sessionStorage.getItem('ls_ping')) {
  try {
    sessionStorage.setItem('ls_ping', '1');
    fetch('/api/ping', { method: 'POST' }).catch(() => {});
  } catch {}
}

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>
);
