import { Component } from 'solid-js';
import AvatarDropdown from './AvatarDropdown';
import HeaderNav from './HeaderNav';

const Header: Component = () => {
  return (
    <div class="w-full h-14 bg-blue-700/90">
      <div class="container max-w-5xl mx-auto flex justify-between items-center h-full">
        <HeaderNav />
        <AvatarDropdown />
      </div>
    </div>
  );
};

export default Header;
