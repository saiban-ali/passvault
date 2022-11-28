import { Navigate, Outlet, useMatch } from '@solidjs/router';
import { Component } from 'solid-js';
import { useAuth } from '../../context/Auth';

const AuthLayout: Component = () => {
  const [authState] = useAuth();

  const match = useMatch(() => '/login');

  console.log({ isAuthenticated: authState.isAuthenticated, match: match() });

  if (match() && authState.isAuthenticated) {
    return <Navigate href="/app/vault" />;
  } else if (match() || authState.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate href="/login" />;
  }
};

export default AuthLayout;
