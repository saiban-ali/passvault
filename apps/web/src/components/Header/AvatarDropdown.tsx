import { BsCaretDown, BsPerson } from 'solid-icons/bs';
import { FiDownload, FiHelpCircle, FiLock, FiLogOut } from 'solid-icons/fi';
import { RiUserAccountCircleLine } from 'solid-icons/ri';
import { Component } from 'solid-js';
import Dropdown, { MenuItem } from '../Dropdown';

const AvatarDropdown: Component = () => {
  return (
    <Dropdown
      trigger={
        <div class="flex flex-row justify-center items-center space-x-1 cursor-pointer">
          <RiUserAccountCircleLine
            class="opacity-70 hover:opacity-80"
            size={24}
            color="#fff"
          />
          <BsCaretDown
            class="opacity-70 hover:opacity-80"
            size={16}
            color="#fff"
          />
        </div>
      }
    >
      <div class="z-10 absolute top-8 -left-2 w-48 bg-white border border-solid border-gray-300 rounded">
        <div class=" flex mx-3 my-2 space-x-3 items-center justify-start">
          <div class="rounded-full bg-lime-500 text-white p-1 text-md w-6 h-6">
            SA
          </div>
          <div class="flex flex-col justify-center items-start">
            <p class="text-sm">Logged in as</p>
            <p class="text-sm text-gray-500">Saiban Ali</p>
          </div>
        </div>
        <hr class="my-2 border-none h-[1px] bg-gray-300" />
        <MenuItem title="Account Settings" icon={<BsPerson />} />
        <MenuItem title="Get Help" icon={<FiHelpCircle />} />
        <MenuItem title="Get the Apps" icon={<FiDownload />} />
        <hr class="my-2 border-none h-[1px] bg-gray-300" />
        <MenuItem title="Lock Now" icon={<FiLock />} />
        <MenuItem title="Log Out" icon={<FiLogOut />} />
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
