import { NavLink } from '@solidjs/router';
import { BsShieldShaded } from 'solid-icons/bs';
import { Component } from 'solid-js';

const HeaderNav: Component = () => {
  return (
    <div class="flex justify-center items-center space-x-4">
      <BsShieldShaded class="text-3xl text-white" />
      <NavLink
        class="no-underline text-md text-white"
        inactiveClass="opacity-60"
        href="/app/vault"
      >
        Vault
      </NavLink>
      <NavLink
        class="no-underline text-md text-white"
        inactiveClass="opacity-60"
        href="/app/send"
      >
        Send
      </NavLink>
      <NavLink
        class="no-underline text-md text-white"
        inactiveClass="opacity-60"
        href="/app/tools"
      >
        Tools
      </NavLink>
      <NavLink
        class="no-underline text-md text-white"
        inactiveClass="opacity-60"
        href="/app/reports"
      >
        Reports
      </NavLink>
    </div>
  );
};

export default HeaderNav;
