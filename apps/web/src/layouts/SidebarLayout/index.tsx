import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import Sidebar, { SidebarProps } from './Sidebar';

const SidebarLayout: Component<SidebarProps> = (props) => {
  return (
    <div class="container max-w-5xl mx-auto flex">
      <div class="flex-initial w-56">
        <Sidebar {...props} />
      </div>
      <div class="flex-1 m-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
