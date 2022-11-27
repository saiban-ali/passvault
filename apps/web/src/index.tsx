import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import 'tailwindcss/tailwind.css';
import App from './App';
import { AuthProvider } from './context/Auth';
import './index.css';

render(
  () => (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  ),
  document.getElementById('root') as HTMLElement
);
