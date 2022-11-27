import { Navigate, Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import styles from './App.module.css';
import { vaultSidebarSections } from './constants/Navigation';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import SidebarLayout from './layouts/SidebarLayout';
import Login from './pages/login';
import Vault from './pages/vault';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/app/*" element={<AppLayout />}>
            <Route
              path="/vault"
              element={
                <SidebarLayout
                  sections={vaultSidebarSections}
                  title="Filters"
                />
              }
            >
              <Route path="/" element={<Vault />} />
            </Route>
            <Route
              path="/send"
              element={<SidebarLayout sections={[]} title="" />}
            >
              <Route path="/" element={<h2>Send</h2>} />
            </Route>
            <Route
              path="/tools"
              element={<SidebarLayout sections={[]} title="" />}
            >
              <Route path="/" element={<h2>Tools</h2>} />
            </Route>
            <Route
              path="/reports"
              element={<SidebarLayout sections={[]} title="" />}
            >
              <Route path="/" element={<h2>Reports</h2>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate href="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
