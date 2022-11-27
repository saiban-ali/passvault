import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import Header from '../../components/Header';

const AppLayout: Component = () => {
  return (
    <div class="bg-white text-black">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
